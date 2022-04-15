import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
    constructor(
        @InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
    ) {}

    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        const createdTodo = new this.todoModel(createTodoDto);
        return createdTodo.save();
    }

    async findAll(): Promise<Todo[]> {
        return this.todoModel.find().exec();
    }

    async reset(): Promise<any> {
        return this.todoModel.deleteMany().exec();
    }
}
