import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IStatisticUser} from "../../../models/users";
import {Observable} from "rxjs";
import {IOrder} from "../../../models/order";

@Injectable({
  providedIn: 'root'
})
export class StatisticRestService {

  constructor(private http: HttpClient) {
  }

  getOrderStatistic(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('http://localhost:3000/order/')
  }


}

