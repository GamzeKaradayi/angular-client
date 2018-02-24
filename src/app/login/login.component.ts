import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private name: string;
  private surname: string;
  private houses: string[] = ['Ev 1', 'Ev 2', 'Ev 3', 'Ev 4', 'Ev 5'];

  constructor() { }

  ngOnInit() {
  }

}
