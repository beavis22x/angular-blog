import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { adminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { AlertComponent } from './shared/components/alert/alert.component';

import { AuthGuardService } from './shared/Services/auth.guard.service';
import { AlertService } from './shared/Services/alert.service';

import { SearchPipe } from './shared/search.pipe';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    CreatePageComponent,
    EditPageComponent,
    DashboardPageComponent,
    SearchPipe,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    adminRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuardService, AlertService]
})
export class AdminModule {
}
