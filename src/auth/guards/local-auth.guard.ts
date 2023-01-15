import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//this gurad checks if the user exists using local strategy
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
