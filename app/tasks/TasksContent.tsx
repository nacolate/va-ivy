"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Dialog, ConfirmDialog } from "@/components/ui/dialog";
import { StatusBadge, PriorityBadge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { FormField } from "@/components/forms/FormField";
import { formatDate, CATEGORY_LABELS } from "@/lib/utils";
import { Plus, Pencil, Trash2, CheckCircle2, Search } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "PLANNED", label: "Planned" }, { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" }, { value: "PAUSED", label: "Paused" }, { value: "CANCELLED", label: "Cancelled" },
];
const PRIORITY_OPTIONS = [
  { value: "LOW", label: "Low" }, { value: "MEDIUM", label: "Medium" }, { value: "HIGH", label: "High" }, { value: "CRITICAL", label: "Critical" },
];
const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS).map(([v, l]) => ({ value: v, label: l }));

const emptyForm = {
  title: "", description: "", category: "GENERAL", priority: "MEDIUM", status: "PLANNED",
  startDate: "", dueDate: "", completedAt: "",
  academicSubjectId: "", testingItemId: "", activityId: "", awardId: "", bookId: "", projectId: "", researchId: "", chessTournamentId: "",
};

export function TasksContent() {
  const [items, setItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const params = new URLSearchParams();
    if (filterStatus) params.set("status", filterStatus);
    if (filterPriority) params.set("priority", filterPriority);
    if (filterCategory) params.set("category", filterCategory);
    if (search) params.set("search", search);
    const res = await fetch(`/api/tasks?${params.toString()}`);
    setItems(await res.json());
  }

  useEffect(() => { load(); }, [filterStatus, filterPriority, filterCategory, search]);

  function openAdd() { setForm({ ...emptyForm }); setEditItem(null); setError(""); setOpenForm(true); }
  function openEdit(item: any) {
    setForm({
      title: item.title, description: item.description || "", category: item.category, priority: item.priority, status: item.status,
      startDate: item.startDate ? item.startDate.slice(0, 10) : "",
      dueDate: item.dueDate ? item.dueDate.slice(0, 10) : "",
      completedAt: item.completedAt ? item.completedAt.slice(0, 10) : "",
      academicSubjectId: item.academicSubjectId ? String(item.academicSubjectId) : "",
      testingItemId: item.testingItemId ? String(item.testingItemId) : "",
      activityId: item.activityId ? String(item.activityId) : "",
      awardId: item.awardId ? String(item.awardId) : "",
      bookId: item.bookId ? String(item.bookId) : "",
      projectId: item.projectId ? String(item.projectId) : "",
      researchId: item.researchId ? String(item.researchId) : "",
      chessTournamentId: item.chessTournamentId ? String(item.chessTournamentId) : "",
    });
    setEditItem(item); setError(""); setOpenForm(true);
  }
  function setField(k: string) { return (v: string) => setForm((f) => ({ ...f, [k]: v })); }

  function getRelatedName(item: any) {
    if (item.academicSubject) return `Academic: ${item.academicSubject.subject}`;
    if (item.testingItem) return `Test: ${item.testingItem.name}`;
    if (item.activity) return `Activity: ${item.activity.name}`;
    if (item.award) return `Award: ${item.award.name}`;
    if (item.book) return `Book: ${item.book.title}`;
    if (item.project) return `Project: ${item.project.name}`;
    if (item.research) return `Research: ${item.research.title}`;
    if (item.chessTournament) return `Chess: ${item.chessTournament.name}`;
    return "—";
  }

  async function markComplete(id: number, currentStatus: string) {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: item.title, category: item.category, priority: item.priority,
        status: currentStatus === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED",
        completedAt: currentStatus === "COMPLETED" ? null : new Date().toISOString().slice(0, 10),
        description: item.description, startDate: item.startDate?.slice(0, 10), dueDate: item.dueDate?.slice(0, 10),
        academicSubjectId: item.academicSubjectId, testingItemId: item.testingItemId,
        activityId: item.activityId, awardId: item.awardId, bookId: item.bookId,
        projectId: item.projectId, researchId: item.researchId, chessTournamentId: item.chessTournamentId,
      }),
    });
    load();
  }

  async function handleSave() {
    setSaving(true); setError("");
    try {
      const payload = {
        ...form,
        academicSubjectId: form.academicSubjectId ? Number(form.academicSubjectId) : null,
        testingItemId: form.testingItemId ? Number(form.testingItemId) : null,
        activityId: form.activityId ? Number(form.activityId) : null,
        awardId: form.awardId ? Number(form.awardId) : null,
        bookId: form.bookId ? Number(form.bookId) : null,
        projectId: form.projectId ? Number(form.projectId) : null,
        researchId: form.researchId ? Number(form.researchId) : null,
        chessTournamentId: form.chessTournamentId ? Number(form.chessTournamentId) : null,
      };
      const url = editItem ? `/api/tasks/${editItem.id}` : "/api/tasks";
      const res = await fetch(url, { method: editItem ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) { const d = await res.json(); setError(d.error?.formErrors?.[0] || "Failed to save"); return; }
      setOpenForm(false); load();
    } finally { setSaving(false); }
  }

  async function handleDelete() {
    if (!deleteId) return;
    await fetch(`/api/tasks/${deleteId}`, { method: "DELETE" });
    setDeleteId(null); load();
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-36">
          <option value="">All Status</option>
          {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </Select>
        <Select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="w-36">
          <option value="">All Priority</option>
          {PRIORITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </Select>
        <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="w-36">
          <option value="">All Categories</option>
          {CATEGORY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </Select>
        <Button onClick={openAdd}><Plus className="h-4 w-4" /> Add Task</Button>
      </div>

      {items.length === 0 ? (
        <EmptyState title="No tasks found" description="Add a new task or adjust your filters." action={<Button onClick={openAdd}><Plus className="h-4 w-4" /> Add Task</Button>} />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 w-8" />
                {["Title", "Category", "Priority", "Status", "Due Date", "Related To", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-slate-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className={`border-b border-slate-50 hover:bg-slate-50 ${item.status === "COMPLETED" ? "opacity-60" : ""}`}>
                  <td className="px-4 py-3">
                    <button onClick={() => markComplete(item.id, item.status)} className="text-slate-300 hover:text-emerald-500 transition-colors">
                      <CheckCircle2 className={`h-5 w-5 ${item.status === "COMPLETED" ? "text-emerald-500" : ""}`} />
                    </button>
                  </td>
                  <td className={`px-4 py-3 font-medium ${item.status === "COMPLETED" ? "line-through text-slate-400" : "text-slate-900"}`}>{item.title}</td>
                  <td className="px-4 py-3 text-slate-600">{CATEGORY_LABELS[item.category] || item.category}</td>
                  <td className="px-4 py-3"><PriorityBadge priority={item.priority} /></td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3 text-slate-600">{formatDate(item.dueDate)}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{getRelatedName(item)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(item)} className="p-1.5 h-auto"><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteId(item.id)} className="p-1.5 h-auto text-red-500 hover:text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={openForm} onClose={() => setOpenForm(false)} title={editItem ? "Edit Task" : "Add Task"} className="max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2"><FormField label="Title" name="title" value={form.title} onChange={setField("title")} required /></div>
          <FormField label="Category" name="category" type="select" value={form.category} onChange={setField("category")} options={CATEGORY_OPTIONS} required />
          <FormField label="Priority" name="priority" type="select" value={form.priority} onChange={setField("priority")} options={PRIORITY_OPTIONS} />
          <div className="col-span-2"><FormField label="Status" name="status" type="select" value={form.status} onChange={setField("status")} options={STATUS_OPTIONS} /></div>
          <FormField label="Start Date" name="startDate" type="date" value={form.startDate} onChange={setField("startDate")} />
          <FormField label="Due Date" name="dueDate" type="date" value={form.dueDate} onChange={setField("dueDate")} />
          <div className="col-span-2"><FormField label="Description" name="description" type="textarea" value={form.description} onChange={setField("description")} /></div>
        </div>
        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
        </div>
      </Dialog>
      <ConfirmDialog open={deleteId !== null} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Task" description="Are you sure you want to delete this task?" />
    </div>
  );
}
