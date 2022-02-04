import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adminRoutingModule } from './admin-routing.module';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    CreatePageComponent,
    EditPageComponent,
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    adminRoutingModule,
  ]
})
export class AdminModule {
}

