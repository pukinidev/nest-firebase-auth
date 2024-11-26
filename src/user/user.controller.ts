import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserAuthDto } from './dto/user-auth.dto';

@Controller('user')
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
}
