import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AsideService {


  constructor() { }

  public viewAside$ = new Subject<boolean>();

  public changeViewAside(viewAside: boolean) {
    this.viewAside$.next(viewAside);
  }

}
