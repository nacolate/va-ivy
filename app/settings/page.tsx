import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { SettingsContent } from "./SettingsContent";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <AppShell title="Settings" description="Account and preferences" username={session.username} displayName={session.displayName}>
      <SettingsContent username={session.username} displayName={session.displayName} />
    </AppShell>
  );
}
