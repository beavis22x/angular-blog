import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { AlertService } from '../../Services/alert.service';

import { Alert } from '../../../../utils/interfaces/admin-panel.interfaces';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 3000;

  public text!: string;
  public type = 'success';
  public alertSubs: Subscription = new Subscription();

  constructor(
    private alertService: AlertService,
    private cd: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.initAlert();
  }

  public initAlert(): void {
    this.alertSubs.add(this.alertService.alert$.subscribe((alert: Alert) => {
      this.text = alert.text;
      this.type = alert.type;

      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        this.text = ''

        this.cd.markForCheck();
      }, this.delay)

      this.cd.markForCheck();
    }))
  }

  public ngOnDestroy(): void {
    this.alertSubs.unsubscribe()
  }
}
