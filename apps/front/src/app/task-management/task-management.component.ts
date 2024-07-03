import { Component, OnInit } from '@angular/core';
import { TaskService } from '../_services/task.service';
import { Task } from '../_models/task.module';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css'],
})
export class TaskManagementComponent implements OnInit {

  tasks: Task[] = [];
  toDoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchTerm: string = '';



  showFilter: boolean = false;
  filter = {
    deadlineRange: null,
    client: null,
    user: null,
    taskName: null,
    tag: null
  };

  clientSuggestions: any[] = [];
  userSuggestions: any[] = [];
  taskNameSuggestions: any[] = [];
  tagSuggestions: any[] = [];


  constructor(private taskService: TaskService ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getAllTasks().subscribe((allTasks: Task[]) => {
      this.tasks = allTasks;
      console.log(this.tasks);
      
      this.categorizeTasks();
    });
  }

  categorizeTasks(): void {
    this.toDoTasks = this.tasks.filter(task => task.status === 'to do');
    this.inProgressTasks = this.tasks.filter(task => task.status === 'in progress');
    this.doneTasks = this.tasks.filter(task => task.status === 'done');
  }

searchTask(): void {
  if (this.searchTerm.trim() === '') {
    
    this.filteredTasks = []; 
  } else {
    this.filteredTasks = this.tasks.filter(task =>
      task.taskName.toLowerCase().includes(this.searchTerm.toLowerCase())  
    );
    console.log(this.filteredTasks);
  }
}
confirmDelete(id: string): void {
  if (confirm("Are you sure you want to delete this task?")) {
    this.deleteTask(id);
  }
}

deleteTask(id: string): void {
  this.taskService.deleteTask(id).subscribe({
    next: () => {
      this.tasks = this.tasks.filter( task => task._id !== id);
      this.categorizeTasks();
    },
    error: err => console.error('Error deleting task: ', err)
  });
}

toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  searchClients(event: any): void {
    // Implement client search logic
  }

  searchUsers(event: any): void {
    // Implement user search logic
  }

  searchTaskNames(event: any): void {
    // Implement task name search logic
  }

  searchTags(event: any): void {
    // Implement tag search logic
  }

  // applyFilter(): void {
  //   this.filteredTasks = this.tasks.filter(task => {
  //     const withinDeadline = !this.filter.deadlineRange || 
  //       (task.dueDate >= this.filter.deadlineRange[0] && task.dueDate <= this.filter.deadlineRange[1]);
  //     const matchesClient = !this.filter.client || task.client === this.filter.client.name;
  //     const matchesUser = !this.filter.user || task.assignees.includes(this.filter.user.name);
  //     const matchesTaskName = !this.filter.taskName || task.taskName.toLowerCase().includes(this.filter.taskName.toLowerCase());
  //     const matchesTag = !this.filter.tag || task.tags.includes(this.filter.tag.name);
      
  //     return withinDeadline && matchesClient && matchesUser && matchesTaskName && matchesTag;
  //   });
  // }
    
  }

    

