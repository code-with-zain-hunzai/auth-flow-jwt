import { useMutation } from "@tanstack/react-query";
import { submitForm } from "../api/api";
import { FormValues } from "../schema/form.schema";

export const useSubmitForm = () => {
  return useMutation({
    mutationFn: (data: FormValues) => submitForm(data),
  });
};
