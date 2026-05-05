import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create default user
  const passwordHash = await bcrypt.hash("123456", 12);
  const user = await prisma.user.upsert({
    where: { username: "duongvuanh" },
    update: {},
    create: {
      username: "duongvuanh",
      passwordHash,
      displayName: "Dương Vũ Anh",
    },
  });
  console.log("Created user:", user.username);

  // Academic subjects
  const math = await prisma.academicSubject.create({
    data: {
      grade: "GRADE_11",
      subject: "Mathematics",
      level: "AP Calculus BC",
      importanceLevel: 5,
      targetScore: "5",
      studyMode: "Self-study + Tutor",
      status: "IN_PROGRESS",
      startDate: new Date("2024-09-01"),
      notes: "Focus on limits, derivatives, integrals, and series.",
    },
  });

  const physics = await prisma.academicSubject.create({
    data: {
      grade: "GRADE_11",
      subject: "Physics",
      level: "AP Physics C",
      importanceLevel: 4,
      targetScore: "5",
      studyMode: "School class + Review",
      status: "IN_PROGRESS",
      startDate: new Date("2024-09-01"),
      notes: "Mechanics and E&M focus.",
    },
  });

  const english = await prisma.academicSubject.create({
    data: {
      grade: "GRADE_10",
      subject: "English Literature",
      level: "Advanced",
      importanceLevel: 4,
      targetScore: "A+",
      actualScore: "A",
      studyMode: "School class",
      status: "COMPLETED",
      startDate: new Date("2023-09-01"),
      endDate: new Date("2024-06-01"),
      notes: "Strong performance in literary analysis.",
    },
  });

  // Testing items
  const sat = await prisma.testingItem.create({
    data: {
      name: "SAT",
      targetScore: "1550",
      plannedDate: new Date("2025-03-08"),
      status: "PLANNED",
      notes: "Target 800 Math, 750 EBRW.",
    },
  });

  const ielts = await prisma.testingItem.create({
    data: {
      name: "IELTS",
      targetScore: "7.5",
      actualScore: "7.0",
      actualDate: new Date("2024-11-15"),
      status: "COMPLETED",
      notes: "Retake planned to reach 7.5+.",
    },
  });

  // Activities
  const chess_club = await prisma.activity.create({
    data: {
      name: "School Chess Club",
      role: "President",
      impact: "Led a 30-member club, organized inter-school tournaments, mentored junior players.",
      startDate: new Date("2023-09-01"),
      status: "IN_PROGRESS",
      notes: "Most impactful EC for college apps.",
    },
  });

  const coding_club = await prisma.activity.create({
    data: {
      name: "Coding Club",
      role: "Co-founder & Lead",
      impact: "Built apps for social impact, taught 20+ students programming basics.",
      startDate: new Date("2024-01-15"),
      status: "IN_PROGRESS",
    },
  });

  // Awards
  const chess_award = await prisma.award.create({
    data: {
      name: "National Youth Chess Championship",
      result: "Top 10 — National Level",
      plannedDate: new Date("2025-04-01"),
      status: "PLANNED",
      notes: "Preparation ongoing.",
    },
  });

  const math_award = await prisma.award.create({
    data: {
      name: "AMC 10/12",
      result: "Honor Roll",
      actualDate: new Date("2024-11-12"),
      status: "COMPLETED",
      notes: "Scored in top 5% nationally.",
    },
  });

  // Books
  const book1 = await prisma.book.create({
    data: {
      title: "The Innovators",
      author: "Walter Isaacson",
      startDate: new Date("2024-10-01"),
      endDate: new Date("2024-11-01"),
      status: "COMPLETED",
      notes: "Inspired interest in tech history and interdisciplinary thinking.",
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      startDate: new Date("2025-01-01"),
      status: "IN_PROGRESS",
      notes: "Excellent for understanding cognitive biases — relevant to chess and decision-making.",
    },
  });

  // Projects
  const project1 = await prisma.project.create({
    data: {
      name: "AI Chess Opening Trainer",
      description: "A web app that uses machine learning to recommend chess openings based on player style and rating.",
      mentor: "Dr. Nguyen Van Thanh",
      startDate: new Date("2024-06-01"),
      status: "IN_PROGRESS",
      notes: "Using Python + FastAPI + React. Targeting submission to school science fair.",
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: "Community Tutoring Platform",
      description: "An online platform connecting high-school volunteers with underprivileged middle-school students for free tutoring.",
      startDate: new Date("2024-09-01"),
      status: "PLANNED",
      outcome: "Aim to serve 100+ students in first year.",
    },
  });

  // Research
  const research1 = await prisma.research.create({
    data: {
      title: "Cognitive Benefits of Chess Training in Adolescents",
      description: "A literature review and original survey study on the impact of competitive chess on executive function and academic performance.",
      mentor: "Prof. Le Thi Hoa",
      startDate: new Date("2024-08-01"),
      status: "IN_PROGRESS",
      output: "Research paper (target: submission to JSHS)",
      notes: "Survey data collection phase complete. Writing draft now.",
    },
  });

  const research2 = await prisma.research.create({
    data: {
      title: "Machine Learning Applications in Game Theory",
      description: "Exploring how reinforcement learning models can solve zero-sum games, with chess as a case study.",
      startDate: new Date("2025-01-01"),
      status: "PLANNED",
      notes: "Reading AlphaZero paper and related literature.",
    },
  });

  // Chess tournaments
  const chess1 = await prisma.chessTournament.create({
    data: {
      name: "Hanoi Open Chess Tournament 2024",
      location: "Hanoi, Vietnam",
      startDate: new Date("2024-10-05"),
      endDate: new Date("2024-10-07"),
      result: "3rd Place",
      eloChange: 35,
      status: "COMPLETED",
      notes: "Best tournament result to date.",
    },
  });

  const chess2 = await prisma.chessTournament.create({
    data: {
      name: "National Youth Chess Championship 2025",
      location: "Ho Chi Minh City, Vietnam",
      startDate: new Date("2025-04-10"),
      endDate: new Date("2025-04-14"),
      status: "PLANNED",
      notes: "Main target tournament for 2025.",
    },
  });

  // Sample tasks
  await prisma.task.createMany({
    data: [
      {
        title: "Complete SAT Math Practice Test #5",
        category: "TESTING",
        priority: "HIGH",
        status: "PLANNED",
        dueDate: new Date("2025-02-15"),
        testingItemId: sat.id,
      },
      {
        title: "Write AP Calculus Chapter 6 Problem Set",
        category: "ACADEMIC",
        priority: "HIGH",
        status: "IN_PROGRESS",
        dueDate: new Date("2025-02-10"),
        academicSubjectId: math.id,
      },
      {
        title: "Finish draft of chess research paper",
        category: "RESEARCH",
        priority: "CRITICAL",
        status: "IN_PROGRESS",
        dueDate: new Date("2025-03-01"),
        researchId: research1.id,
      },
      {
        title: "Organize school chess club monthly meeting",
        category: "ACTIVITY",
        priority: "MEDIUM",
        status: "PLANNED",
        dueDate: new Date("2025-02-20"),
        activityId: chess_club.id,
      },
      {
        title: "Submit AMC 12 registration",
        category: "AWARD",
        priority: "HIGH",
        status: "COMPLETED",
        completedAt: new Date("2024-10-01"),
        awardId: math_award.id,
      },
      {
        title: "Read Chapters 5–8 of Thinking Fast and Slow",
        category: "BOOK",
        priority: "LOW",
        status: "IN_PROGRESS",
        dueDate: new Date("2025-02-28"),
        bookId: book2.id,
      },
      {
        title: "Build chess opening database API endpoint",
        category: "PROJECT",
        priority: "HIGH",
        status: "IN_PROGRESS",
        dueDate: new Date("2025-02-25"),
        projectId: project1.id,
      },
      {
        title: "Practice chess endgames — 30 min daily",
        category: "CHESS",
        priority: "MEDIUM",
        status: "IN_PROGRESS",
        chessTournamentId: chess2.id,
      },
      {
        title: "Review AP Physics C electromagnetism notes",
        category: "ACADEMIC",
        priority: "HIGH",
        status: "PLANNED",
        dueDate: new Date("2025-02-18"),
        academicSubjectId: physics.id,
      },
      {
        title: "Draft community tutoring platform proposal",
        category: "PROJECT",
        priority: "MEDIUM",
        status: "PLANNED",
        dueDate: new Date("2025-03-15"),
        projectId: project2.id,
      },
    ],
  });

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
