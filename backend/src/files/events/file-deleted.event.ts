import { File } from '@prisma/client';

export class FileDeletedEvent {
  paths: File[];
}
