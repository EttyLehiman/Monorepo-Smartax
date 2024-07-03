import { Injectable } from '@angular/core';
import { routes } from '../app-routing.module'
import { Route } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ToolBarService {

  toolBarItems:any[] = [];

  getCurrentItems(role: number) {
    routes.forEach(item => {
      if (item.data!['forToolbar'] == true)
        if (item.data!['authType'] >= role)
          {
            const newItem={ label: item.data!['label'], icon: item.data!['icon'], route: item.path };
            this.toolBarItems.push(newItem);
          }
    });

    return this.toolBarItems;
  }
  constructor() { }
}
