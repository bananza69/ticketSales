import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, observable, Subject, subscribeOn} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObservableExampleService {

  private myBehaviorSubject = new BehaviorSubject<string>('some data of Behavior subject')
  private mySubject = new Subject<string>();

  private myObservable = new Observable<string>((subscriber => {
    subscriber.next('sync value');
    setTimeout(() => {
      subscriber.next('some value');
    }, 3000)
  }));

  constructor() {
  }

  initObservable(): void {
    const observable = new Observable((subscriber => {
      subscriber.next(4);
      subscriber.next(5);
      setTimeout(() => {
        subscriber.next("asyncData");
        subscriber.error("some error");
      })
    }))
    const sub = observable.subscribe((data) => {
        console.log('observable', data)
      },
      (error => {
        console.log('error', error)
      }))
    sub.unsubscribe()
  }

  getObservable(): Observable<string> {
    return this.myObservable;
  }

  getSubject(): Subject<string> {
    return this.mySubject;
  }

  getBehaviorSubject(): BehaviorSubject<string> {
    return this.myBehaviorSubject;
  }

}


