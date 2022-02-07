import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';
import { User } from '../../utils/interfaces/ login.interfaces';
import { RouteConfigs } from '../../utils/interfaces/route.interfaces';
import { ROUTE_CONFIGS } from '../../utils/constants/route.consts';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  public form!: FormGroup;
  public routeConfig: RouteConfigs = ROUTE_CONFIGS;

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
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
  }

  public submit(): void {
    if (this.form.invalid) return

    const user: User = {
      email:this.form?.value?.email,
      password:this.form?.value?.password
    }

    this.auth.logIn(user).subscribe(() => {
      this.form.reset();
      this.router.navigate([this.routeConfig.adminPage.fullpath, this.routeConfig.adminDashboard.path])
    })
  }
}
