import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userDocument } from './user.schema';
import { userDetailsType } from './user.types';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userSchema: userDocument) {}

  _getUserDetails(user: userDocument): userDetailsType {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  //   findById findByEmail create
}
