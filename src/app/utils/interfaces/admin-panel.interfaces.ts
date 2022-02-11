import { AlertType } from '../../admin/shared/Services/alert.service';

export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface Post {
  title: string;
  text: string;
  author: string;
  date: Date;
  id?: string;
}

export interface FbAuthResponse {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
}

export interface FbCreateResponse {
  name: string;
}

export interface FormConfig {
  name: string;
  nameField?: string;
}

export interface FormConfigs {
  [key: string]: FormConfig;
}

export interface AlertMessages {
  [key: string]: string;
}

export interface Alert {
  type: AlertType;
  text: string;
}
