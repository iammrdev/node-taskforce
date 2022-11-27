import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  async getTask(taskId: string) {
    return {
      status: 'ok',
      item: {
        id: taskId,
      },
    };
  }

  async createTask() {
    return {
      status: 'ok',
      item: {},
    };
  }

  async updateTask() {
    return {
      status: 'ok',
      item: {},
    };
  }

  async getTasks() {
    return {
      status: 'ok',
      items: [],
    };
  }
}
