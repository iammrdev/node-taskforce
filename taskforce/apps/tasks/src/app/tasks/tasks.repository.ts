import { CRUDRepository } from '@taskforce/core';
import { TasksEntity } from './tasks.entity';
import { Task } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksRepository implements CRUDRepository<TasksEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(entity: TasksEntity): Promise<Task> {
    const entityData = entity.toObject();

    return this.prisma.task.create({
      data: {
        ...entityData,
        comments: {
          connect: []
        },
        tags: {
          connect: entityData.tags.map(({ id }) => ({ id }))
        }
      },
      include: {
        category: true,
        comments: true,
        tags: true
      }
    });
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }

  public findById(id: number): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: { id },
      include: {
        category: true,
        comments: true,
        tags: true
      }
    });
  }

  public find(ids: number[] = []): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        id: { in: ids.length > 0 ? ids : undefined },
      },
      include: {
        category: true,
        comments: true,
        tags: true
      }
    });
  }

  public update(id: number, entity: TasksEntity): Promise<Task> {
    const entityData = entity.toObject();

    return this.prisma.task.update({
      where: { id },
      data: {
        ...entityData,
        id,
        comments: {
          connect: entityData.comments.map(({ id }) => ({ id }))
        },
        tags: {
          connect: entityData.tags.map(({ id }) => ({ id }))
        }
      },
      include: {
        category: true,
        comments: true,
        tags: true
      }
    });
  }
}