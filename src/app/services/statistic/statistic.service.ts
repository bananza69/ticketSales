import {Injectable} from '@angular/core';
import {StatisticRestService} from "../rest/statistic-rest/statistic-rest.service";
import {map, Observable} from "rxjs";
import {ICustomStatisticUser} from "../../models/users";
import {ITicketStatistic} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private statisticUserRest: StatisticRestService) {
  }

//   getTicketStatistic(): Observable<ITicketStatistic[]>{
//     this.ticketsRestService.getTickets().subscribe((data)=>{
//       this.tickets=data;
//       console.log( data, "tickets");
//       // здесь мне нужно id тура
//       // далее я его ищу в массиве order и делаю счетчик в который +1 каждый раз при нахождении соответтсвия
//       // новый массив это цифры
//     });
//   }
//
//   getUserStatistic(): Observable<ICustomStatisticUser[]> {
//
//     return this.statisticUserRest.getUserStatistic().pipe(
//
//       map((data) => {
//
//         const newDataArr: ICustomStatisticUser[] = [];
//
//         data.forEach((el) => {
//           const newDataObj: ICustomStatisticUser = {
//             id: el.id,
//             name: el.name,
//             city: el.address.city,
//             company: el.company.name,
//             phone: el.phone,
//             street: el.address.street
//           };
//           newDataArr.push(newDataObj);
//         })
//
//         return newDataArr;
//       })
//     )
//   }
//
//
}
