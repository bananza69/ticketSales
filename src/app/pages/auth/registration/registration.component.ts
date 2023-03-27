import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";
import {ConfigService} from "../../../services/config/config.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ServerError} from "../../../models/erorr";
import * as bcrypt from "bcryptjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
  login: string;
  psw: string;
  pswRepeat: string;
  email: string;
  cardNumber: string;
  saveUserLocalStore: [login: string, psw: string];
  showUserCard: boolean;

  constructor(private messageService: MessageService,
              private authService: AuthService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.showUserCard = ConfigService.config.useUserCard
  }

  registration(ev: Event): void | boolean {
    if (this.psw !== this.pswRepeat) {
      this.messageService.add({severity: 'error', summary: 'Пароли не совпадают'});
      return false;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPsw = bcrypt.hashSync(this.psw, salt);

    const userObj: IUser = {
      psw: hashPsw,
      cardNumber: this.cardNumber,
      login: this.login,
      email: this.email,
    }

    this.http.post<IUser>('http://localhost:3000/users/', userObj).subscribe((data) => {
      if (this.saveUserLocalStore) {
        const objUserJsonStr = JSON.stringify(userObj);
        window.localStorage.setItem('user_' + userObj.login, objUserJsonStr);
      }
      this.messageService.add({severity: 'success', summary: 'Регистрация прошла успешно'});

    }, (err: HttpErrorResponse) => {
      const serverError = <ServerError>err.error;
      this.messageService.add({severity: 'warn', summary: serverError.errorText});
    });

  }
}
