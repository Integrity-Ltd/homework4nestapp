import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) { }

  create(createTodoDto: CreateTodoDto) {
    const todo = this.prisma.todos.create({
      data: {
        title: createTodoDto.title,
        description: createTodoDto.description,
      }
    });
    return todo;
  }

  findAll() {
    return this.prisma.todos.findMany();
  }

  findOne(id: number) {
    return this.prisma.todos.findUnique({
      where: { id: id }
    });
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.prisma.todos.update({ where: { id: id }, data: updateTodoDto });
  }

  remove(id: number) {
    return this.prisma.todos.delete({ where: { id: id } });
  }
}
