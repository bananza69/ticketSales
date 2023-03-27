import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TicketsService} from "../../../services/tickets/tickets.service";
import {ITourTypeSelect} from "../../../models/tours";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-tour-loader',
  templateUrl: './tour-loader.component.html',
  styleUrls: ['./tour-loader.component.scss']
})
export class TourLoaderComponent implements OnInit {

  constructor(private ticketService: TicketsService,
              private messageService: MessageService) {
  }

  tourForm: FormGroup;
  tourTypes: ITourTypeSelect[] = [
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ];
  selectedTypes: ITourTypeSelect;

  ngOnInit(): void {
    this.tourForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      location: new FormControl('', {validators: Validators.required}),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      tourOperator: new FormControl(),
      price: new FormControl('', {validators: Validators.min(0)}),
      date: new FormControl(),
      img: new FormControl(),
      type: new FormControl('single')
    })
  }


  selectDate(ev: Event): void {
  };

  createTour(): void {
    // считываем все значения из нашей формы
    const tourDataRow = this.tourForm.getRawValue();
    // console.log('this.tourForm.value', this.tourForm.value);
    // console.log('считываем все значения из нашей формы tourDataRow);
    // на сервер мы отправляем разный тип данных(комбинированный) для этого есть спец класс JS FormData
    // prop - ключ tourDataRow - значение элемента формы
    // далее перебираем на каждой итерации наш объект (считываем что там заполнено) и записываем его в formParams
    let formParams = new FormData();
    if (typeof tourDataRow === "object") {
      for (let prop in tourDataRow) {
        formParams.append(prop, tourDataRow[prop]);
      }
    }
    this.ticketService.createTour(formParams).subscribe((data) => {
    });
    this.tourForm.reset();
    this.messageService.add({severity: 'success', summary: 'Тур успешно загружен в базу'});
  }

  selectFile(ev: any): void {
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0];
      // patchValue добавляет,изменяет значения в поля,кот указаны в объекте
      this.tourForm.patchValue({
        img: file
      });
    }
  }


}
