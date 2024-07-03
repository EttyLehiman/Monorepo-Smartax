import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TabMenu } from 'primeng/tabmenu';
import { ToolBarService } from '../_services/tool-bar.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
  @ViewChild
  (TabMenu) tabMenu: TabMenu | undefined;

  @Input()
  items : any[]=[];

  constructor(private router:Router) {}

  ngOnInit(): void {
  }

  onTabChange(event: any) {
    alert('test');
    const selectedItem = event.value;
    this.navigateTo(selectedItem.route);
  }

  navigateTo(path: string): void {
   this.router.navigate([path]);
  }
}