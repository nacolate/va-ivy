import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

interface AppShellProps {
  title: string;
  description?: string;
  username: string;
  displayName: string | null;
  children: React.ReactNode;
}

export function AppShell({ title, description, username, displayName, children }: AppShellProps) {
  return (
    <div className="flex h-screen bg-slate-50">
      <AppSidebar />
      <div className="flex-1 flex flex-col ml-60 min-w-0">
        <AppHeader title={title} description={description} username={username} displayName={displayName} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
