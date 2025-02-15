import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) {
    if (!data.id) {
      // IMPLEMENT HERE USING PRISMA API
      // l'id n'est pas fourni donc on crée une nouvelle tâche
      return this.prisma.task.create({
        data: {
          name: data.name as string,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    }
    // l'id est fourni, on va mettre à jour la tâche existante
    return this.prisma.task.update({
      where: {
        id: data.id as number,
      },
      data: {
        name: data.name as string,
        updatedAt: new Date().toISOString(),
      },
    });
  }
}
