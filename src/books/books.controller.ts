import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDataResponseDto } from './dto/response-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(
    @Body() createBookDto: CreateBookDto,
  ): Promise<BookDataResponseDto | BookDataResponseDto> {
    try {
      const createdData = await this.booksService.create(createBookDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: ['Book successfully created'],
        data: createdData,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      const booksData = await this.booksService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: ['Books successfully got'],
        data: booksData,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const bookData = await this.booksService.findOne(+id);
      if (bookData) {
        return {
          statusCode: HttpStatus.OK,
          message: ['Book successfully got'],
          data: bookData,
        };
      }
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: ['Book not found'],
        data: null,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    try {
      const isUpdated = await this.booksService.update(+id, updateBookDto);
      console.log(isUpdated[0]);
      if (isUpdated[0] === 1) {
        const updatedBook = await this.booksService.findOne(+id);
        return {
          statusCode: HttpStatus.OK,
          message: ['Book successfully updated'],
          data: updatedBook,
        };
      }
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: ['Book not found for update'],
        data: null,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deleted = await this.booksService.remove(+id);
      if (deleted === 1) {
        return {
          statusCode: HttpStatus.OK,
          message: ['Book successfully deleted'],
        };
      }

      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: ['Book not found for delete'],
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
