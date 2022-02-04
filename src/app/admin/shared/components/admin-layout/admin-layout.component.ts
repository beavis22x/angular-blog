import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { ROUTE_CONFIGS } from "../../../../utils/constants/route.consts";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  public dashLink: (string | undefined) [] = [
    ROUTE_CONFIGS['adminPage'].fullpath,
    ROUTE_CONFIGS['adminDashboard'].path
  ];

  public createLink: (string | undefined) [] = [
    ROUTE_CONFIGS['adminPage'].fullpath,
    ROUTE_CONFIGS['adminCreate'].path
  ];

  public loginLink: (string | undefined) [] = [
    ROUTE_CONFIGS['adminPage'].fullpath,
    ROUTE_CONFIGS['adminLogin'].path
  ];

  constructor(private router: Router) {
  }

  logout(event: Event) {
    event.preventDefault();
    this.router.navigate(this.loginLink);
  }
}
