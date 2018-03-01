import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
  }

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
