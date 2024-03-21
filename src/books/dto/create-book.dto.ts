import { IsInt, IsNotEmpty, IsPositive, IsString, Max } from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'Book Title must be a string' })
  @IsNotEmpty({ message: 'Book Title should not be empty' })
  title: string;

  @IsString({ message: 'Author Full Name must be a string' })
  @IsNotEmpty({ message: 'Author Full Name should not be empty' })
  author: string;

  @IsPositive({
    message: 'Publication year must be a positive number',
  })
  @Max(new Date().getFullYear(), {
    message: 'Publication year must not be greater than 2024',
  })
  @IsInt({ message: 'Publication year must be an integer number' })
  @IsNotEmpty({ message: 'Publication year should not be empty' })
  year_of_publication: number;
}
