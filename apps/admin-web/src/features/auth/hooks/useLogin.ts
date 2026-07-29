import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      authApi.login(payload.email, payload.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
