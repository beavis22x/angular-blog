import {RouteConfig, RouteConfigs} from '../interfaces/route.interfaces';

const home: RouteConfig = {
  name: 'home',
  path: ''
}

const postPage: RouteConfig = {
  name: 'post-page',
  path: 'post/:id'
}

const adminPage: RouteConfig = {
  name: 'admin-page',
  path: 'admin'
}

export const ROUTE_CONFIGS: RouteConfigs = {
  home,
  postPage,
  adminPage,
}
