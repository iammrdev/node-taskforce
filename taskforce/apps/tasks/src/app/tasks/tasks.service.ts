import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  async getTask(taskId: string) {
    // Будет реализовано в модуле: Nest и базы данных. PostgreSQL
    return {};
  }

  async createTask() {
    // Будет реализовано в модуле: Nest и базы данных. PostgreSQL
    return {};
  }

  async updateTask() {
    // Будет реализовано в модуле: Nest и базы данных. PostgreSQL
    return {};
  }

  async getTasks() {
    // Будет реализовано в модуле: Nest и базы данных. PostgreSQL
    return [];
  }
}
