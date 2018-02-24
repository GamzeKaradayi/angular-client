import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css']
})
export class RouletteComponent implements OnInit {
  tasks: Array<any>;
  roulette: any;
  iteration: number;

  houseHold: Array<any>;
  constructor() {

  }

  ngOnInit() {
    this.roulette = document.getElementById("roulette");
    this.iteration = 10;
    this.initializeHouseHold();
    this.initializeTasks();
    this.generateRoulette();
  }

  private initializeHouseHold() {
    this.houseHold = [
      { name: 'Ali', surname: 'Yılmaz', taskCount: 1 },
      { name: 'Mehmet', surname: 'Akay', taskCount: 2 },
      { name: 'PelinSu', surname: 'Atalay', taskCount: 1 },
      { name: 'Osman', surname: 'Öztürk', taskCount: 0 },
      { name: 'Aslı', surname: 'Sönmez', taskCount: 1 },
    ];
  }

  private initializeTasks() {
    this.tasks = [
      { taskName: 'Bulaşık Yıkama', taskOwner: this.houseHold[0] },
      { taskName: 'Markete Gitme', taskOwner: this.houseHold[1] },
      { taskName: 'Tavuk Döner Alıp Gelme', taskOwner: this.houseHold[2] },
      { taskName: 'Çöpleri Atma', taskOwner: null },
      { taskName: 'Pizza Ismarlama', taskOwner: this.houseHold[3] },
      { taskName: 'Ekmek Alma', taskOwner: this.houseHold[4] },
      { taskName: 'Genel Temizlik', taskOwner: null },
    ];
  }

  private generateRoulette() {

    let self = this;
    for (var i = 0; i < this.iteration; i++) {

      self.houseHold.forEach(function (User, index) {
        self.roulette.innerHTML += "<div class='user'>"  + User.name + " " + User.surname + "</div>";
      });

    }
  }

  private startRoulette() {
    var Decisions = {
      Iteration: this.GetRandomNumberByRange(1, this.iteration),
      User: this.GetRandomNumberByRange(0, this.houseHold.length)
    };

    var Selected = {
      Item: (Decisions.Iteration * this.houseHold.length) + Decisions.User,
      User: this.houseHold[Decisions.User]
    }


    this.roulette.classList.remove("reset");
    this.roulette.classList.add("active");
    this.roulette.style.marginTop = -1 * 60 * Selected.Item + 120 + "px";

    setTimeout(function () {
      alert("İhale " + Selected.User.name + " " + Selected.User.surname + " adlı kişiye kalmıştır.");
      this.roulette.classList.remove("active");
      this.roulette.classList.add("reset");
      this.roulette.removeAttribute("style");
    }, 6500);

  }

  private GetRandomNumberByRange(min, max) {
    return parseInt(Math.random() * (max - min) + min);
  }

}
