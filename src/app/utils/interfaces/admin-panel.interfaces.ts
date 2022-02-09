export interface User {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface Post {
  title: string
  text: string
  author: string
  date: Date
  id?: string
}

export interface FbAuthResponse {
  idToken: string,
  expiresIn: string
}

export interface FbCreateResponse {
  name: string
}

export interface FormConfig {
  name: string,
  nameField?: string,
}

export interface FormConfigs {
  [key: string]: FormConfig;
}
