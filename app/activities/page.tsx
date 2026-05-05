import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ActivitiesContent } from "./ActivitiesContent";

export default async function ActivitiesPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <AppShell title="Activities" description="Extracurricular activities and leadership" username={session.username} displayName={session.displayName}>
      <ActivitiesContent />
    </AppShell>
  );
}
