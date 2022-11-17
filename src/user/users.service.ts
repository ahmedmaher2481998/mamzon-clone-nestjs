import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDocument } from './user.schema';
import { userDetailsType, userType } from './user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userSchema: Model<userDocument>,
  ) {}

  _getUserDetails(user: userDocument): userDetailsType {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  //   findById
  async getUserById(id: string): Promise<userDetailsType | null> {
    const user = await this.userSchema.findById(id);
    if (!user) return null;
    return this._getUserDetails(user);
  }
  //   findByEmail
  async getUseByEmail(email: string): Promise<userDocument | null> {
    const user = await this.userSchema.findOne({ email }).exec();
    if (!user) return null;
    else return user;
  }

  //   create
  createNewUser(user: userType) {
    return this.userSchema.create(user);
  }
}
