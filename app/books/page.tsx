import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { BooksContent } from "./BooksContent";

export default async function BooksPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <AppShell title="Books" description="Reading list and intellectual development" username={session.username} displayName={session.displayName}>
      <BooksContent />
    </AppShell>
  );
}
