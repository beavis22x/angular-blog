import {RouteConfig, RouteConfigs} from '../interfaces/route.interfaces';

const home: RouteConfig = {
  name: 'home',
  path: '',
  fullpath: '/'
}

const postPage: RouteConfig = {
  name: 'post-page',
  path: 'post/:id'
}

const homePost: RouteConfig = {
  name: 'home-post',
  path: '/post'
}

const adminPage: RouteConfig = {
  name: 'admin-page',
  path: 'admin',
  fullpath: '/admin'
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
  path: 'post/:id/edit',
  fullpath: '/admin/post/:id/edit'
}

const plainAdminPost: RouteConfig = {
  name: 'plain-admin-post',
  path: 'post',
}

const plainAdminEdit: RouteConfig = {
  name: 'plain-admin-edit',
  path: 'edit',
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
  plainAdminPost,
  plainAdminEdit,
  homePost,
}
