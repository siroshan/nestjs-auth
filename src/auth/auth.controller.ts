import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() userDto: UserDto): Promise<User> {
    return this.authService.signUp(userDto);
  }

  @Post('/signin')
  signIn(@Request() req): Promise<{ accessToken: string }> {
    return this.authService.signIn(req.user);
  }

  @Post('/:email')
  validte(@Param('email') email: string): Promise<{ email: string }> {
    return this.authService.checkAvailabelUser(email);
  }
}
