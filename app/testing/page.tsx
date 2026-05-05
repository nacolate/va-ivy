import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { TestingContent } from "./TestingContent";

export default async function TestingPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <AppShell title="Testing" description="SAT, TOEFL, IELTS, AP Tests and more" username={session.username} displayName={session.displayName}>
      <TestingContent />
    </AppShell>
  );
}
