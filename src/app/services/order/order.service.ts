import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IOrder} from "../../models/order";


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private order: IOrder | null;
  constructor(private http: HttpClient) {
  }

  getOrder(): IOrder | null {
    return this.order;
  };

  setOrder(order: IOrder): void {
    this.order = order;
  };

  getOrders(userId: string) {
    return this.http.get("http://localhost:3000/order/" + userId)
  }
  getOrderAll() {
    return this.http.get("http://localhost:3000/order/")
  }

  deleteOrderById(_id: string){
    return this.http.delete("http://localhost:3000/order/" + _id)
  }
  updateOrderById(_id: string , order: IOrder) {
  this.http.put<IOrder>('http://localhost:3000/order/' + _id + '', order).
  subscribe((data) => {

  })
  }


}

