import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { booksProviders } from './providers/books.providers';

@Module({
  controllers: [BooksController],
  providers: [BooksService, ...booksProviders],
})
export class BooksModule {}
