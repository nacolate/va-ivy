"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

interface AppHeaderProps {
  title: string;
  description?: string;
  username: string;
  displayName: string | null;
}

export function AppHeader({ title, description, username, displayName }: AppHeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {description && <p className="text-xs text-slate-500">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <div className="w-7 h-7 rounded-full bg-blue-900 flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <span className="font-medium">{displayName || username}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-500">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
