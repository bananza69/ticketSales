import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ICustomTourLocation, INearestTour, ITour, ITourLocation} from "../../../models/tours";
import {ActivatedRoute, Router} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсketstorage/tiсketstorage.service";
import {IUser} from "../../../models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {TicketsService} from "../../../services/tickets/tickets.service";
import {debounceTime, forkJoin, fromEvent, Observable, single, Subscription} from "rxjs";
import {IOrder} from "../../../models/order";
import {MessageService} from "primeng/api";
import {TicketsRestService} from "../../../services/rest/tickets-rest.service";


@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit, OnDestroy {
  ticket: ITour | undefined;
  ticketsCopy: ITour[];
  user: IUser | any;
  userForm: FormGroup;
  ticketSearchValue: string;
  // nearestTours: ITour[];
  // tourLocation: ITourLocation[];
  tickets: ITour[];
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  orderType: string = 'newOrder';

  constructor(private route: ActivatedRoute,
              private ticketStorage: TicketsStorageService,
              private userService: UserService,
              private ticketService: TicketsService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit(): void {

    const userId = <string>this.userService.getUser()?.id;

    this.route.queryParams.subscribe((par) => {
      const parId = par['id'];
      this.ticketService.getTicketById(parId).subscribe((data) => {
        this.ticket = data;
      })
    });

    this.userService.getUserById(userId).subscribe((data) => {
      this.user = data;
      this.userForm.controls["eMail"].setValue(this.user.email)
    });

    this.userForm = new FormGroup({
      firstName: new FormControl("", {validators: [Validators.required]}),
      lastName: new FormControl("", [Validators.required, Validators.minLength(1)]),
      phone: new FormControl("8", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      eMail: new FormControl(this.user?.email,{validators:[Validators.required, Validators.email]}),
      birthDay: new FormControl("", {validators: [Validators.required]}),
      citizen: new FormControl("", {validators: [Validators.required]})
    });

    // params
    const routeIdParam = this.route.snapshot.paramMap.get('id'); //for route
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');
    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId) {
      this.ticketService.getTicketById(paramValueId).subscribe((data) => {
        this.ticket = data;
      })
    }

    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketsCopy = [...this.tickets];
      })

  }

  ngAfterViewInit(): void {
    this.userForm.controls["eMail"].setValue(this.user?.email);

    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, "keyup");
    this.searchTicketSub = fromEventObserver.pipe(
      debounceTime(200)).subscribe((ev: any) => {
        if (this.ticketSearchValue) {
          this.tickets = this.ticketsCopy.filter((el) =>
            el.name.toLowerCase().includes(this.ticketSearchValue.toLowerCase()));
        } else {
          this.tickets = [...this.ticketsCopy];
        }
      }
    );
  }

  onSubmit(): void {
  };

  selectDate(ev: Event): void {
  };

  ngOnDestroy(): void {
    this.searchTicketSub.unsubscribe();
  }


  initTour(): void {
    // данные формы бронирования
    const userData = this.userForm.getRawValue();
    // объект данных о туре и брони
    const postData = {...this.ticket, ...userData };
    // поле для присвоения типа заказа 'newOrder'
    const orderType = this.orderType;
    // получение идентификатора пользователя
    const userId = this.userService.getUser()?.id || null;
    // формирование объекта заказа для отправки на сервер
    const postObj: IOrder = {
      nameTicket: postData.name,
      price: postData.price,
      date: postData.date,
      location: postData.location,
      firstName: postData.firstName,
      lastName: postData.lastName,
      phone: postData.phone,
      eMail: postData.eMail,
      birthDay: postData.birthDay,
      citizen: postData.citizen,
      tourId: postData._id,
      userId: userId,
      orderType: orderType,
    }
    // вызов сервиса для отправки заказа на сервер
    this.ticketService.sendTourData(postObj).subscribe()
    this.userForm.valueChanges.subscribe((v) => {
    })
    // уведомление пользователя об успешном бронировании
    this.messageService.add({
      severity: 'success',
      summary: 'Тур забронирован! Вы можете найти его в разделе меню "Заказы"'
    });
    // перезагрузка и очистка формы
    this.userForm.reset();
  }

  goToTicketInfoPage(tour: ITour) {
    this.router.navigate(['/tickets/ticket'], {
        queryParams: {id: tour._id},
        relativeTo: this.route
      }
    );
  }
  focus():void{
    const element = document.getElementById("focus") as HTMLElement;
    element.scrollIntoView({ behavior: "smooth", block: "end" });
  }

}




