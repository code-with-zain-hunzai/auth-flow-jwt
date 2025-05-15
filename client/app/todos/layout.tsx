import { Navbar } from "@/app/components/Navbar";
import { ReactNode } from "react";

export default function TodoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
