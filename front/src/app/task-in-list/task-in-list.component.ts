import { Component, Input } from '@angular/core';
import { Task } from '../_models/task.module';

@Component({
  selector: 'app-task-in-list',
  templateUrl: './task-in-list.component.html',
  styleUrl: './task-in-list.component.css'
})
export class TaskInListComponent {


  @Input() task!: Task;

 
}
