import {Injectable} from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private usersStorage: IUser[] = [];

  constructor() {
  }

  checkUser(user: IUser): boolean {

    const isUserExist = this.usersStorage.find((el) => el.login === user.login);
    let isUserSaveInStore = window.localStorage.getItem(user?.login);
    let userInStore: IUser = <IUser>{};

    if (isUserSaveInStore) {
      return userInStore = JSON.parse(isUserSaveInStore);
    }
    if (isUserExist) {
      return isUserExist.psw === user.psw;
    }
    return false;
  }

  setUser(user: IUser): void {
    const isUserExist = this.usersStorage.find((el) => el.login === user.login);
    if (!isUserExist && user?.login) {
      this.usersStorage.push(user);
    }
  }

  isUserExists(user: IUser): boolean {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);

    return !!isUserExists;
  }

}
