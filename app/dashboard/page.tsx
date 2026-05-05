import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { DashboardContent } from "./DashboardContent";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <AppShell
      title="Dashboard"
      description="Application Mission Control Overview"
      username={session.username}
      displayName={session.displayName}
    >
      <DashboardContent />
    </AppShell>
  );
}
