"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSignUp } from "@/hooks/AuthHook";
import { useState } from "react";
import { signUpSchema, type SignUpInput } from "@/schema/authSchema";
import { ZodError } from "zod";
import { getFormErrors } from "@/utils/zodUtils";
import { FormField } from "@/components/FormField";
import { Routes } from "@/routes/authRoutes";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignUpInput, string>>
  >({});

  const signUp = useSignUp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      signUpSchema.parse(form);
      setErrors({});
      signUp.mutate(form);
    } catch (error: any) {
      if (error instanceof ZodError) {
        const fieldErrors = getFormErrors<SignUpInput>(error);
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Name"
              id="name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />

            <FormField
              label="Email"
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            <FormField
              label="Password"
              id="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={signUp.isPending}
            >
              {signUp.isPending ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Already have an account?</p>
            <Button
              variant="link"
              className="w-full mt-1"
              onClick={() => router.replace(Routes.SIGNIN)}
            >
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
