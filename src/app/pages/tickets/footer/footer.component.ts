import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  displayCompany: boolean = false;
  displayVipCard: boolean = false;
  displayCooperation: boolean = false;

  constructor() {
  }

  ngOnInit(): void {

  }

  showInfoCompany():void{
    this.displayCompany = true;
    this.displayVipCard = false;
    this.displayCooperation = false;
  }

  showInfoVipCard():void{
    this.displayVipCard = true;
    this.displayCompany = false;
    this.displayCooperation = false;
  }
  showInfoCooperation():void{
    this.displayCooperation = true;
    this.displayVipCard = false;
    this.displayCompany = false;
  }
}
