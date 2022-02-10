import { FormConfig, FormConfigs } from '../interfaces/admin-panel.interfaces';

const title: FormConfig = {
  name: 'title'
}

const author: FormConfig = {
  name: 'author'
}

const email: FormConfig = {
  name: 'email'
}

const password: FormConfig = {
  name: 'password'
}

export const FIELD_FORM_CONSTS: FormConfigs = {
  author,
  title,
  email,
  password
}
