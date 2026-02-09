import { useMutation } from '@tanstack/react-query';
import { logMeIn, type TokenResponse } from '../services/publicEndpoints';

export function useLogin() {
  return useMutation<TokenResponse, Error, { username: string; password: string }>({
    mutationFn: ({ username, password }) =>
      logMeIn(username, password),

    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
    },
  });
}
