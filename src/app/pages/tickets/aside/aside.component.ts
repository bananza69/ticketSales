import {Component,  EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {IMenuType} from "../../../models/menuType";
import {ITour, ITourTypeSelect} from "../../../models/tours";
import {TicketsService} from "../../../services/tickets/tickets.service";
import {MessageService} from "primeng/api";
import {SettingsService} from "../../../services/settings/settings.service";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../services/user/user.service";
import {IUser} from "../../../models/users";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";
import {AsideService} from 'src/app/services/aside/aside.service';
import { Subscription} from "rxjs";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})


export class AsideComponent implements OnInit, OnDestroy {

  user: IUser | null;
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType;
  time: Date;
  _hasView: boolean = false;
  tickets: ITour[];
  blockDirective: BlocksStyleDirective;
  viewAside: boolean;
  dateValue: string;
  typeTour:{label:string, value: string};

  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]
  private timeInterval: number;
  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter();
  private viewAsideSub: Subscription;

  constructor(private ticketService: TicketsService,
              private messageService: MessageService,
              private settingsService: SettingsService,
              private http: HttpClient,
              private userService: UserService,
              private asideService: AsideService) {
  }

  ngOnInit(): void {
    // блок, определяющий правило отображения настроек для администратора
    this.user = this.userService.getUser();
    if (this.user?.login === 'Admin') {
      this._hasView = true;
    }

    this.viewAsideSub = this.asideService.viewAside$.subscribe((data) => {
        this.viewAside = data;
        if (data===false){
          this.resetFilter();
          this.ticketService.updateTour(this.ticketService.filter)
        }
      }
    );

    this.ticketService.ticketUpdateSubject$.subscribe((data) => {
      this.tickets = data;
    });

    this.menuTypes = [
      {type: 'custom', label: 'Обычное'},
      {type: 'extended', label: 'Расширенное'}
    ]

    this.timeInterval = window.setInterval(() => {
      this.time = new Date();
    }, 1000)


  }

  changeType(ev: { ev: Event, value: IMenuType }): void {
    this.updateMenuType.emit(ev.value);
  }

  changeTourFilter(filterType: string, event?: any): void {
    if (filterType === 'type') {
      this.ticketService.filter.type = event.value as ITourTypeSelect;
    }
    if (filterType === 'date') {
      this.ticketService.filter.date = event as string;
    }
    if (filterType === 'priceMin') {
      this.ticketService.filter.priceMin = true;
      this.ticketService.filter.priceMax = false;

    }
    if (filterType === 'priceMax') {
      this.ticketService.filter.priceMax = true;
      this.ticketService.filter.priceMin = false;

    }
    if (filterType === 'find') {
      this.ticketService.filter.find = event.target.value;

    }
    if (filterType === 'reset') {
      this.resetFilter()
    }
    this.ticketService.updateTour(this.ticketService.filter)
  }

  resetFilter(): void {
    this.ticketService.filter = {
      type: {label: 'Все', value: 'all'},
      date: '',
      priceMin: false,
      priceMax: false,
      find: '',
      reset: true
    };
    this.typeTour = {label: 'Все', value: 'all'};
    this.dateValue = '';
  }

  initSettingsData(): void {
    this.settingsService.loadUserSettingsSubject(
      {saveToken: false}
    )
  };

  // deleteTours():void {
  //   this.http.delete("http://localhost:3000/tours/").subscribe((data)=>{
  //     this.ticketService.updateTicketList([]);
  //   });
  // }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      window.clearInterval(this.timeInterval);
    }
    this.viewAsideSub.unsubscribe();
     }
}
