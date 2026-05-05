"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, GraduationCap, FlaskConical, Users, Trophy, BookOpen,
  FolderKanban, Microscope, Crown, CheckSquare, Settings
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/academics", label: "Academics", icon: GraduationCap },
  { href: "/testing", label: "Testing", icon: FlaskConical },
  { href: "/activities", label: "Activities", icon: Users },
  { href: "/awards", label: "Awards", icon: Trophy },
  { href: "/books", label: "Books", icon: BookOpen },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/research", label: "Research", icon: Microscope },
  { href: "/chess", label: "Chess", icon: Crown },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-blue-900 flex flex-col z-40">
      <div className="px-6 py-5 border-b border-blue-800">
        <p className="text-xs font-medium text-blue-300 uppercase tracking-widest">Mission Control</p>
        <h1 className="text-white font-bold text-lg leading-tight mt-0.5">VA Ivy</h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-0.5 transition-colors",
                active
                  ? "bg-blue-700 text-white"
                  : "text-blue-200 hover:bg-blue-800 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-blue-800">
        <p className="text-xs text-blue-400 text-center">Ivy League Ready 🎓</p>
      </div>
    </aside>
  );
}
