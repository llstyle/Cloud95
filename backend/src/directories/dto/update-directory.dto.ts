import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateDirectoryDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  name: string;
}
