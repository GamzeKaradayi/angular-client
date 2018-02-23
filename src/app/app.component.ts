import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  private isUserEnteredToHouse: boolean;

  private userEnteredToHouse(isEntered: boolean) {
    if (isEntered) {
      this.isUserEnteredToHouse = true;
    }
  }
}
