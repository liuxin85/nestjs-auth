import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  PartialType,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { User } from 'src/db/schema';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks for current user' })
  findAll(@CurrentUser() user: User) {
    return this.tasksService.findAllForUser(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  create(@CurrentUser() user: User, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(user.id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  update(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, user.id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.tasksService.delete(id, user.id);
  }
}
