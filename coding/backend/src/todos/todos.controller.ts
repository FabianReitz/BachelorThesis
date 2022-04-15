import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './schemas/todo.schema';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(private readonly todoService: TodosService) {}

    @Post()
    async create(@Body() createTodoDto: CreateTodoDto) {
        try {
            return await this.todoService.create(createTodoDto);
        } catch (error) {
            return error;
        }
    }

    @Get()
    async findAll(): Promise<Todo[]> {
        try {
            return this.todoService.findAll();
        } catch (error) {
            return error;
        }
    }

    // This route is purely for development purposes.
    @Get('/reset')
    async reset(): Promise<void> {
        try {
            return this.todoService.reset();
        } catch (error) {
            return error;
        }
    }
}
