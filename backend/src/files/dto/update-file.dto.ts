import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFileDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  name: string;
}
