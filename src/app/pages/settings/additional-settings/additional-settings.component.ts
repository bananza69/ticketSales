import {Component, OnInit} from '@angular/core';
import {IUser} from "../../../models/users";
import {UserService} from "../../../services/user/user.service";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-additional-settings',
  templateUrl: './additional-settings.component.html',
  styleUrls: ['./additional-settings.component.scss']
})
export class AdditionalSettingsComponent implements OnInit {

  user: IUser | any;
  setCardNumber: string;
  setEmail: string;
  userId: string;

  constructor(private userService: UserService,
              private http: HttpClient,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initUser()
  }

  initUser():void{
  const userId = <string>this.userService.getUser()?.id;
  this.userService.getUserById(userId).subscribe((data) => {
    this.user = data;
  });
}
  setAdditionalSettings(Ev: Event): void | boolean {
    const user = <IUser>this.userService.getUser();
    if (this.setCardNumber || this.setEmail) {
      user.cardNumber = this.setCardNumber;
      user.email = this.setEmail;
      this.userService.setUser(user);
      this.http.put<IUser>('http://localhost:3000/users/' + user.id + '', user)
        .subscribe((data) => {
          this.messageService.add({severity: 'success', summary: 'Новые данные записаны'});
          this.initUser();
          this.setCardNumber = '';
          this.setEmail = '';
        });

    } else {
      this.messageService.add({severity: 'warn', summary: 'Данных для записи нет'});
    }
  }
}
