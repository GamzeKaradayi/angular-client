import { Component, OnInit } from '@angular/core';
import { AppService, Person, Task } from '../app.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  private houseHold: Person[];
  private tasks: Task[];
  private currentUser: Person;
  private isUserDataReady: boolean = false;
  private isTaskDataReady: boolean = false;
  private newTaskDescription: string = '';
  private disableNewTaskButton = true;
  constructor(private appService: AppService) { }

  ngOnInit() {
    if (!this.appService.isLoggedIn) {
      this.appService.navigateToHomePage();
    } else {
      this.initializeHouseHold();
      this.initializeTasks();
      this.currentUser = this.appService.loginUser;
    }
  }

  private initializeHouseHold() {
    this.appService.getUsers().subscribe(
      respond => {
        this.houseHold = respond.json();
        this.isUserDataReady = true;
        console.log("Ev halkı:");
        console.log(this.houseHold);
        this.checkIfHomePageDataReady();
      },
      message => console.log("Error! " + message.status + " " + message.statusText)
    );
  }

  private initializeTasks() {
    this.appService.getTasks().subscribe(
      respond => {
        this.tasks = respond.json();
        this.isTaskDataReady = true;
        console.log("Tasklar:");
        console.log(this.tasks);
        this.checkIfHomePageDataReady();
      },
      message => console.log("Error! " + message.status + " " + message.statusText)
    );
  }


  /**
   * Checks whether house users and tasks data are ready to use
   */
  private checkIfHomePageDataReady() {
    if (this.isTaskDataReady && this.isUserDataReady) {
      this.setTaskCountOfUsers();
      this.setUserNameOfTasks();
    }
  }

  /**
   * Returns first name of a user by filtering user list according to id 
   * @param userId 
   */
  private getUserNameById(userId: number) {
    if (userId && this.houseHold && this.houseHold.length > 0) {
      let targetUser = this.houseHold.find(item => item.id == userId);
      return targetUser.firstname;
    }
  }

  /**
   * Returns task count of a user by filtering tasks by user id
   * @param userId  id information of a user as filter parameter
   */
  private getTaskCountOfUser(userId: number) {

    if (this.tasks && this.tasks.length > 0) {
      let tasksOfUser = this.tasks.filter(item => item.userId == userId);
      return tasksOfUser ? tasksOfUser.length : 0;
    }
  }


  /** 
   * Sets user name information on each task by filtering user list (houseHold)
   */
  private setUserNameOfTasks() {
    if (this.houseHold && this.houseHold.length > 0 && this.tasks && this.tasks.length > 0) {
      this.tasks.forEach(taskItem => {
        taskItem.userFirstname = this.getUserNameById(taskItem.userId);
      });
    }
  }

  /** 
   * Sets task count property of each user by filtering task list
   */
  private setTaskCountOfUsers() {

    if (this.houseHold && this.houseHold.length > 0 && this.tasks && this.tasks.length > 0) {
      this.houseHold.forEach(user => {
        user.taskCount = this.getTaskCountOfUser(user.id);
      });
    }
  }

  private deleteTask(taskItem){
    this.appService.deleteTask(taskItem).subscribe(
      respond => {
        console.log("Task deleted: " + respond);
        this.initializeTasks();
      },
      message => console.log("Error! " + message.status + " " + message.statusText)
    );
  }

  private addNewTask() {
    if (_.trim(this.newTaskDescription) !== '') {
       this.appService.addTask(this.newTaskDescription).subscribe(
      respond => {
        console.log("Task added: " + respond);
        this.initializeTasks();
      },
      message => console.log("Error! " + message.status + " " + message.statusText)
    );
    }
  }

  private newTaskNameChanged() {
    if (_.trim(this.newTaskDescription) === '') {
      this.disableNewTaskButton = true;
    }else{
      this.disableNewTaskButton = false;
    }
  }
}
