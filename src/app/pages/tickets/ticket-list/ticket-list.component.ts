import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {TicketsService} from "../../../services/tickets/tickets.service";
import {ITour} from "../../../models/tours";
import {Router} from "@angular/router";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";
import {debounceTime, fromEvent, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IFilter} from "../../../models/filter";
import {UserService} from "../../../services/user/user.service";
import {IUser} from "../../../models/users";
import {AsideService} from "../../../services/aside/aside.service";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, AfterViewInit, OnDestroy {
  tickets: ITour[];
  loadCountBlock = false;
  tourUnsubscriber: Subscription;
  ticketsCopy: ITour[];
  user: IUser | null;
  _hasView: boolean = false;
  displayDeleteTour: boolean = false;
  tourId: string | any;
  tourName: string | any;
  tourDate: string | any;


  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;


  searchTicketSub: Subscription;
  ticketSearchValue: string;

  constructor(private ticketService: TicketsService,
              private router: Router,
              private userService: UserService,
              private http: HttpClient,
              private asideService: AsideService) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    if (this.user?.login === 'Admin') {
      this._hasView = true;
    }
  this.initTickets();
  }
  initTickets():void{
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketsCopy = [...this.tickets];
        this.asideService.changeViewAside(true);
      })
  }

  goToTicketInfoPage(item: ITour) {
    this.router.navigate(['/tickets/ticket'], {queryParams: {id: item._id}})
  }

  directiveRenderComplete(ev: boolean) {
    this.blockDirective.initStyle(0);
    this.loadCountBlock = true;
  }

  ngAfterViewInit() {
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, "keyup");
    this.searchTicketSub = fromEventObserver.pipe(
      debounceTime(200)).subscribe((ev: any) => {
        this.ticketService.filter.find = ev.target.value;
        this.ticketService.updateTour(this.ticketService.filter)
      }
    );

    this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data: IFilter | any) => {
      console.log('filter', data)
      let ticketsArr = this.ticketsCopy;
if(data.type){
  switch (data.type.value) {
    case "single":
      ticketsArr = this.ticketsCopy.filter((el) => el.type === "single");
      break;
    case "multi":
      ticketsArr = this.ticketsCopy.filter((el) => el.type === "multi");
      break;
    case "all":
      ticketsArr = [...this.ticketsCopy];
      break;
  }
}

      if (data.date) {
        const dateWithoutTime = new Date(data.date).getTime()
        ticketsArr = ticketsArr.filter((el) => {
          const elDate = new Date(el.date).getTime();
          // console.log('date', el.date)
          return elDate === dateWithoutTime;
        });
      }
      if (data.priceMin) {
        ticketsArr.sort((prev, next) => prev.price - next.price);
      }
      if (data.priceMax) {
        ticketsArr.sort((prev, next) => next.price - prev.price);
      }

      if (data.find) {
        ticketsArr = ticketsArr.filter((el) => el.name.toLowerCase().includes(data.find.toLowerCase()));
        data.reset=false;
      }
      if (data.reset===true) {
        this.ticketSearchValue = "";
        data.reset=false;
      }
      if (!data) {
        ticketsArr = [];
      }
      this.tickets = ticketsArr;
      setTimeout(() => {
        this.blockDirective.updateItems();
        this.blockDirective.initStyle(0);

      });
    });

  }

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe();
    this.asideService.changeViewAside(false);
  }

  showDeleteTourDialog(ev: any) {
    this.tourId = ev._id;
    this.tourName = ev.name;
    this.tourDate = ev.date;
    this.displayDeleteTour = true;
  }

  deleteTourById() {
    this.ticketService.deleteTourById(this.tourId).subscribe((data) => {
        this.initTickets();
        this.displayDeleteTour = false;
        this.ticketSearchValue = "";
    })
  }
}

