import type { ApiResponse } from '../api.types';
import http from '../http';

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyEmailRequest,
} from './type';

export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await http.post<ApiResponse<LoginResponse>>(
    '/dapp/auth/login',
    data
  );
  return res.data.data;
};

export const postRegister = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const res = await http.post<ApiResponse<RegisterResponse>>(
    '/dapp/auth/create-account',
    data
  );
  return res.data.data;
};

export const postVerifyEmail = async (
  data: VerifyEmailRequest
): Promise<LoginResponse> => {
  const res = await http.post<ApiResponse<LoginResponse>>(
    '/auth/register/verify-email',
    data
  );
  return res.data.data;
};
