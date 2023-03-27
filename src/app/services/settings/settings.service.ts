import {Injectable} from '@angular/core';
import {ISettings} from "../../models/settings";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingSubject: Subject<ISettings> = new Subject<ISettings>();

  constructor() {
  }

  loadUserSettings(): Observable<ISettings> {
    const settingObservable = new Observable<ISettings>((subscriber) => {
      const settingsData: ISettings = {
        saveToken: true
      };
      subscriber.next(settingsData);
    });
    return settingObservable
  }

  //subject
  loadUserSettingsSubject(data: ISettings): any {
    this.settingSubject.next(data)
  }

  getSettingsSubjectObservable(): Observable<ISettings> {
    return this.settingSubject.asObservable();
  }

}
