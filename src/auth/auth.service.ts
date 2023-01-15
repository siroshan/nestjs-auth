import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentailsDto } from './dto/auth-credentials.dto';
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
        id: user.id,
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

  async signUp(userDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(userDto);
  }

  async signIn(
    authCredentailsDto: AuthCredentailsDto,
  ): Promise<{ accessToken: string }> {
    const payload = { email: authCredentailsDto.email };
    const accessToken: string = await this.jwtService.sign(payload);
    return { accessToken };
  }
}