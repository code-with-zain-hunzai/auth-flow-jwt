"use client";
import React from "react";
import Link from "next/link";
import { LogoutButton } from "@/app/components/Logout";

export const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm p-2">
      <div className="container mx-auto flex justify-between">
        <div className="text-lg font-bold">
          <Link href="/">Auth</Link>
        </div>

        <div className="space-x-4">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};
