import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../../_models/client.module';
@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  client: Client | null = null;
  showDetails: boolean = false;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.client = history.state.client;
  }
  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }
}