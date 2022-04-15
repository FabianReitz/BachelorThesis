import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    isDone: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
