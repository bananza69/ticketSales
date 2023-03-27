import {Injectable} from '@angular/core';
import {IUser} from "../../models/users";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser | null;
  private token: string | null;

  constructor(private http: HttpClient) {
  }

  getUser(): IUser | null {
    return this.user;
  };

  setUser(user: IUser): void {
    this.user = user;
  };

  getToken(): string | null {
    return this.token;
  };

  setToken(token: string): void {
    this.token = token;
  };


  setInStore(token: string) {
    window.localStorage.setItem('userToken', token)
  }

  getInStore() {
    return window.localStorage.getItem('userToken')
  }

  setUserInStore(authUser: IUser): void {
    window.localStorage.setItem('authUser', JSON.stringify(authUser));
  }


  getUserInStore() {
    return window.localStorage.getItem('authUser')
  }


  getTokenAll() {
    if (!this.token) {
      return this.getInStore()
    }
    return this.token
  }

  removeUser(): void {
    this.token = null;
    this.user = null;
    window.localStorage.removeItem('userToken')
  }

  getUserById(userId: string) {
    return this.http.get("http://localhost:3000/users/" + userId)
  }

  getUserAll() {
    return this.http.get("http://localhost:3000/users/")
  }

}

