import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { AcademicsContent } from "./AcademicsContent";

export default async function AcademicsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <AppShell
      title="Academics"
      description="Track subjects, scores, and study plans"
      username={session.username}
      displayName={session.displayName}
    >
      <AcademicsContent />
    </AppShell>
  );
}
