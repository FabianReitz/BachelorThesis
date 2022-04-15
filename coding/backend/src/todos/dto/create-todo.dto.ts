import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoDto {
    @IsString()
    readonly name: string;

    @IsBoolean()
    readonly isDone: boolean;
}
