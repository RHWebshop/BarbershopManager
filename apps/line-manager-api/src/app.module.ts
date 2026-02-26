import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwilioModule, TwilioService } from 'nestjs-twilio'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { Otp } from './auth/entities/otp.entity';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, "../../../.env"),
      ignoreEnvFile: process.env.NODE_ENV == "preview" || process.env.NODE_ENV == "production"
    }),
    TwilioModule.forRootAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const accountSid = cfg.getOrThrow<string>("TWILIO_ACCOUNT_SID");
        const authToken = cfg.getOrThrow<string>("TWILIO_AUTH_TOKEN")
        return { accountSid, authToken }
      }
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        url: cfg.getOrThrow<string>('DATABASE_URL'),
        entities: [User, Otp],
        synchronize: true,
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const secret = cfg.getOrThrow<string>("JWT_SECRET");
        return { secret, signOptions: { expiresIn: '5m', algorithm: 'HS256' } }
      }
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }