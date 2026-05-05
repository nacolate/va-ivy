import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { AwardsContent } from "./AwardsContent";

export default async function AwardsPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <AppShell title="Awards" description="Competitions, awards, and recognitions" username={session.username} displayName={session.displayName}>
      <AwardsContent />
    </AppShell>
  );
}
