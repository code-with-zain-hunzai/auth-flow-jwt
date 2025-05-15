import { ZodError } from "zod";

export function getFormErrors<T>(error: unknown): Partial<Record<keyof T, string>> {
  if (error instanceof ZodError) {
    return error.formErrors.fieldErrors as Partial<Record<keyof T, string>>;
  }
  return {};
}