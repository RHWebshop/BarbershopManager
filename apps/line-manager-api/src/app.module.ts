import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwilioModule } from 'nestjs-twilio'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV == "preview" || process.env.NODE_ENV == "production"
    }),
    TwilioModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const accountSid = cfg.getOrThrow("TWLIIO_ACCOUNT_SID");
        const authToken = cfg.getOrThrow("TWILIO_AUTH_TOKEN")
        return { accountSid, authToken }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
