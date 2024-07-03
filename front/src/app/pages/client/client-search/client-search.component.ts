import { Component, OnInit } from '@angular/core';
import { Client } from '../../../_models/client.module';
import { ClientService } from '../../../_services/client.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AutoCompleteSelectEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.scss']
})
export class ClientSearchComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchName = new FormControl('');
  selectedClient: Client | null = null;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true; // Enable Ripple effect globally
  
    this.searchName.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      if (value !== null) {
      
        
        this.filterClients(value); // Pass the value directly to filterClients
      }
    });
  
    this.loadAllClients();
  }
  loadAllClients(): void {
    this.clientService.getAllClients().subscribe(clients => {
      this.clients = clients;
    });
  }
  filterClients(value: string): void {
    if (value !== null) {
      const query = value.toLowerCase();
      this.filteredClients = this.clients.filter(client =>
        (client.name && client.name.toLowerCase().includes(query)) ||
        (client.businessName && client.businessName.toLowerCase().includes(query))
      );
    }
  }
  
  selectClient(event: AutoCompleteSelectEvent): void {
    const client = event.value as Client;
    this.router.navigate(['clientSearch/clientManagement'], { state: { client } });
  }
  

  selectClientFromList(client: Client): void {
    this.router.navigate(['clientSearch/clientManagement'], { state: { client } });
  }
}
