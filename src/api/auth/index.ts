import { useMutation } from '@tanstack/react-query';

import { postLogin, postRegister, postVerifyEmail } from './function';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyEmailRequest,
} from './type';

const useLoginMutation = () => {
  const { mutateAsync } = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: postLogin,
  });

  return { mutateAsync };
};

export const useRegisterMutation = () => {
  const { mutate, isPending, isError, error, isSuccess, data, mutateAsync } =
    useMutation<RegisterResponse, Error, RegisterRequest>({
      mutationFn: postRegister,
    });

  return { mutate, isPending, isError, error, isSuccess, data, mutateAsync };
};

export const useVerifyEmailMutation = () => {
  const { mutate, isPending, isError, error, isSuccess, data, mutateAsync } =
    useMutation<LoginResponse, Error, VerifyEmailRequest>({
      mutationFn: postVerifyEmail,
    });

  return { mutate, isPending, isError, error, isSuccess, data, mutateAsync };
};

export default useLoginMutation;
