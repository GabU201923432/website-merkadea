import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/tusers';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  basePath: string = environment.basePath;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.basePath);
  }

  getUserId(id: any) {
    return this.http.get<User>(`${this.basePath}/${id}`);
  }

  addUser(knowledge: User) {
    return this.http.post<User>(this.basePath, knowledge);
  }

  updateUser(id: any, user: User) {
    return this.http.put<User>(`${this.basePath}/${id}`, user);
  }

  deleteUser(id: any) {
    return this.http.delete<User>(`${this.basePath}/${id}`);
  }
}
