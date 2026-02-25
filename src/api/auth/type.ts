export interface LoginResponse {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    dialCode: string;
    oxAddress: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface LoginRequest {
  oxAddress: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  phone: string;
  dialCode: string;
  email: string;
  oxAddress: string;
}

export interface RegisterResponse {
  message: string;
  email: string;
}

export interface VerifyEmailRequest {
  email: string;
  token: string;
}
