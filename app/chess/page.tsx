import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ChessContent } from "./ChessContent";

export default async function ChessPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <AppShell title="Chess" description="Tournament records and ELO tracking" username={session.username} displayName={session.displayName}>
      <ChessContent />
    </AppShell>
  );
}
