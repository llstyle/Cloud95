import { IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
  @IsString()
  @IsOptional()
  directoryId: string;
  @IsString()
  @IsOptional()
  name: string;
}
