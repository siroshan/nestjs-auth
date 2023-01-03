import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(userDto: UserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(userDto.password, salt);
    userDto.password = hash;

    const newuser = new this.userModel(userDto);
    return await newuser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email: email }).select('+password');
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findMe(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (id === id) {
      return await this.userModel.findByIdAndUpdate(id, updateUserDto);
    }
    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: 'Your session does not match',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  async remove(id: string, sid: string) {
    if (id === sid) {
      return await this.userModel.findByIdAndRemove(id);
    }
    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: 'Your session does not match',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
