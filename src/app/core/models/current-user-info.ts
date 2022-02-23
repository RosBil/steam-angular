export interface CurrentUserInfo {
  apiKey: string;
  appName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  uid: string;

  displayName?: string;
  userAge?: string;
}
