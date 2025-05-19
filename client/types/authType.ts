export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user?: {
    id: string;
    email: string;
    isAdmin?: boolean;
  };
  token?: string;
  message?: string;
}