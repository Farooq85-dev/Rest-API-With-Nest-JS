import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(`${process.env.MONGODB_URI}`),
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
