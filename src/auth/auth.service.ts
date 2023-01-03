import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/user.schema';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // here we retrieve the user and validate
  async validateUser(email: string, password: string): Promise<any> {
    const user = (await this.usersService.findOneByEmail(email)) as any;
    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        id: user._id,
        email: user.email,
      };
    }
    return null;
  }

  async checkAvailabelUser(email: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      return {
        email: user.email,
      };
    } else {
      throw new NotFoundException();
    }
  }

  async signUp(userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  async signIn(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.id };
    const accessToken: string = await this.jwtService.sign(payload);
    return { accessToken, email: user.email, id: user.id };
  }
}
