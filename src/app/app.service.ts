import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/RX';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

const baseUrl: string = "http://ec2-18-195-191-91.eu-central-1.compute.amazonaws.com:8787/";

export interface House {
    id: number,
    name: string
}

export interface Person {
    id: number,
    firstname: string,
    lastname: string,
    houseId: number;
    taskCount?: number;
}

export interface Task {
    id: number,
    description: string,
    done: boolean,
    userId: number,
    houseId: number,
    careatedUserId: number,
    userFirstname?: string
    userLastname?: string
}


@Injectable()
export class AppService {

    private authorizationKey: string;
    private apiRequestOptions: RequestOptions;
    private houses: House[] = [];

    public loginUser: Person;
    public isLoggedIn: boolean = false;

    constructor(private http: Http, private router: Router) { }

    /** 
     * Helper method that checks whether the user logged in to application
     * If not; navigates to login page
     */
    public navigateToHomePage() {
        this.router.navigate(['login']);
    }

    /** 
     * Gets houses by using HTTP get
     */
    public getHouses() {
        let getHousesUrl = baseUrl + "houses";
        return this.http.get(getHousesUrl);
    }

    /**
     * Sends user information by using HTTP post 
     * and returns an Observable regarding the success of post operation
     */
    public login(name: string, surname: string, houseID: number): Observable<boolean> {

        console.log("App service login method is called for ths user: " + name + " " + surname + ", and for the house id: " + houseID);

        let loginUrl = baseUrl + "login";
        let headers = new Headers();
        headers.append('content-type', "application/json");
        let options = new RequestOptions();
        options.headers = headers;

        return this.http.post(loginUrl, { firstname: name, lastname: surname, houseId: houseID }, options).map(
            response => {
                let responseData = response.json();
                if (responseData && responseData.success) {
                    this.authorizationKey = responseData.jwt; //get authentication key from response
                    this.initializeRequestHeader();
                    console.log("Authentication key of user: " + this.authorizationKey);
                    this.loginUser = { id: responseData.id, firstname: responseData.firstname, lastname: responseData.lastname, houseId: responseData.houseId };
                    console.log(this.loginUser);
                    this.isLoggedIn = true;
                    return true;
                }
                this.isLoggedIn = false;
                return false;
            }
        );
    }

    /**
     * Gets user list of the house by using HTTP get
     */
    public getUsers() {
        if (!this.loginUser || !this.loginUser.houseId) {
            console.log("Current house id information is not available!");
            return;
        }

        if (this.apiRequestOptions) {
            let houseId = this.loginUser.houseId;
            let getHouseUserssUrl = baseUrl + "houses/" + houseId + "/users";
            console.log("Get users URL: " + getHouseUserssUrl);
            return this.http.get(getHouseUserssUrl, this.apiRequestOptions);
        }
    }

    /** 
     * Gets task list of the house by using HTTP get
     */
    public getTasks() {
        if (!this.loginUser && !this.loginUser.houseId) {
            console.log("Current house id information is not available!");
            return;
        }

        if (this.apiRequestOptions) {
            let houseId = this.loginUser.houseId;
            let getHouseTasksUrl = baseUrl + "houses/" + houseId + "/tasks";
            console.log("Get tasks URL: " + getHouseTasksUrl);
            return this.http.get(getHouseTasksUrl, this.apiRequestOptions);
        }
    }

    /**
     * Updates user id of a task
     * @param targetTask    Task to update
     * @param targetUserId  user id to set 
     */
    public updateTask(targetTask: Task, targetUserId) {
        if (this.apiRequestOptions && targetTask) {
            let updateTaskUrl = baseUrl + "tasks/" + targetTask.id;

            let requestBody = {
                id: targetTask.id,
                description: targetTask.description,
                done: false,
                userId: targetUserId,
                houseId: targetTask.houseId,
                careatedUserId: targetTask.careatedUserId
            };
            return this.http.put(updateTaskUrl, requestBody, this.apiRequestOptions);
        }
    }

    /** 
     * Helper method that creates request header object by using authorization key
     */
    private initializeRequestHeader() {
        if (this.authorizationKey) {
            let headers = new Headers();
            headers.append('Content-Type', "application/json");
            headers.append('Authorization', this.authorizationKey);
            let options = new RequestOptions();
            options.headers = headers;

            this.apiRequestOptions = options;
        }
    }

    public deleteTask(targetTask: Task) {
        if (this.apiRequestOptions && targetTask) {
            let deleteTaskUrl = baseUrl + "tasks/" + targetTask.id;
            return this.http.delete(deleteTaskUrl, this.apiRequestOptions);
        }
    }

    public addTask(taskDescription) {
        if (this.apiRequestOptions && taskDescription && this.loginUser && this.loginUser.houseId) {
            let addTaskUrl = baseUrl + "tasks";
            let requestBody = {
                description: taskDescription,
                houseId : this.loginUser.houseId
            }
            return this.http.post(addTaskUrl, requestBody, this.apiRequestOptions);
        }
    }
}