import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {IFilter} from 'src/app/models/filter';
import { ITour} from "../../models/tours";
import {TicketsRestService} from "../rest/tickets-rest.service";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  filter: IFilter = <IFilter>{};
  // слушает события фильтра
  private ticketSubject = new Subject<IFilter>();
  // слушает события изменений списка туров
  private ticketUpdateSubject = new Subject<ITour[]>();
  // доступен только для прочтения данных
  readonly ticketUpdateSubject$ = this.ticketUpdateSubject.asObservable();

  constructor(private ticketsServiceRest: TicketsRestService) {
  }

  getTickets(): Observable<ITour[]> {
    return this.ticketsServiceRest.getTickets();
  }

  readonly ticketType$ = this.ticketSubject.asObservable();

  updateTour(filter: IFilter): void {
    // console.log('filter',filter);
    this.ticketSubject.next(filter);
  }

  getError() {
    return this.ticketsServiceRest.getRestError()
  }

  sendTourData(data: any): Observable<any> {
    return this.ticketsServiceRest.sendTourData(data);
  }

  // updateTicketList(data: ITour[]) {
  //   this.ticketUpdateSubject.next(data);
  // }

  getTicketById(id: string): Observable<ITour> {
    return this.ticketsServiceRest.getTicketById(id);
  }

  createTour(body: any) {
    return this.ticketsServiceRest.createTour(body);
  }

  deleteTourById(id: string): Observable<ITour> {
    return this.ticketsServiceRest.deleteTourById(id);
  }

}
