import {Component, OnInit} from '@angular/core';
import {IOrder, IUserLoginOrders} from 'src/app/models/order';
import {OrderService} from "../../services/order/order.service";
import {UserService} from "../../services/user/user.service";
import {IUser} from "../../models/users";
import {ActivatedRoute, Router} from "@angular/router";
import {TicketsService} from "../../services/tickets/tickets.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  cols = [
    {field: 'index', header: 'N'},
    {field: 'orderType', header: 'Статус'},
    {field: 'nameTicket', header: 'Тур'},
    {field: 'price', header: 'Цена, РУБ'},
    {field: 'date', header: 'Дата начала тура'},
    {field: 'location', header: 'Город'},
    {field: 'firstName', header: 'Имя'},
    {field: 'lastName', header: 'Фамилия'},
    {field: 'phone', header: 'Телефон'},
    {field: 'eMail', header: 'e-mail'},
  ]

  colsAllOrders = [
    {field: 'index', header: 'N'},
    {field: 'orderType', header: 'Статус заказа'},
    {field: 'login', header: 'Логин'},
    {field: 'ticket', header: 'Данные о туре'},
    {field: 'price', header: 'Цена, РУБ'},
    {field: 'name', header: 'Сведения о заказчике'},
    {field: 'phone', header: 'Контакты заказчика'},
  ]

  user: IUser | any;
  orders: IOrder[] | any;
  allOrders: IOrder[] | any;
  userLoginOrders: IUserLoginOrders[] | any;
  allUsers: IUser[] | any;
  infoUser: IUser | any;
  orderType: string = 'newOrder';
  displayDeleteOrder: boolean = false;
  displayOrderApproved: boolean = false;
  displayOrderCanceled: boolean = false;
  orderId: string | any;
  orderName: string | any;
  orderDate: string | any;
  orderlogin: string | any;
  ordersApproved: any;


    constructor(private orderService: OrderService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private ticketService: TicketsService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.initOrders();
  }

  initOrders(): void {
    const userId = <string>this.userService.getUser()?.id;  // получаю id пользователя
    this.userService.getUserById(userId).subscribe((data) => {
      this.user = data;
      // Если в приложение зашел администратор,то запускается логика:
      if (this.user?.login === 'Admin') {
        this.orderService.getOrderAll().subscribe((data) => {
          this.allOrders = data;// получаю все заказы для админа
          // console.log(data, 'все заказы allOrders')
          this.getLoginForOrders();
        });
      } // Если в приложение зашел обычный пользователь,то запускается логика:
      if (this.user?.login !== 'Admin') {
        this.loadUserOrders(userId);
      }
    });
  }


  loadUserOrders(id: string) {

    this.orderService.getOrders(id).subscribe((data) => {
      this.orders = data;// получаю все заказы пользователя
      // console.log(data, 'заказы пользователя')
      for (let i = 0; i < this.orders.length; i++) {
        this.ordersApproved = this.orders.filter((el: any) => el.orderType === 'approvedOrder').length;
      }
      // console.log(this.ordersApproved, 'this.ordersApproved')
    return this.ordersApproved ;
    });
  }


  getLoginForOrders() {
    const orderArr = <any>[];
    this.userService.getUserAll().subscribe((data) => {
      this.allUsers = data;
      // console.log(data, 'все юзеры')
      let userMap = new Map();
      this.allUsers.forEach((user: any) => {
        userMap.set(user._id, user.login);
      });
      for (let i = 0; i < this.allOrders.length; i++) {
        let login = userMap.get(this.allOrders[i].userId);
        // console.log(login, 'login')
        orderArr.push({...this.allOrders[i], login});
      }
      // console.log(this.userLoginOrders, 'userLoginOrders')
      this.userLoginOrders = orderArr;
      // console.log(this.userLoginOrders)
    })
  }


showChangeOrderType(ev: any , orderType: 'canceledOrder' | 'approvedOrder'){
  this.orderId = ev._id ;
  this.orderName = ev.nameTicket;
  this.orderDate = ev.date;
  this.orderlogin = ev.login ;
  if (orderType==='canceledOrder'){
    this. displayOrderCanceled = true;
    this. displayOrderApproved = false;
  }
  if (orderType==='approvedOrder'){
    this. displayOrderCanceled = false;
    this. displayOrderApproved = true;
  }
}



  showDeleteOrderDialog(ev: any){
    this.orderId = ev._id ;
    this.orderName = ev.nameTicket;
    this.orderDate = ev.date;
    this.displayDeleteOrder = true;
  }


  deleteOrder() {
    this.displayDeleteOrder = false;
    // console.log('this.orderId', this.orderId);
    this.orderService.deleteOrderById(this.orderId).subscribe((data) => {
      // console.log('data', data);
      this.initOrders();
    });
  }


  goToTicketInfoPage(ev: any) {
    // console.log('клик', ev.tourId);
    this.router.navigate(['/tickets/ticket'], {queryParams: {id: ev.tourId}, relativeTo: this.route}
    );
  }


  changeOrderType(ev: string, orderType: 'canceledOrder' | 'approvedOrder') {
    for (let i = 0; i < this.allOrders.length; i++) {
      if (this.allOrders[i]._id === ev) {
        this.orderService.setOrder(this.allOrders[i]);
        const order = <IOrder>this.orderService.getOrder();
        order.orderType = orderType;
        this.orderService.updateOrderById(ev, order);
        break;
      }
    }
    this.displayOrderApproved = false;
    this.displayOrderCanceled = false;
    this.initOrders();
  }

}
