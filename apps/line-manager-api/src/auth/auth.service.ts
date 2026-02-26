import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Otp } from './entities/otp.entity';
import { TwilioService } from 'nestjs-twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly twilioService: TwilioService,
        private readonly configService: ConfigService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Otp)
        private readonly otpRepository: Repository<Otp>,
    ) { }

    async sendOtp(phone: string) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 5);

        let otpRecord = await this.otpRepository.findOne({ where: { phone } });
        if (otpRecord) {
            otpRecord.code = code;
            otpRecord.expiresAt = expiresAt;
        } else {
            otpRecord = this.otpRepository.create({ phone, code, expiresAt });
        }

        await this.otpRepository.save(otpRecord);

        const fullPhone = phone.startsWith("0") ? `+972${phone.substring(1)}` : phone;
        const fromPhoneNumber = this.configService.getOrThrow<string>('TWILIO_PHONE_NUMBER');

        await this.twilioService.client.messages.create({
            body: `קוד האימות שלך: ${code}`,
            from: fromPhoneNumber,
            to: fullPhone,
        });

        return { success: true };
    }

    async verifyOtp(phone: string, code: string, signUpData?: { name?: string; dob?: Date; gender?: string }) {
        const otpRecord = await this.otpRepository.findOne({ where: { phone } });

        if (!otpRecord || otpRecord.code !== code || new Date() > otpRecord.expiresAt) {
            throw new UnauthorizedException('קוד לא תקין או שפג תוקפו');
        }

        await this.otpRepository.remove(otpRecord);

        let user = await this.userRepository.findOne({ where: { phone } });
        if (!user) {
            user = this.userRepository.create({
                phone,
                name: signUpData?.name,
                dob: signUpData?.dob,
                gender: signUpData?.gender,
            });
            await this.userRepository.save(user);
        } else if (signUpData) {
            user.name = signUpData.name || user.name;
            user.dob = signUpData.dob || user.dob;
            user.gender = signUpData.gender || user.gender;
            await this.userRepository.save(user);
        }

        const token = await this.generateToken(user.phone);
        return { success: true, token, user };
    }

    async generateToken(phone: string) {
        return this.jwtService.sign({ phone });
    }

    async getProfile(phone: string) {
        const user = await this.userRepository.findOne({ where: { phone } });
        if (!user) {
            throw new UnauthorizedException('משתמש לא נמצא');
        }
        return user;
    }
}
