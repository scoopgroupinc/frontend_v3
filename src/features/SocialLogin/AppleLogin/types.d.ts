// Top-level interface for the credentials object
export type AppleAuthCredentialsInput = {
  user: string;
  state: string | null;
  fullName: AppleAuthenticationFullName | null;
  email: string | null;
  realUserStatus: number | null;
  identityToken: string | null;
  authorizationCode: string | null;
};

// Nested 'FullName' interface used in the 'Credentials' interface
export type AppleAuthenticationFullName = {
  namePrefix: string | null;
  givenName: string | null;
  middleName: string | null;
  familyName: string | null;
  nameSuffix: string | null;
  nickname: string | null;
};
