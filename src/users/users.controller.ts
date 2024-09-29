import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Create User
  @Post('/add-user')
  async AddUser(
    @Res() response,
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ) {
    try {
      const newStudent = await this.usersService.AddUser(createUserDto);
      return response.status(StatusCodes.CREATED).json({
        message: 'User has been created successfully!',
        newStudent,
      });
    } catch (error) {
      console.log(error);
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Please try again!',
      });
    }
  }

  //Individual User
  @Get(':email')
  async GetUserByEmail(@Res() response, @Param('email') email: string) {
    try {
      const foundedUser = await this.usersService.GetUserByEmail(email);
      return response.status(StatusCodes.OK).json({
        message: 'User has been found successfully!',
        foundedUser,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(StatusCodes.NOT_FOUND).json({
          message: 'User not found!',
        });
      }
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Please try again!',
      });
    }
  }

  //Update User
  @Patch(':email')
  async UpdateUserByEmail(
    @Res() response,
    @Param('email') email: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    try {
      const foundedUser = await this.usersService.UpdateUserByEmail(
        email,
        updateUserDto,
      );
      return response.status(StatusCodes.OK).json({
        message: 'User has been updated successfully!',
        foundedUser,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(StatusCodes.NOT_FOUND).json({
          message: 'User not found!',
        });
      }
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Please try again!',
      });
    }
  }

  //Delete User
  @Delete(':email')
  async DeleteUserByEmail(@Res() response, @Param('email') email: string) {
    try {
      const deletedUser = await this.usersService.DeleteUserByEmail(email);
      return response.status(StatusCodes.OK).json({
        message: 'User has been deleted successfully!',
        deletedUser,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(StatusCodes.NOT_FOUND).json({
          message: 'User not found!',
        });
      }
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Please try again!',
      });
    }
  }
}
