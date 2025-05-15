"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSignIn } from "@/hooks/AuthHook";
import { useState } from "react";
import { signInSchema, type SignInInput } from "@/schema/authSchema";
import { getFormErrors } from "@/utils/zodUtils";
import { FormField } from "@/components/FormField";
import { ZodError } from "zod";
import { Routes } from "@/routes/authRoutes";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignInInput, string>>
  >({});

  const signIn = useSignIn();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      signInSchema.parse({ email, password });
      setErrors({});
      signIn.mutate({ email, password });
    } catch (error: any) {
      if (error instanceof ZodError) {
        const fieldErrors = getFormErrors<SignInInput>(error);
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />

            <FormField
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={signIn.isPending}
            >
              {signIn.isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Don't have an account?</p>
            <Button
              variant="link"
              className="w-full mt-1"
              onClick={() => router.replace(Routes.SIGNUP)}
            >
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
