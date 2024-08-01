import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDirectoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsOptional()
  parentId: string;
}
