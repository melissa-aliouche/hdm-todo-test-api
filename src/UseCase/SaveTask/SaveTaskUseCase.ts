import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from 'src/Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto) {
    // VALIDATION DTO, DATA SAVING, ERROR CATCHING
    if (!dto.name){
      throw new Error('Name is required !');
    }
    const taskData = {
      id: dto.id,
      name: dto.name,
    }
    return this.taskRepository.save(taskData);
    

    return null;
  }
}
