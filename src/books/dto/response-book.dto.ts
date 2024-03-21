import { Book } from '../entities/book.entity';

export class ResponseBookDto {
  statusCode: number;
  message: string[];
}

export class BookDataResponseDto extends ResponseBookDto {
  data: Book | Book[];
}
