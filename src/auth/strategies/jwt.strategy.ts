import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
      // from the front end we send the
      // token in header as BearerToken
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    // here user is retrieved using the email in payload
    // and returned.

    // if only the user id is need, we can add the id
    // in the payload in sigin in auth service and retrive
    // it here and return the id
    const { email } = payload;
    const user: User = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
