import {Task} from '../model/task.model';
import { Injectable } from '@angular/core';
import {TODO_API} from '../app.api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable() 

export class HomeService {
    constructor(private http: HttpClient) {}

    tasks: Task[];

    getTask(): Observable<Task[]> {
       return this.http.get<Task[]>('${TODO_API}/tasks');
    }
}