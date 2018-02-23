import { Component, OnInit } from '@angular/core';

export interface Person {
  name: string;
  surname: string;
  taskCount: number;
}

export interface Task {
  taskName: string;
  taskOwner: Person;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  private houseHold: Person[];
  private tasks: Task[];

  constructor() { }

  ngOnInit() {
    this.initializeHouseHold();
    this.initializeTasks();
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
      { taskName: 'Bulaşık Yıkama', taskOwner: this.houseHold[0]},
      { taskName: 'Markete Gitme', taskOwner: this.houseHold[1] },
      { taskName: 'Tavuk Döner Alıp Gelme', taskOwner: this.houseHold[2] },
      { taskName: 'Çöpleri Atma', taskOwner: null },
      { taskName: 'Pizza Ismarlama', taskOwner: this.houseHold[3] },
      { taskName: 'Ekmek Alma', taskOwner: this.houseHold[4] },
      { taskName: 'Genel Temizlik', taskOwner: null },
    ];
  }
}
