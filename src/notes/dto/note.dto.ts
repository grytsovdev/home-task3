import { IsBoolean, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class NoteDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsIn(['Idea', 'Task', 'Random Thought'])
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsBoolean()
  archived: boolean;
}
