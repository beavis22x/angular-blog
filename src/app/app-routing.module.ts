import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {PostPageComponent} from "./post-page/post-page.component";
// import {ROUTE_CONFIGS} from "./utils/constants/route.consts";

const home: RouteConfig = {
  name: "home",
  path: ""
}

const postPage: RouteConfig = {
  name: "post-page",
  path: "post/:id"
}

const ROUTE_CONFIGS: RouteConfigs = {
  home,
  postPage,
}

interface RouteConfig {
  name: string,
  path: string,
  fullpath?: string,
  param?: string,
}

interface RouteConfigs {
  [key: string]: RouteConfig;
}


const routes: Routes = [
  {path: ROUTE_CONFIGS['home'].path, component: MainLayoutComponent, children: [
      {path: ROUTE_CONFIGS['home'].path, redirectTo: '/', pathMatch: 'full'},
      {path: ROUTE_CONFIGS['home'].path, component: HomePageComponent},
      {path: 'post/:id', component: PostPageComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}




