import { Component, OnInit } from '@angular/core';
import { Person, AppService } from '../app.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  private currentUser: Person;
  
  constructor(private appServie: AppService) { }

  ngOnInit() {
    this.currentUser = this.appServie.loginUser;
  }

}
