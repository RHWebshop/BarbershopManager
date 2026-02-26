import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req, BadRequestException, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import express from 'express';
import { AuthGuard } from '@nestjs/passport';
import { signInSchema, signUpSchema, verifyOtpSchema } from '@line-manager/schemas';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Req() req: express.Request) {
    const user = req.user as { phone: string };
    return this.authService.getProfile(user.phone);
  }

  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Body() body: any) {
    const isSignUp = !!body.name;
    const schema = isSignUp ? signUpSchema : signInSchema;

    const result = schema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.issues[0].message);
    }

    return this.authService.sendOtp(result.data.phone);
  }

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(
    @Body() body: any,
    @Res({ passthrough: true }) res: express.Response
  ) {
    const isSignUp = !!body.name;
    const bodyResult = verifyOtpSchema.safeParse(body);
    if (!bodyResult.success) {
      throw new BadRequestException(bodyResult.error.issues[0].message);
    }

    const phone = body.phone;
    if (!phone) {
      throw new BadRequestException('מספר טלפון חסר');
    }

    let signUpData: { name: string; phone: string; dob: Date; gender: string } | undefined = undefined;
    if (isSignUp) {
      const profileResult = signUpSchema.safeParse(body);
      if (!profileResult.success) {
        throw new BadRequestException(profileResult.error.issues[0].message);
      }
      signUpData = profileResult.data;
    }

    const result = await this.authService.verifyOtp(phone, bodyResult.data.otp, signUpData);

    res.cookie('jwt', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { success: true, user: result.user };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body('phone') phone: string) {
    return { message: 'Use send-otp instead' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: express.Request,
    @Res({ passthrough: true }) res: express.Response
  ) {
    const user = req.user as { phone: string };
    const token = await this.authService.generateToken(user.phone);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { success: true };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie('jwt');
    return { success: true };
  }
}