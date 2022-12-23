import { Controller, Get, Param } from '@nestjs/common';
import { userDetailsType } from './user.types';
import { UserService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  GetUserById(@Param('id') id: string): Promise<userDetailsType | null> {
    return this.userService.getUserById(id);
  }
}
