"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, ConfirmDialog } from "@/components/ui/dialog";
import { StatusBadge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { FormField } from "@/components/forms/FormField";
import { formatDate } from "@/lib/utils";
import { Plus, Pencil, Trash2 } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "PLANNED", label: "Planned" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "PAUSED", label: "Paused" },
  { value: "CANCELLED", label: "Cancelled" },
];

const emptyForm = { name: "", targetScore: "", actualScore: "", plannedDate: "", actualDate: "", status: "PLANNED", notes: "" };

export function TestingContent() {
  const [items, setItems] = useState<any[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/testing");
    setItems(await res.json());
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm({ ...emptyForm }); setEditItem(null); setError(""); setOpenForm(true); }
  function openEdit(item: any) {
    setForm({ name: item.name, targetScore: item.targetScore || "", actualScore: item.actualScore || "", plannedDate: item.plannedDate ? item.plannedDate.slice(0, 10) : "", actualDate: item.actualDate ? item.actualDate.slice(0, 10) : "", status: item.status, notes: item.notes || "" });
    setEditItem(item); setError(""); setOpenForm(true);
  }
  function setField(key: string) { return (value: string) => setForm((f) => ({ ...f, [key]: value })); }

  async function handleSave() {
    setSaving(true); setError("");
    try {
      const url = editItem ? `/api/testing/${editItem.id}` : "/api/testing";
      const res = await fetch(url, { method: editItem ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) { const d = await res.json(); setError(d.error?.formErrors?.[0] || "Failed to save"); return; }
      setOpenForm(false); load();
    } finally { setSaving(false); }
  }

  async function handleDelete() {
    if (!deleteId) return;
    await fetch(`/api/testing/${deleteId}`, { method: "DELETE" });
    setDeleteId(null); load();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={openAdd}><Plus className="h-4 w-4" /> Add Test</Button>
      </div>
      {items.length === 0 ? (
        <EmptyState title="No tests yet" description="Add SAT, IELTS, AP or other tests." action={<Button onClick={openAdd}><Plus className="h-4 w-4" /> Add Test</Button>} />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 font-medium text-slate-600">Test Name</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Target</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Actual</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Planned Date</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Actual Date</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Tasks</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.name}</td>
                  <td className="px-4 py-3 text-slate-600">{item.targetScore || "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{item.actualScore || "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{formatDate(item.plannedDate)}</td>
                  <td className="px-4 py-3 text-slate-600">{formatDate(item.actualDate)}</td>
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
      <Dialog open={openForm} onClose={() => setOpenForm(false)} title={editItem ? "Edit Test" : "Add Test"}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2"><FormField label="Test Name" name="name" value={form.name} onChange={setField("name")} required /></div>
          <FormField label="Target Score" name="targetScore" value={form.targetScore} onChange={setField("targetScore")} />
          <FormField label="Actual Score" name="actualScore" value={form.actualScore} onChange={setField("actualScore")} />
          <FormField label="Planned Date" name="plannedDate" type="date" value={form.plannedDate} onChange={setField("plannedDate")} />
          <FormField label="Actual Date" name="actualDate" type="date" value={form.actualDate} onChange={setField("actualDate")} />
          <div className="col-span-2"><FormField label="Status" name="status" type="select" value={form.status} onChange={setField("status")} options={STATUS_OPTIONS} /></div>
          <div className="col-span-2"><FormField label="Notes" name="notes" type="textarea" value={form.notes} onChange={setField("notes")} /></div>
        </div>
        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
        </div>
      </Dialog>
      <ConfirmDialog open={deleteId !== null} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Test" description="Are you sure you want to delete this test?" />
    </div>
  );
}
