import {Component} from '@angular/core';
import {ObservableExampleService} from "./services/testing/observable-example.service";
import {ConfigService} from "./services/config/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'РосТур';
  prop: string;

  constructor(private testing: ObservableExampleService,
              private config: ConfigService) {

  }

  // testing.initObservable()

  ngOnInit() {
    this.config.configLoad()


    //   // в Observable здесь мы подписываемся,а отправку данных делаем непосредственно из конструктора обсерв.
    //    const  myObservable = this.testing.getObservable();
    //   myObservable.subscribe((data)=>{
    //     console.log("1 myObservable", data)
    //   });
    //   myObservable.subscribe((data)=>{
    //     console.log("2 myObservable")
    //   });
    //
    //   const mySubject = this.testing.getSubject();
    //   // сначала нужно подписаться
    //   mySubject.subscribe( (data)=>{
    //     console.log('first subject', data)
    //   });
    //   mySubject.subscribe( (data)=>{
    //     console.log('second subject', data)
    //   });
    //   // а затем отправить данные
    //   mySubject.next( 'get value');
    //   mySubject.next( 'get subject value');
    //
    //
    //   const myBehavior = this.testing.getBehaviorSubject();
    //   myBehavior.subscribe( (data)=> {
    //     console.log('first behavior subject', data)
    //   });
    //   // мы подписываемся и сразу получаем данные,которые определены в конструкторе
    //   myBehavior.next('new data_1 from BehaviorSubject');
    //   myBehavior.next('new data_2 from BehaviorSubject');
  }
}
