import {Component, OnInit} from '@angular/core';
import {ITour} from "../../models/tours";
import {TicketsRestService} from "../../services/rest/tickets-rest.service";
import {IMenuType} from "../../models/menuType";


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  tickets: ITour[];
  selectedType: IMenuType;

  updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }

  constructor(private ticketsRestService: TicketsRestService) {
  }

  ngOnInit(): void {
    this.ticketsRestService.getTickets().subscribe((data) => {
      this.tickets = data;
    });
  }
}
