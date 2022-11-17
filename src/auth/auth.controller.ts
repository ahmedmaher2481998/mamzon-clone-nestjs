import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { userDto } from 'src/user/dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() body: userDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  logIn(@Body() user: userDto) {
    return this.authService.logIn(user);
  }
}
