import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private name: string;
  private surname: string;
  private houses: string[] = ['Ev 1', 'Ev 2', 'Ev 3', 'Ev 4', 'Ev 5'];

  /** 
   * Event handler for login(giris) button
   */
  private enterHouse(): void {
    alert('Eve hoş geldin ' + this.name + ' ' + this.surname + ' :)');
  }
}
