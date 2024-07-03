import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user.module';
import { UserService } from '../_services/user.service';

interface Product {
  name: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}


@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.css'
})


export class EmployeesTableComponent implements OnInit{
 
  constructor(public userService: UserService) {}

  users: User[] = []
    ngOnInit(): void {
      this.userService.getAllUsers().subscribe(
        suc=> this.users=suc,
        err=>console.log(err)
      )
      
    }

    

    getSeverity(status: string): 'success' | 'warning' | 'danger' | 'secondary' {
      switch (status) {
        case 'In Stock':
          return 'success';
        case 'Low Stock':
          return 'warning';
        case 'Out of Stock':
          return 'danger';
        default:
          return 'secondary'; // ערך ברירת מחדל
      }
    }

}
