import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
} from 'sequelize-typescript';

@Table
export class Book extends Model {
  @BeforeCreate
  static async methodName(instance: Book) {
    const { title, author, year_of_publication } = instance.dataValues;
    const bookExist = !!(await Book.findOne({
      where: { title, author, year_of_publication },
    }));

    if (bookExist) {
      throw new Error('Book data can not repeat!');
    }
  }

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  year_of_publication: number;
}
