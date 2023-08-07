import {
  Controller,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(RolesGuard)
  getUsers() {
    return this.userService.getUsersList();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.getUserById(userId);
  }
}
