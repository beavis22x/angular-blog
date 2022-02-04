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

const adminHome: RouteConfig = {
  name: 'admin-home',
  path: '',
  fullpath: 'admin'
}

const adminLogin: RouteConfig = {
  name: 'admin-login',
  path: 'login',
  fullpath: '/admin/login'
}

const adminDashboard: RouteConfig = {
  name: 'admin-dashboard',
  path: 'dashboard'
}

const adminCreate: RouteConfig = {
  name: 'admin-create',
  path: 'create'
}

const adminEdit: RouteConfig = {
  name: 'admin-edit',
  path: 'post/:id/edit'
}

export const ROUTE_CONFIGS: RouteConfigs = {
  home,
  postPage,
  adminPage,
  adminHome,
  adminLogin,
  adminDashboard,
  adminCreate,
  adminEdit,
}
