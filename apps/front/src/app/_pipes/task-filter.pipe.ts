import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../_models/task.module';

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {
  transform(tasks: Task[], filter: any): Task[] {
    if (!tasks || !filter) {
      return tasks;
    }

    return tasks.filter(task => {
      const withinDeadline = !filter.deadlineRange || 
        (task.dueDate >= filter.deadlineRange[0] && task.dueDate <= filter.deadlineRange[1]);
      const matchesClient = !filter.client || task.client === filter.client.name;
    //   const matchesUser = !filter.user || task.assignedTo.includes(filter.user.name);
      const matchesTaskName = !filter.taskName || task.taskName.toLowerCase().includes(filter.taskName.toLowerCase());
    //   const matchesTag = !filter.tag || task.tags.includes(filter.tag.name);
      
      return withinDeadline && matchesClient  && matchesTaskName ;
    });
  }
}
