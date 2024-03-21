import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOKS_REPOSITORY')
    private booksRepository: typeof Book,
  ) {}

  async create(createBookDto: Omit<CreateBookDto, string>) {
    return await this.booksRepository.create(createBookDto);
  }

  async findAll() {
    return await this.booksRepository.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number) {
    return await this.booksRepository.findByPk(id);
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.booksRepository.update(updateBookDto, {
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.booksRepository.destroy({ where: { id } });
  }
}
