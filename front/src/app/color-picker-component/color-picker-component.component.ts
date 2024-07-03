import { Component } from '@angular/core';

@Component({

  selector: 'app-color-picker',
  template: `
    <h3>Choose a color:</h3>
    <p-colorPicker [(ngModel)]="selectedColor" [style]="{'width': '250px'}" [inline]="true"></p-colorPicker>
    <p>{{ selectedColor }}</p>
  `,
  templateUrl: './color-picker-component.component.html',
  styleUrl: './color-picker-component.component.css'
})
export class ColorPickerComponentComponent {

  selectedColor: string = '#1976d2'; // צבע ברירת המחדל
}
