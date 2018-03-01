import { Component, OnInit } from '@angular/core';
import { AppService, Person, Task } from '../app.service';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css']
})
export class RouletteComponent implements OnInit {
  tasks: Array<Task>;
  houseHold: Array<Person>;
  roulette: any;
  iteration: number;
  selectedTaskItem: Task;

  constructor(private appService: AppService) {
    this.tasks = [];
  }

  ngOnInit() {
    if (!this.appService.isLoggedIn) {
      this.appService.navigateToHomePage();
    } else {
      this.roulette = document.getElementById("roulette");
      this.iteration = 10;
      this.initializeHouseHold();
      this.initializeTasks();
    }
  }

  private initializeHouseHold() {
    this.appService.getUsers().subscribe(
      respond => {
        this.houseHold = respond.json();
        this.generateRoulette();
      },
      message => console.log("Error! " + message.status + " " + message.statusText)
    );
  }

  private initializeTasks() {
    this.appService.getTasks().subscribe(
      respond => {
        this.tasks = respond.json().filter(item => item.userId == null);

      },
      message => console.log("Error! " + message.status + " " + message.statusText)
    );

  }

  private generateRoulette() {
    let self = this;
    for (var i = 0; i < this.iteration; i++) {

      self.houseHold.forEach(function (user, index) {
        self.roulette.innerHTML += "<div class='user'>" + user.firstname + " " + user.lastname + "</div>";
      });

    }
  }

  private startRoulette() {

    let self = this;

    var Decisions = {
      Iteration: this.GetRandomNumberByRange(1, this.iteration),
      User: this.GetRandomNumberByRange(0, this.houseHold.length)
    };

    var selectedUser = {
      item: (Decisions.Iteration * this.houseHold.length) + Decisions.User,
      user: this.houseHold[Decisions.User]
    }

    this.roulette.classList.remove("reset");
    this.roulette.classList.add("active");
    this.roulette.style.marginTop = -1 * 60 * selectedUser.item + 120 + "px";

    setTimeout(() => {
      this.roulette.classList.remove("active");
      this.roulette.classList.add("reset");
      this.roulette.removeAttribute("style");

      self.appService.updateTask(this.selectedTaskItem, selectedUser.user.id).subscribe(
        response => {         
          console.log(response.json());
          alert("İhale " + selectedUser.user.firstname + " " + selectedUser.user.lastname + " adlı kişiye kalmıştır.");
        
          this.selectedTaskItem.userId = selectedUser.user.id;
          this.tasks = this.tasks.filter(item => item.userId == null);
        }
      )
    }, 6500);

  }

  private GetRandomNumberByRange(min, max) {
    return parseInt(Math.random() * (max - min) + min);
  }

  /**
   * Event handler for click operation on task item
   * @param taskItem target task item to select
   */
  private taskItemSelected(taskItem) {
    this.selectedTaskItem = taskItem;
    console.log("Selected task item id: " + taskItem.id);
    console.log("Selected task item user id: " + taskItem.userId);
  }

}
