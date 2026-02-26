import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TwilioService } from 'nestjs-twilio';
import { ConfigService } from '@nestjs/config';
import express from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly twilioService: TwilioService,
    private readonly configService: ConfigService,
  ) {}

  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Body('phone') phone: string) {
    const countryCode = this.configService.get<string>('TWILIO_COUNTRY_CODE', '+1');
    const fullPhone = `${countryCode}${phone}`;
    
    await this.twilioService.client.messages.create({
      body: `Your verification code is: ${this.generateOtp()}`,
      from: this.configService.get<string>('TWILIO_PHONE_NUMBER'),
      to: fullPhone,
    });
    
    return { success: true, message: 'OTP sent successfully' };
  }

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body('phone') phone: string, @Body('otp') otp: string) {
    // In a real implementation, you would verify the OTP against a stored value
    // For now, we'll simulate success
    const token = await this.authService.generateToken(phone);
    return { success: true, token };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body('phone') phone: string) {
    // This endpoint can be used for password-based login if implemented
    // For now, it can just return a token or trigger OTP flow
    const token = await this.authService.generateToken(phone);
    return { success: true, token };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: express.Request) {
    const user = req['user'];
    const token = await this.authService.generateToken(user.phone);
    return { success: true, token };
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
