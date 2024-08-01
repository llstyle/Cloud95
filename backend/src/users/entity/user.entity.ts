import { Exclude } from 'class-transformer';
import { IUser } from '../interfaces/user.interface';

export class UserEntity implements IUser {
  id: string;
  email: string;

  @Exclude()
  password: string;

  diskSpace: number;
  usedSpace: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
