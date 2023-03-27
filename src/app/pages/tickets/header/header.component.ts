import {Component, Input, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MenuItem} from "primeng/api";
import {UserService} from "../../../services/user/user.service";
import {IUser} from "../../../models/users";
import {IMenuType} from "../../../models/menuType";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  user: IUser | null;
  private settingsActive = false;

  @Input() menuType: IMenuType;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Туры',
        routerLink: ['tickets-list']
      },
      {
        label: 'Заказы',
        routerLink: ['order']
      },
      {
        label: 'Выход',
        routerLink: ['/auth'],
        command: (click) => {
          this.userService.removeUser();
          window.localStorage.clear();
        }
      },
    ];
    this.user = this.userService.getUser();
  }

  ngOnChanges(ev: SimpleChanges): void {
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();
  }

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Туры',
        routerLink: ['tickets-list']
      },
      {
        label: 'Заказы',
        routerLink: ['order']
      },
      {
        label: 'Личный кабинет ',
        routerLink: ['settings'],
        visible: this.settingsActive
      },
      {
        label: 'Выход',
        routerLink: ['/auth'],
        command: (click) => {
          this.userService.removeUser()
        }
      },
    ];
  }
}

