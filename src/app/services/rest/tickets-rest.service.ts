import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpContext, HttpHeaders, HttpParams} from "@angular/common/http";
import {INearestTour, ITour, ITourLocation} from "../../models/tours";
import {IOrder} from "../../models/order";


@Injectable({
  providedIn: 'root'
})
export class TicketsRestService {

  constructor(private http: HttpClient) {
  }

  getTickets(): Observable<ITour[]> {
    return this.http.get<ITour[]>('http://localhost:3000/tours/');
  }

  getRestError(): Observable<any> {
    return this.http.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }

  getNearestTours(): Observable<ITour[]> {
    return this.http.get<ITour[]>('http://localhost:3000/tours/');
  }

  getLocationList(): Observable<ITourLocation[]> {
    return this.http.get<ITourLocation[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/')
  }

  getRandomNearestEvent(name: string): Observable<ITour[]> {
    return this.http.get<ITour[]>('http://localhost:3000/tour-item/' + name);
  }

  sendTourData(data: IOrder): Observable<any> {
    return this.http.post('http://localhost:3000/order/', data);
  }

  getTicketById(id: string): Observable<ITour> {
    return this.http.get<ITour>('http://localhost:3000/tours/' + id);
  }

  createTour(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/tour-item', body, {headers: {}});
  }


  deleteTourById(id: string): Observable<ITour> {
    return this.http.delete<ITour>('http://localhost:3000/tours/' + id);
  }
}



