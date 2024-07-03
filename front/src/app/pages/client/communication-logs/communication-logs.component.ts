import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../../_services/communicaton.service';
import { UserService } from '../../../_services/user.service';
import { Communication } from '../../../_models/communication.module';
import { User } from '../../../_models/user.module';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-communication-logs',
  templateUrl: './communication-logs.component.html',
  styleUrls: ['./communication-logs.component.css']
})
export class CommunicationLogsComponent implements OnInit {

  communications: Communication[] = [];
  users: SelectItem[] = [];
  newCommunication: Communication = {
    client: { name: '', contactInfo: '', businessName: '', source: '', status: '', createdDate: new Date() },
    date: new Date(),
    type: '',
    summary: '',
    assignedTo: null
  };
  
  selectedCommunication: Communication | null = null; // for editing

  constructor(private communicationService: CommunicationService, private userService: UserService) { }

  ngOnInit(): void {
    this.getAllCommunications();
    this.loadUsers();
  }

  getAllCommunications(): void {
    this.communicationService.getAllCommunications()
      .subscribe((communications: Communication[]) => this.communications = communications);
  }

  createCommunication(): void {
    this.communicationService.createCommunication(this.newCommunication)
      .subscribe((newCommunication: Communication) => {
        this.communications.push(newCommunication);
        this.resetForm();
      });
  }

  selectCommunication(communication: Communication): void {
    this.selectedCommunication = { ...communication }; // Clone the communication for editing
  }

  updateCommunication(): void {
    if (this.selectedCommunication) {
      this.communicationService.updateCommunication(this.selectedCommunication._id!, this.selectedCommunication)
        .subscribe((updatedCommunication: Communication) => {
          const index = this.communications.findIndex(c => c._id === updatedCommunication._id);
          if (index !== -1) {
            this.communications[index] = updatedCommunication;
          }
          this.selectedCommunication = null;
        });
    }
  }

  deleteCommunication(id: string): void {
    this.communicationService.deleteCommunication(id)
      .subscribe(() => {
        this.communications = this.communications.filter(c => c._id !== id);
      });
  }

  private resetForm(): void {
    this.newCommunication = {
      client: { name: '', contactInfo: '', businessName: '', source: '', status: '', createdDate: new Date() },
      date: new Date(),
      type: '',
      summary: '',
      assignedTo: null
    };
  }

  private loadUsers(): void {
    this.userService.getAllUsers()
      .subscribe((users: User[]) => {
        this.users = users.map(user => ({
          label: user.userName,
          value: user // Include whole user object as value
        }));
      });
  }
  
}

