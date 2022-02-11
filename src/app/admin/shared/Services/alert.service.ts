import {Injectable} from '@angular/core';

import {Subject} from 'rxjs';

import { Alert } from '../../../utils/interfaces/admin-panel.interfaces';

export type AlertType = 'success' | 'warning' | 'danger';

@Injectable()
export class AlertService {
  public alert$ = new Subject<Alert>()

  public success(text: string): void {
    this.alert$.next({type: 'success', text})
  }

  public warning(text: string): void {
    this.alert$.next({type: 'warning', text})
  }

  public danger(text: string): void {
    this.alert$.next({type: 'danger', text})
  }
}
