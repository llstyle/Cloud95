import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FileDeletedEvent } from '../events/file-deleted.event';
import * as fs from 'fs';

@Injectable()
export class FileDeletedListener {
  @OnEvent('file.deleted')
  handleOrderCreatedEvent(event: FileDeletedEvent) {
    event.paths.forEach((file) => {
      fs.unlink(file.path, (err) => {
        if (err) {
          throw new Error('Some trouble when delete file');
        }
      });
    });
  }
}
