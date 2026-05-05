export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const now = new Date();
  const sevenDaysLater = new Date(now);
  sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

  const [
    allTasks,
    academics,
    testing,
    activities,
    awards,
    books,
    projects,
    research,
    chess,
  ] = await Promise.all([
    prisma.task.findMany(),
    prisma.academicSubject.findMany(),
    prisma.testingItem.findMany(),
    prisma.activity.findMany(),
    prisma.award.findMany(),
    prisma.book.findMany(),
    prisma.project.findMany(),
    prisma.research.findMany(),
    prisma.chessTournament.findMany(),
  ]);

  const completedTasks = allTasks.filter((t) => t.status === "COMPLETED").length;
  const activeTasks = allTasks.filter((t) => t.status === "IN_PROGRESS").length;
  const overdueTasks = allTasks.filter(
    (t) => t.dueDate && t.dueDate < now && t.status !== "COMPLETED"
  ).length;
  const dueSoonTasks = allTasks.filter(
    (t) => t.dueDate && t.dueDate >= now && t.dueDate <= sevenDaysLater && t.status !== "COMPLETED"
  );
  const highPriorityTasks = allTasks.filter(
    (t) => (t.priority === "HIGH" || t.priority === "CRITICAL") && t.status !== "COMPLETED"
  );
  const overdueTasksList = allTasks.filter(
    (t) => t.dueDate && t.dueDate < now && t.status !== "COMPLETED"
  );

  const calcPct = (items: any[]) => {
    if (!items.length) return 0;
    return Math.round((items.filter((i) => i.status === "COMPLETED").length / items.length) * 100);
  };

  const moduleProgress = {
    academics: calcPct(academics),
    testing: calcPct(testing),
    activities: calcPct(activities),
    awards: calcPct(awards),
    books: calcPct(books),
    projects: calcPct(projects),
    research: calcPct(research),
    chess: calcPct(chess),
  };

  const overallProgress = calcPct(allTasks);

  const currentMissions = [
    ...academics.filter((i) => i.status === "IN_PROGRESS").map((i) => ({ type: "Academic", name: i.subject, id: i.id })),
    ...testing.filter((i) => i.status === "IN_PROGRESS").map((i) => ({ type: "Testing", name: i.name, id: i.id })),
    ...activities.filter((i) => i.status === "IN_PROGRESS").map((i) => ({ type: "Activity", name: i.name, id: i.id })),
    ...projects.filter((i) => i.status === "IN_PROGRESS").map((i) => ({ type: "Project", name: i.name, id: i.id })),
    ...research.filter((i) => i.status === "IN_PROGRESS").map((i) => ({ type: "Research", name: i.title, id: i.id })),
  ].slice(0, 6);

  return NextResponse.json({
    kpi: {
      totalTasks: allTasks.length,
      completedTasks,
      activeTasks,
      overdueTasks,
      overallProgress,
    },
    moduleProgress,
    currentMissions,
    dueSoonTasks: dueSoonTasks.slice(0, 5),
    highPriorityTasks: highPriorityTasks.slice(0, 5),
    overdueTasksList: overdueTasksList.slice(0, 5),
  });
}
