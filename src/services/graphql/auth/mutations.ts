import { gql } from "@apollo/client";

export const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!, $password: String!) {
    resetPassword(email: $email, password: $password) {
      email
    }
  }
`;

export const RESEND_ACTIVATION_CODE = gql`
  mutation ResendActivationCode($email: String!) {
    resendActivationCode(email: $email)
  }
`;

export const ACTIVATE_ACCOUNT = gql`
  mutation ActivateAccount($email: String!, $code: Float!) {
    activateAccount(email: $email, code: $code) {
      token
      user {
        userId
        firstName
        lastName
        email
        isOnboarded
        isVoteOnboarded
      }
      message
    }
  }
`;

export const VERIFY_PASSWORD_CHANGE = gql`
  mutation VerifyPasswordResetCode($code: Float!, $email: String!) {
    verifyPasswordResetCode(code: $code, email: $email) {
      message
      token
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput)
  }
`;

export const LOG_IN_USER = gql`
  mutation Login($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput) {
      token
      user {
        userId
        firstName
        lastName
        email
        isOnboarded
        isVoteOnboarded
      }
      message
    }
  }
`;

export const PROVIDER_LOGIN = gql`
  mutation LoginWithProvider($authProviderInput: AuthProviderInput!) {
    loginWithProvider(authProviderInput: $authProviderInput) {
      token
      user {
        userId
        firstName
        lastName
        email
        isOnboarded
        isVoteOnboarded
      }
      message
    }
  }
`;

export const VALIDATE_APPLE_CREDENTIALS = gql`
  mutation ValidateAppleCredentials($credentials: AppleAuthCredentialsInput!) {
    validateAppleCredentials(credentials: $credentials) {
      token
      user {
        userId
        firstName
        lastName
        email
        isOnboarded
        isVoteOnboarded
      }
    }
  }
`;
