import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './schemas/todo.schema';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(private readonly todoService: TodosService) {}

    @Post()
    async create(@Body() createTodoDto: CreateTodoDto) {
        await this.todoService.create(createTodoDto);
    }

    @Get()
    async findAll(): Promise<Todo[]> {
        return this.todoService.findAll();
    }
}
