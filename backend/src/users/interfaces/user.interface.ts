export interface IUser {
  id: string;
  email: string;
  password: string;
  diskSpace: number;
  usedSpace: number;
  createdAt: Date;
  updatedAt: Date;
}
