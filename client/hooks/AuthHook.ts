import { useMutation } from "@tanstack/react-query";
import { signIn, signUp, signOut } from "@/services/authservice";
import { SignInPayload, SignUpPayload } from "@/types/authType";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes/authRoutes";

export const useSignUp = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: SignUpPayload) => signUp(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast.success(response.message);
      }
      router.push(Routes.SIGNIN);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Sign up failed";
      toast.error(errorMessage);
    },
  });
};

export const useSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignInPayload) => signIn(data),
    onSuccess: (response) => {
      if (response?.message && response.user) {
        toast.success(response.message);
        router.push(Routes.TODOS);
      } else {
        toast.warning("Login successful but no user data received");
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Invalid credentials";
      toast.error(errorMessage);
    },
  });
};

export const useSignOut = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signOut,
    onSuccess: (response) => {
      const message = response?.message || "Logged out successfully";
      toast.success(message);
      router.replace(Routes.SIGNIN);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to log out";
      toast.error(errorMessage);
    },
  });
};
