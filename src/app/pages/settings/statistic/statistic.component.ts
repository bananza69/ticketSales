import {Component, OnInit} from '@angular/core';
import {StatisticService} from "../../../services/statistic/statistic.service";
import {TicketsRestService} from "../../../services/rest/tickets-rest.service";
import {IStatisticTourLocation, ITour, ITourOrder} from "../../../models/tours";
import {OrderService} from "../../../services/order/order.service";
import {IOrder} from "../../../models/order";


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  cols = [
    {field: 'name', header: 'Тур'},
    {field: 'price', header: 'Цена'},
    {field: 'location', header: 'Город'},
    {field: 'date', header: 'Дата'},
    {field: 'countBooking', header: 'Количество брони'},
    {field: 'total', header: 'Общая сумма брони'}
  ]

  tickets: ITour[];
  orders: IOrder[] | any;
  ticketId: string;
  ticketOrder: ITourOrder[] | any;
  basicData: any;
  basicOptions: any;
  locationStats:  { [key: string]: number } | any;

  constructor(
    private statisticService: StatisticService,
    private ticketsRestService: TicketsRestService,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.orderService.getOrderAll().subscribe((data) => {
      this.orders = data;

    this.ticketsRestService.getTickets().subscribe((data) => {
      this.tickets = data;
      this.combineTicketsAndOrders();

      const locationStats = this.getStatisticLocation();
      this.setBasicData(locationStats)
    });
    });
  }

  combineTicketsAndOrders(): void {
    this.ticketOrder = [];
    for (let i = 0; i < this.tickets.length; i++) {
      const ticketId = this.tickets[i]._id;
      let countBooking = this.orders.filter((el: any) => el.tourId === ticketId && el.orderType!=='canceledOrder').length;
        this.ticketOrder.push({...this.tickets[i], countBooking});
    }
    return this.ticketOrder;
  }
  // 1. Объявляется функция getStatisticLocation(), которая возвращает значение IStatisticTourLocation[] .
  // 2. Объявляется пустой объект locationStats.
  // 3. Цикл forEach используется для перебора всех билетов.
  // 4. TicketLocation присваивается значение местоположения текущего билета.
  // 5. Условие if используется для проверки того, существует ли уже ticketLocation в объекте locationStats.
  // 6. Если ticketLocation не существует, то ticketLocation добавляется к объекту locationStats со значением 0.
  // 7. Если ticketLocation существует, то значение ticketLocation увеличивается на 1.
  // 8. Возвращается объект locationStats

  getStatisticLocation(): IStatisticTourLocation[] | any {
    let locationStats: any = {};
    this.tickets.forEach((ticket) => {
      const ticketLocation = ticket.location;
      if (!locationStats[ticketLocation]) {
        locationStats[ticketLocation] = 0;
      }
      locationStats[ticketLocation] += 1;
    });
    return locationStats;
  }
  // 1. Функция setBasicData() объявляется с параметром locationStats, который представляет собой массив типа
  // IStatisticTourLocation или любого другого.
  // 2. Объявляется переменная labels, которой присваивается массив ключей параметра locationStats.
  // 3. Свойству basicData класса присваивается объект со свойством labels, которому присваивается переменная labels,
  // и свойству наборов данных, которое присваивается массиву с одним объектом.
  // 4. Объект в массиве наборов данных имеет свойство label, для которого задана строка, свойство backgroundColor,
  // для которого задан шестнадцатеричный код, и свойство data, для которого задана карта переменной labels,
  // для которой задан параметр locationStats.

  setBasicData(locationStats: IStatisticTourLocation[] | any): void {
    const labels: string[] = Object.keys(locationStats);
    this.basicData = {
      labels: labels,
      datasets: [
        {
          label: 'Количество туров',
          backgroundColor: '#42A5F5',
          data: labels.map(l => locationStats[l])
        },
      ]
    };
  }

}

