import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription, take, takeUntil} from "rxjs";
import {ObservableExampleService} from "../../../services/testing/observable-example.service";
import {SettingsService} from "../../../services/settings/settings.service";
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {UserService} from "../../../services/user/user.service";
import {IUser} from "../../../models/users";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ServerError} from "../../../models/erorr";
import * as bcrypt from "bcryptjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  private subjectForUnsubscribe = new Subject();
  user: IUser | null;
  newPsw: string;
  rptNewPsw: string;
  pswUser: string;
  _hasView: boolean = false;

  constructor(private testing: ObservableExampleService,
              private settingsService: SettingsService,
              private authService: AuthService,
              private messageService: MessageService,
              private userService: UserService,
              private http: HttpClient) {
  }

  ngOnInit(): void {

    this.user = this.userService.getUser();
    console.log(this.user,'user ')
    if (this.user?.login === 'Admin') {
      this._hasView = true;
    }
    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      // console.log('settingsData', data)
    })
    this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      // console.log('settingsDataSubject', data)
    })
  }

  ngOnDestroy(): void {
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
  }

  onPswChange(Ev: Event): void | boolean {
    const user = <IUser>this.userService.getUser();
    const isPswMatched = bcrypt.compareSync(this.pswUser, user?.psw );
    if (!isPswMatched) {
      this.messageService.add({severity: 'error', summary: 'Неверно введен текущий пароль'});
    } else {
      if (this.newPsw !== this.rptNewPsw) {
        this.messageService.add({severity: 'error', summary: 'Новые пароли не совпадают'});
      }  else {

        const salt = bcrypt.genSaltSync(10);
        const hashPsw = bcrypt.hashSync(this.newPsw, salt);
        user.psw = hashPsw;
        this.userService.setUser(user);
        const userString = JSON.stringify(user);
        window.localStorage.setItem(user.login, userString);

        this.http.put<IUser>('http://localhost:3000/users/' + user.id + '', user)
          .subscribe((data) => {
            this.messageService.add({severity: 'success', summary: 'Новый пароль установлен'});
            this.pswUser = "";
            this.newPsw = "";
            this.rptNewPsw = "";

          }, (err: HttpErrorResponse) => {
            const serverError = <ServerError>err.error;
            this.messageService.add({
              severity: 'warn',
              summary: 'Ошибка при установке пароля. ' + serverError.errorText
            });
          });
      }
    }
  }
}
