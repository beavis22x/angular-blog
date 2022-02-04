import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from "./shared/components/admin-layout/admin-layout.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { CreatePageComponent } from "./create-page/create-page.component";
import { EditPageComponent } from "./edit-page/edit-page.component";

import { ROUTE_CONFIGS } from "../utils/constants/route.consts";

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: ROUTE_CONFIGS['adminLogin'].fullpath, pathMatch: 'full'},
      {path: ROUTE_CONFIGS['adminLogin'].path, component: LoginPageComponent},
      {path: ROUTE_CONFIGS['adminDashboard'].path, component: DashboardPageComponent},
      {path: ROUTE_CONFIGS['adminCreate'].path, component: CreatePageComponent},
      {path: ROUTE_CONFIGS['adminEdit'].path, component: EditPageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class adminRoutingModule {
}


