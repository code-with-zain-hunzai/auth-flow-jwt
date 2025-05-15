"use client";

import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/AuthHook";

export const LogoutButton = () => {
  const { mutate: logout } = useSignOut();

  return <Button onClick={() => logout()}>Logout</Button>;
};
