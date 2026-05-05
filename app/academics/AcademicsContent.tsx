"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, ConfirmDialog } from "@/components/ui/dialog";
import { StatusBadge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { FormField } from "@/components/forms/FormField";
import { formatDate, GRADE_LABELS } from "@/lib/utils";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Input, Select } from "@/components/ui/input";

const STATUS_OPTIONS = [
  { value: "PLANNED", label: "Planned" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "PAUSED", label: "Paused" },
  { value: "CANCELLED", label: "Cancelled" },
];

const GRADE_OPTIONS = Object.entries(GRADE_LABELS).map(([v, l]) => ({ value: v, label: l }));

const IMPORTANCE_OPTIONS = [1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: String(n) }));

const emptyForm = {
  subject: "", grade: "GRADE_11", level: "", importanceLevel: "3",
  targetScore: "", actualScore: "", studyMode: "", teacher: "", mentor: "",
  status: "PLANNED", notes: "", startDate: "", endDate: "",
};

export function AcademicsContent() {
  const [items, setItems] = useState<any[]>([]);
  const [gradeFilter, setGradeFilter] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const url = gradeFilter ? `/api/academics?grade=${gradeFilter}` : "/api/academics";
    const res = await fetch(url);
    setItems(await res.json());
  }

  useEffect(() => { load(); }, [gradeFilter]);

  function openAdd() {
    setForm({ ...emptyForm });
    setEditItem(null);
    setError("");
    setOpenForm(true);
  }

  function openEdit(item: any) {
    setForm({
      subject: item.subject || "",
      grade: item.grade || "GRADE_11",
      level: item.level || "",
      importanceLevel: String(item.importanceLevel || 3),
      targetScore: item.targetScore || "",
      actualScore: item.actualScore || "",
      studyMode: item.studyMode || "",
      teacher: item.teacher || "",
      mentor: item.mentor || "",
      status: item.status || "PLANNED",
      notes: item.notes || "",
      startDate: item.startDate ? item.startDate.slice(0, 10) : "",
      endDate: item.endDate ? item.endDate.slice(0, 10) : "",
    });
    setEditItem(item);
    setError("");
    setOpenForm(true);
  }

  function setField(key: string) {
    return (value: string) => setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const payload = { ...form, importanceLevel: Number(form.importanceLevel) };
      const url = editItem ? `/api/academics/${editItem.id}` : "/api/academics";
      const method = editItem ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error?.formErrors?.[0] || "Failed to save");
        return;
      }
      setOpenForm(false);
      load();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    await fetch(`/api/academics/${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    load();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)} className="w-44">
          <option value="">All Grades</option>
          {GRADE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </Select>
        <Button onClick={openAdd}><Plus className="h-4 w-4" /> Add Subject</Button>
      </div>

      {items.length === 0 ? (
        <EmptyState title="No subjects yet" description="Add your first academic subject to get started." action={<Button onClick={openAdd}><Plus className="h-4 w-4" /> Add Subject</Button>} />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 font-medium text-slate-600">Subject</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Grade</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Level</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Target</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Actual</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Tasks</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.subject}</td>
                  <td className="px-4 py-3 text-slate-600">{GRADE_LABELS[item.grade] || item.grade}</td>
                  <td className="px-4 py-3 text-slate-600">{item.level || "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{item.targetScore || "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{item.actualScore || "—"}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3 text-slate-500">{item.tasks?.length ?? 0}</td>
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

      <Dialog open={openForm} onClose={() => setOpenForm(false)} title={editItem ? "Edit Subject" : "Add Subject"} className="max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Subject" name="subject" value={form.subject} onChange={setField("subject")} required />
          <FormField label="Grade" name="grade" type="select" value={form.grade} onChange={setField("grade")} options={GRADE_OPTIONS} required />
          <FormField label="Level" name="level" value={form.level} onChange={setField("level")} placeholder="e.g. AP, Advanced" />
          <FormField label="Importance (1-5)" name="importanceLevel" type="select" value={form.importanceLevel} onChange={setField("importanceLevel")} options={IMPORTANCE_OPTIONS} />
          <FormField label="Target Score" name="targetScore" value={form.targetScore} onChange={setField("targetScore")} />
          <FormField label="Actual Score" name="actualScore" value={form.actualScore} onChange={setField("actualScore")} />
          <FormField label="Study Mode" name="studyMode" value={form.studyMode} onChange={setField("studyMode")} />
          <FormField label="Status" name="status" type="select" value={form.status} onChange={setField("status")} options={STATUS_OPTIONS} />
          <FormField label="Teacher" name="teacher" value={form.teacher} onChange={setField("teacher")} />
          <FormField label="Mentor" name="mentor" value={form.mentor} onChange={setField("mentor")} />
          <FormField label="Start Date" name="startDate" type="date" value={form.startDate} onChange={setField("startDate")} />
          <FormField label="End Date" name="endDate" type="date" value={form.endDate} onChange={setField("endDate")} />
          <div className="col-span-2">
            <FormField label="Notes" name="notes" type="textarea" value={form.notes} onChange={setField("notes")} />
          </div>
        </div>
        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
        </div>
      </Dialog>

      <ConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Subject"
        description="Are you sure? This will also delete all related tasks."
      />
    </div>
  );
}
