import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './Interface/user.interface';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private userModel: Model<IUser>) {}

  // Add a new user
  async AddUser(createUserDto: CreateUserDto): Promise<IUser> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new NotFoundException('User already exists!');
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  // Get a user by email
  async GetUserByEmail(email: string): Promise<IUser> {
    const foundedUser = await this.userModel.findOne({ email });

    if (!foundedUser) {
      throw new NotFoundException('User not found!');
    }

    return foundedUser;
  }

  // Update user details by email
  async UpdateUserByEmail(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { email },
      updateUserDto,
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found!');
    }

    return updatedUser;
  }

  // Delete a user by email
  async DeleteUserByEmail(email: string): Promise<IUser> {
    const deletedUser = await this.userModel.findOneAndDelete({ email });

    if (!deletedUser) {
      throw new NotFoundException('User not found!');
    }

    return deletedUser;
  }
}
