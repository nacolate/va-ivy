"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, CheckCircle } from "lucide-react";

interface Props {
  username: string;
  displayName: string | null;
}

export function SettingsContent({ username, displayName }: Props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSuccess(false);

    if (newPassword !== confirmPassword) { setError("New passwords do not match."); return; }
    if (newPassword.length < 6) { setError("New password must be at least 6 characters."); return; }

    setSaving(true);
    try {
      const res = await fetch("/api/settings/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to change password");
      } else {
        setSuccess(true);
        setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      }
    } finally { setSaving(false); }
  }

  return (
    <div className="max-w-lg space-y-6">
      {/* Profile Info */}
      <Card>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">{displayName || username}</p>
            <p className="text-sm text-slate-500">@{username}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-50">
            <span className="text-slate-500">Username</span>
            <span className="font-medium text-slate-900">{username}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-500">Display Name</span>
            <span className="font-medium text-slate-900">{displayName || "—"}</span>
          </div>
        </div>
      </Card>

      {/* Change Password */}
      <Card>
        <div className="flex items-center gap-3 mb-5">
          <Lock className="h-5 w-5 text-blue-900" />
          <h3 className="font-semibold text-slate-900">Change Password</h3>
        </div>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
            <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder="Min. 6 characters" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm New Password</label>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          {error && <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">{error}</div>}
          {success && (
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm text-emerald-700 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Password changed successfully.
            </div>
          )}
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Change Password"}</Button>
        </form>
      </Card>
    </div>
  );
}
