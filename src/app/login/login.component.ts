import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService, House } from '../app.service';
import { Router } from '@angular/router';
import 'rxjs/RX';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private name: string;
  private surname: string;
  private houses: House[] = [];
  private selectedHouseName: string = 'Ev Seçiniz';

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.initializeHouses();
  }

  /** 
   * Gets houses information from app service
   */
  private initializeHouses() {
    this.appService.getHouses().subscribe(
      respond => {
        this.houses = respond.json();
        console.log("Evler:");
        console.log(this.houses);
      },
      message => console.log("Error! " + "${msg.status} ${msg.statusText}")
    );
  }


  /**
   * Logins the user to home by the help of the information: name & surname & house
   * App service login method is used
   */
  private loginToHouse() {

    console.log("Giriş button is clicked.");
    let selectedHouse = this.houses.find(item => item.name == this.selectedHouseName);

    if (this.name && this.surname && selectedHouse) {
      this.appService.login(this.name, this.surname, selectedHouse.id).subscribe(
        isLoginSuccessful => {
          if (isLoginSuccessful) {
            console.log("Login is successful for the user: " + this.name + " " + this.surname + " and for the home: " + this.selectedHouseName);
            this.router.navigate(['dashboard/home']);
          } else {
            console.log("Login is not successful!!");
          }
        }
      );

    }

  }
}
