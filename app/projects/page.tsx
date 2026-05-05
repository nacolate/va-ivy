import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectsContent } from "./ProjectsContent";

export default async function ProjectsPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <AppShell title="Projects" description="Personal and team projects" username={session.username} displayName={session.displayName}>
      <ProjectsContent />
    </AppShell>
  );
}
