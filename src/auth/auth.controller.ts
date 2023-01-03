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
import { Public } from './decorators/public.decorator';
import { AuthCredentailsDto } from './dto/auth-credentials.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // making it accessible to requests without tokens
  @Public()
  @Post('/signup')
  signUp(@Body() userDto: UserDto): Promise<User> {
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
