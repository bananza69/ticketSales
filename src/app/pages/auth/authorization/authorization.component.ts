import {Component, OnInit, OnDestroy} from '@angular/core';
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ServerError} from "../../../models/erorr";



@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy {

  loginText = 'Логин';
  pswText = 'Пароль';

  login: string;
  psw: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;
  authCardNumber: string;
  error: boolean = false;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private userService: UserService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    // console.log('init');
    this.authTextButton = "Авторизоваться";
  }

  ngOnDestroy(): void {
    // console.log('destroy');
  }

  vipStatusSelected(): void {
  }

  onAuth(ev: Event): void {

    // const salt = bcrypt.genSaltSync(10);
    // authUser.psw = bcrypt.hashSync(authUser.psw, salt);

    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber,
      }

    this.http.post<{access_token: string, id: string , psw: string}>('http://localhost:3000/users/' + authUser.login, authUser).subscribe((data) => {
      authUser.id = data.id;
      authUser.psw = data.psw;

      this.userService.setUser(authUser);
      this.userService.setUserInStore(authUser);

      const token: string = data.access_token;
      this.userService.setToken(token);
      this.userService.setInStore(token);

      if (this.authCardNumber) {
        const user = <IUser>this.userService.getUser();
        user.cardNumber = this.authCardNumber;
        this.userService.setUser(user);
        this.http.put<IUser>('http://localhost:3000/users/' + user.id + '', user)
          .subscribe((data) => {
            this.messageService.add({severity: 'success', summary: 'Номер VIP-карты успешно добавлен'});
          }, (err: HttpErrorResponse) => {
            //console.log('err', err)
            const serverError = <ServerError>err.error;
            //console.log('serverError', serverError)
            this.messageService.add({
              severity: 'warn',
              summary: 'Ошибка при добавлении VIP-карты. ' + serverError.errorText
            });
          });
      }
      this.router.navigate(['tickets/tickets-list'])
    }, (err: HttpErrorResponse) => {
      // console.log('err', err)
      const serverError = <ServerError>err.error;
      this.messageService.add({severity: 'warn', summary: serverError.errorText});
      this.error = true;
    });
  }

  onInputAuth() {
    this.error = false;
  }

}
