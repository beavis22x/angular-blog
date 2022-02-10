import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import { AuthService } from '../shared/Services/auth.service';
import { User } from '../../utils/interfaces/admin-panel.interfaces';
import { RouteConfigs } from '../../utils/interfaces/route.interfaces';
import { ROUTE_CONFIGS } from '../../utils/constants/route.consts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public routeConfig: RouteConfigs = ROUTE_CONFIGS;
  public submitted!: boolean;
  public message!: string;
  public subscriptions: Subscription = new Subscription();

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    const validationSub$ = this.route.queryParams.subscribe((params: Params) => {
      if(params['loginAgain']) {
        this.message = 'Залогиньтесь, пожайлуста';
      } else if(params['authFailed']) {
        this.message = 'Введите данные заново';
      }
    })
    this.form = new FormGroup({
      email: new FormControl (null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6
        )])
    })
    this.subscriptions.add(validationSub$);
  }

  public submit(): void {
    if (this.form?.invalid) { return }

    const user: User = {
      email:this.form?.value?.email,
      password:this.form?.value?.password,
    }

    this.submitted = true;
    const validationSubmitSub$ = this.auth.logIn(user).subscribe(() => {
      this.form.reset();
      this.router.navigate([this.routeConfig.adminPage.fullpath, this.routeConfig.adminDashboard.path]);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    })
    this.subscriptions.add(validationSubmitSub$);
  }

  ngOnDestroy() {
    this.subscriptions?.unsubscribe();
  }
}
