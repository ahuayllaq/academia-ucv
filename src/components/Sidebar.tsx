"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CheckSquare, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Tareas", href: "/tasks", icon: CheckSquare },
  { name: "Cursos", href: "/courses", icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] hidden md:flex flex-col border-r border-outline-variant/50 bg-surface">
      <div className="p-6 h-16 flex items-center">
        <h1 className="text-xl font-bold text-primary">AcademIA</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-surface-container-high text-primary border-l-2 border-primary"
                  : "text-on-surface hover:bg-surface-container hover:text-on-surface"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-on-surface-variant")} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-outline-variant/50 text-xs text-on-surface-variant text-center">
        Gestor Académico v0.1
      </div>
    </aside>
  );
}
