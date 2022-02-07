import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';

import { ROUTE_CONFIGS } from '../utils/constants/route.consts';
import {AuthGuardService} from "./shared/auth.guard.service";

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: ROUTE_CONFIGS.adminLogin.fullpath, pathMatch: 'full'},
      {path: ROUTE_CONFIGS.adminLogin.path, component: LoginPageComponent},
      {path: ROUTE_CONFIGS.adminDashboard.path, component: DashboardPageComponent, canActivate: [AuthGuardService]},
      {path: ROUTE_CONFIGS.adminCreate.path, component: CreatePageComponent, canActivate: [AuthGuardService]},
      {path: ROUTE_CONFIGS.adminEdit.path, component: EditPageComponent, canActivate: [AuthGuardService]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class adminRoutingModule {
}


