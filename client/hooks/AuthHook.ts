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
    onSuccess: ({ user }) => {
      if (user) {
        toast.success("Sign up successful");
        router.push(Routes.SIGNIN);
      } else {
        toast.error("Sign up failed");
      }
    },
    onError: () => toast.error("Sign up failed"),
  });
};

export const useSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignInPayload) => signIn(data),
    onSuccess: ({ user }) => {
      toast.success(`Welcome ${user.email}`);
      router.push(Routes.TODOS);
    },
    onError: () => toast.error("Invalid credentials"),
  });
};

export const useSignOut = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      toast.success("Logged out successfully");
      router.push(Routes.SIGNIN);
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });
};
