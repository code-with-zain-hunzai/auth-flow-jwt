import { api } from "@/api/api";
import { SignInPayload, SignUpPayload } from "@/types/authType";

export const signIn = async (data: SignInPayload) => {
  const res = await api.post("/signin", data);
  const { token, user } = res.data as { token: string; user: string };

  localStorage.setItem("token", token);

  return { user, token };
};

export const signUp = async (data: SignUpPayload) => {
  const res = await api.post("signup", data);
  return res.data;
};

export const signOut = async () => {
  await api.post("/logout");

  localStorage.removeItem("token");
};
