import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../../_models/client.module';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent implements OnInit {
  client: Client | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.client = history.state.client;
    if (!this.client) {
      this.router.navigate(['/clientSearch']); // Redirect to client search if no client is found in state
    }
  }

  navigateToClientProfile(): void {
    debugger;
    this.router.navigate(['clientSearch/clientManagement/clientProfile'], { state: { client: this.client } });
  }

  navigateToClientNavbar(): void {
    this.router.navigate(['clientSearch/clientManagement/clientNavbar'], { state: { client: this.client } });
  }
}
