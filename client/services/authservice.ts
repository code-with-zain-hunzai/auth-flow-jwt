import { api } from "@/api/api";
import { SignInPayload, SignUpPayload, AuthResponse } from "@/types/authType";

export const signIn = async (data: SignInPayload): Promise<AuthResponse> => {
  const res = await api.post("/signin", data);
  const { token, user, message } = res.data as AuthResponse & {
    token?: string;
  };

  if (token) {
    localStorage.setItem("token", token);
  }

  return { user, message };
};

export const signUp = async (data: SignUpPayload): Promise<AuthResponse> => {
  const res = await api.post("/signup", data);
  return res.data as AuthResponse;
};

export const signOut = async (): Promise<AuthResponse> => {
  await api.post("/logout");
  localStorage.removeItem("token");
  return { message: "Logged out successfully" };
};
