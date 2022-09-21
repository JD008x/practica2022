import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../../../backend/src/models/user.model';
import { catchError, Observable } from 'rxjs';
import { ObjectId } from 'mongoose';
import { UserDB } from '../../../../backend/src/schemas/user.schema';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };
  
  userData: Array<User>;


  constructor(private http: HttpClient) {
    this.userData = new Array<User>();
  }


  getUsersFromBackend(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/user');
  }

  getUserById(id : ObjectId): User {
    this.getUsersFromBackend().subscribe((result) => {
      if (!result) {
        return;
      }
      this.userData = result;
    });
    return this.userData.filter((x) => x._id == id)[0];
  }
  
  

  addUser(user : User): Observable<User>{
    return this.http.post<User>('http://localhost:3000/user', user, this.httpOptions);
  }


  deleteUsers(id : ObjectId): Observable<User[]>{
    return this.http.delete<User[]>('http://localhost:3000/user/:id');
  }

  
}
