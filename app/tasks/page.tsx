import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { TasksContent } from "./TasksContent";

export default async function TasksPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <AppShell title="Tasks" description="All tasks across every module" username={session.username} displayName={session.displayName}>
      <TasksContent />
    </AppShell>
  );
}
