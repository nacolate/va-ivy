"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { formatDate, isOverdue } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

interface DashboardData {
  kpi: {
    totalTasks: number;
    completedTasks: number;
    activeTasks: number;
    overdueTasks: number;
    overallProgress: number;
  };
  moduleProgress: Record<string, number>;
  currentMissions: { type: string; name: string; id: number }[];
  dueSoonTasks: any[];
  highPriorityTasks: any[];
  overdueTasksList: any[];
}

const MODULE_COLORS: Record<string, string> = {
  academics: "#1E3A8A",
  testing: "#7C3AED",
  activities: "#0891B2",
  awards: "#F59E0B",
  books: "#10B981",
  projects: "#F97316",
  research: "#EC4899",
  chess: "#64748B",
};

const PIE_COLORS = ["#10B981", "#1E3A8A", "#F59E0B", "#EF4444"];

export function DashboardContent() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard").then((r) => r.json()).then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400">Loading dashboard...</div>
      </div>
    );
  }

  const { kpi, moduleProgress, currentMissions, dueSoonTasks, highPriorityTasks, overdueTasksList } = data;

  const moduleBarData = Object.entries(moduleProgress).map(([key, val]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    progress: val,
  }));

  const pieData = [
    { name: "Completed", value: kpi.completedTasks },
    { name: "Active", value: kpi.activeTasks },
    { name: "Planned", value: kpi.totalTasks - kpi.completedTasks - kpi.activeTasks - kpi.overdueTasks },
    { name: "Overdue", value: kpi.overdueTasks },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Tasks", value: kpi.totalTasks, color: "text-blue-900" },
          { label: "Completed", value: kpi.completedTasks, color: "text-emerald-600" },
          { label: "Active", value: kpi.activeTasks, color: "text-blue-600" },
          { label: "Overdue", value: kpi.overdueTasks, color: "text-red-600" },
          { label: "Progress", value: `${kpi.overallProgress}%`, color: "text-indigo-600" },
        ].map(({ label, value, color }) => (
          <Card key={label} className="text-center">
            <div className={`text-3xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-slate-500 mt-1">{label}</div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Module Progress</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={moduleBarData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="progress" radius={[4, 4, 0, 0]}>
                {moduleBarData.map((entry) => (
                  <Cell key={entry.name} fill={MODULE_COLORS[entry.name.toLowerCase()] || "#64748B"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Task Status Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Module Progress Bars */}
      <Card>
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Application Pillars</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(moduleProgress).map(([key, pct]) => (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700 capitalize">{key}</span>
                <span className="text-slate-500">{pct}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, backgroundColor: MODULE_COLORS[key] || "#64748B" }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Current Missions + Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Current Missions</h3>
          {currentMissions.length === 0 ? (
            <p className="text-sm text-slate-400">No active missions.</p>
          ) : (
            <ul className="space-y-2">
              {currentMissions.map((m, i) => (
                <li key={i} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{m.type}</span>
                  <span className="text-sm text-slate-800 flex-1">{m.name}</span>
                  <StatusBadge status="IN_PROGRESS" />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="space-y-4">
          {overdueTasksList.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-red-600 mb-3">Overdue Tasks</h3>
              <ul className="space-y-2">
                {overdueTasksList.slice(0, 3).map((t) => (
                  <li key={t.id} className="text-sm flex justify-between">
                    <span className="text-slate-800">{t.title}</span>
                    <span className="text-red-500 text-xs">{formatDate(t.dueDate)}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Due This Week</h3>
            {dueSoonTasks.length === 0 ? (
              <p className="text-sm text-slate-400">Nothing due in the next 7 days.</p>
            ) : (
              <ul className="space-y-2">
                {dueSoonTasks.slice(0, 4).map((t) => (
                  <li key={t.id} className="text-sm flex justify-between">
                    <span className="text-slate-800">{t.title}</span>
                    <span className="text-slate-500 text-xs">{formatDate(t.dueDate)}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {highPriorityTasks.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-amber-600 mb-3">High Priority</h3>
              <ul className="space-y-2">
                {highPriorityTasks.slice(0, 3).map((t) => (
                  <li key={t.id} className="text-sm flex justify-between">
                    <span className="text-slate-800">{t.title}</span>
                    <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">{t.priority}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
