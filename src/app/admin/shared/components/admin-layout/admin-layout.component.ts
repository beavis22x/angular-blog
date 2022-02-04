import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { ROUTE_CONFIGS } from "../../../../utils/constants/route.consts";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  dashLink: any[] = [
    ROUTE_CONFIGS['adminPage'].fullpath,
    ROUTE_CONFIGS['adminDashboard'].path
  ];

  createLink: any[] = [
    ROUTE_CONFIGS['adminPage'].fullpath,
    ROUTE_CONFIGS['adminCreate'].path
  ];

  loginLink: any[] = [
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
