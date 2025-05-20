export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  message?: string;
}

export interface FormResponse {
  success: boolean;
  message: string;
  data?: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    createdAt: string;
  };
}