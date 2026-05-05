import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ResearchContent } from "./ResearchContent";

export default async function ResearchPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <AppShell title="Research" description="Academic research and publications" username={session.username} displayName={session.displayName}>
      <ResearchContent />
    </AppShell>
  );
}
