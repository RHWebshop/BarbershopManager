import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwilioModule, TwilioService } from 'nestjs-twilio'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
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