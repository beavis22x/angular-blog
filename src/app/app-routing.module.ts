import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';

import { ROUTE_CONFIGS } from './utils/constants/route.consts';

const routes: Routes = [
  {
    path: ROUTE_CONFIGS.home.path, component: MainLayoutComponent, children: [
      {path: ROUTE_CONFIGS.home.path, redirectTo: '/', pathMatch: 'full'},
      {path: ROUTE_CONFIGS.home.path, component: HomePageComponent},
      {path: ROUTE_CONFIGS.postPage.path, component: PostPageComponent},
    ]
  },
  {
    path: ROUTE_CONFIGS.adminPage.path,
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}




