import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { RouteConfigs } from '../../../../utils/interfaces/route.interfaces';

import { ROUTE_CONFIGS } from '../../../../utils/constants/route.consts';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent {

  public routeConfig:RouteConfigs = ROUTE_CONFIGS;

  constructor(private router: Router) {
  }

  public logout(event: Event): void {
    event.preventDefault();
    this.router.navigate([
      this.routeConfig.adminPage.fullpath,
      this.routeConfig.adminLogin.path
    ]);
  }
}
