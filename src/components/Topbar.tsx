"use client";

import { Button } from "@/components/ui/button";
import { Bell, Menu, LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth";
import { useTransition } from "react";

export function Topbar() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <header className="h-16 border-b border-outline-variant/50 bg-surface flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5 text-on-surface" />
        </Button>
        <h2 className="text-lg font-semibold text-on-surface md:hidden">
          AcademIA
        </h2>
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <Button
          variant="ghost"
          size="icon"
          className="text-on-surface-variant hover:text-on-surface"
        >
          <Bell className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            A
          </div>
          <span className="text-sm font-medium text-on-surface hidden sm:inline-block">
            Mi cuenta
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          disabled={isPending}
          title="Cerrar sesión"
          className="text-on-surface-variant hover:text-red-500"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
