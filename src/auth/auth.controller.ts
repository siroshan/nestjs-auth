import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthCredentailsDto } from './dto/auth-credentials.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './public.decorators.ts/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // making it accessible to requests without tokens
  @Public()
  @Post('/signup')
  signUp(@Body() userDto: CreateUserDto): Promise<User> {
    return this.authService.signUp(userDto);
  }

  @Public()
  //this gurad checks if the user exists using local strategy
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentailsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Public()
  @Post('/:email')
  validte(@Param('email') email: string): Promise<{ email: string }> {
    return this.authService.checkAvailabelUser(email);
  }
}
