import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserAuthDto } from './dto/user-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users-auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  getUserByEmail(@Param('email') email: string): Promise<any> {
    return this.userService.getUserByEmail(email);
  }

  @Post('set-claims')
  setCustomClaims(@Body() userAuth: UserAuthDto): Promise<any> {
    return this.userService.setCustomClaims(userAuth);
  }

  @Post('create-user')
  signUp(@Body() userRequest: CreateUserDto): Promise<void> {
    return this.userService.createUser(userRequest);
  }
}
