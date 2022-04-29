import { Body, Controller, Get, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserService } from './user.service';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/updateuser.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') loginDto: LoginUserDto): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('users')
  @UseGuards(AuthGuard)
  async currentUser(@User('id') user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentuser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(id, updateUserDto);
    return this.userService.buildUserResponse(user);
  }
}
