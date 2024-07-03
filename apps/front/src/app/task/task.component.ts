import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.module';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientService } from '../_services/client.service';
import { Client } from '../_models/client.module';
import { TagService } from '../_services/tag.service';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../_services/task.service';
import { Task } from '../_models/task.module';
import { Tag } from '../_models/tag.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  users: User[] = [];
  clients: Client[] = [];
  items: any[] = []; //list of status
  currentTask: Task | undefined;
  newTask: Task | undefined;

  //
  formGroupClient!: FormGroup;
  formGroupUser!: FormGroup;
  formGroupStatus!: FormGroup;
  formGroupTags!: FormGroup;
  //
  constructor(
    private userSErvice: UserService,
    private clientService: ClientService,
    private tagService: TagService,
    private tasksService: TaskService,
    private route: ActivatedRoute,
    private http:HttpClient
  ) {}

  id: string | undefined;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id !== 'create') {
      this.tasksService.searchTask(this.id!).subscribe({
        next: (data) => {
          console.log(data);
          this.currentTask = data;
          this.selectStatus = this.currentTask.status;
          this.selectedClient = this.currentTask.client;
          this.selectedUser = this.currentTask.assignedTo;
          for (let i = 0; i < this.currentTask.tags.length; i++) {
            const tag = this.currentTask.tags[i];
            this.buttons.push({ color: tag.color, text: tag.text ,id:tag._id!});
          }
          //b optional
          // this.buttons = this.currentTask.tags.map((tag: Tag) => ({
          //   color: tag.color,
          //   text: tag.text,
          //   id: tag._id!,
          // }));
          // this.selectedTags = this.currentTask.tags;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
    }
    //
    this.userSErvice.getAllUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    //
    this.clientService.getAllClients().subscribe({
      next: (dataClients) => {
        console.log(dataClients);
        this.clients = dataClients;
      },
      error: (errClients) => {
        console.log(errClients);
      },
    });
    //list status
    this.items = [
      {
        separator: true,
      },
      {
        label: 'NOT STARTED',
        items: [
          {
            label: 'TO DO',
            icon: 'pi pi pi-check',
            shortcut: '⌘+N',
            color: 'gray',
          },
        ],
      },
      {
        label: 'ACTIVE',
        items: [
          {
            label: 'IN PROGRESS',
            shortcut: '⌘+O',
            color: 'blue',
          },
          {
            label: 'COMPLETE',
            icon: 'pi pi-check-circle',
            badge: '2',
            color: 'green',
          },
        ],
      },
      {
        separator: true,
      },
    ];
    //
    this.formGroupClient = new FormGroup({
      selectedClient: new FormControl<any | null>(null),
    });
    this.formGroupUser = new FormGroup({
      selectedUser: new FormControl<any | null>(null),
    });
    this.formGroupStatus = new FormGroup({
      selectStatus: new FormControl<any | null>(null),
    });
   
  }
  // function - hash that create color profile
  getColor(name: string): string {
    const hash = name
      .split('')
      .reduce((acc, char) => char.codePointAt(0)! + ((acc << 5) - acc), 0);
    const colorValues = Array(3)
      .fill(0)
      .map((_, i) => (hash >> (i * 8)) & 0xff);
    const color = `#${colorValues
      .map((value) => ('00' + value.toString(16)).substr(-2))
      .join('')}`;
    return color;
  }
  //
  date2: Date | undefined;
  //
  checked: boolean = false;
  //
  showStatus: boolean = false;
  showAssignees: boolean = false;
  showClients: boolean = false;
  showTags: boolean = false;
  //
  selectedCity!: any;
  selectedClient!: any;
  selectedUser!: any;
  selectStatus: string = 'NOT STARTED';
  selectedColor: string = '#1976d2'; // default color
  selectedTags: Tag[]=[];
  //
  text: string | undefined; //description of task
  //functions
  save() {
    if(this.id !== 'create'){
      //update task
    }
    else{
      //create task
      const newTask: Task = {
        client: this.selectedClient,
        description: this.text!,
        status: this.selectStatus,
        tags: this.selectedTags,
        assignedTo: this.selectedUser,
        taskName: "Task1",
        dueDate: this.date2!
      };
      console.log(this.selectedTags);
      
      
      this.tasksService.createTask(newTask).subscribe({
        next: (dataClients) => {
          console.log(dataClients);
        },
        error: (errClients) => {
          console.log(errClients);
        },
      });

    }
  }
  cancel() {
    //return to last page
    window.history.back();
  }

  changeStatus() {
    this.selectStatus = 'COMPLETE';
    console.log(this.text);
  }

  createTag() {
    this.showTags = !this.showTags;
    if (this.buttonText && this.selectedColor) {
      //back
      this.tagService
        .createTag({ color: this.selectedColor, text: this.buttonText })
        .subscribe({
          next: (dataTag) => {
            console.log(dataTag);
            this.selectedTags.push({ color: dataTag.color, text: dataTag.text ,_id:dataTag._id!});
            // this.clients = dataClients;
            this.buttons.push({ color: this.selectedColor, text: this.buttonText ,id:dataTag._id!});
      this.buttonText = ''; // Clear the input after creating the button
          },

          error: (errTag) => {
            console.log(errTag);
          },
        });

      
    }
  }
  //
  buttonText: string = '';
  buttons: { color: string; text: string ;id:string}[] = [];

  removeButton(button: any) {
    const index = this.buttons.indexOf(button);
    if (index !== -1) {
      this.buttons.splice(index, 1);
    }
  }

  status(label: string) {
    this.selectStatus = label;
    console.log(this.selectStatus);
  }
  // upload
  onUpload(event: any) {
    console.log(event.files);
    
      const formData = new FormData();
      formData.append('image',event.files[0]);
      console.log(formData);
      this.http.post('http://localhost:8080/tasks/upload', formData).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  // 
  text2: string = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';


  // 

  selectedFile: File | null = null;

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
  
    if (inputElement instanceof HTMLInputElement) {
      this.selectedFile = inputElement.files![0];
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      
      this.http.post('http://localhost:8080/tasks/upload', formData).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );

      // שלח את התמונה לשרת כאן
    }
  }
}
