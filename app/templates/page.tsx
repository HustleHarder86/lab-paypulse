"use client";
import { useState } from "react";
import { Zap, LayoutDashboard, FileText, ArrowLeft, Edit3, Save, X } from "lucide-react";
import Link from "next/link";
import { escalationTemplates } from "@/lib/demo-data";
import { EscalationTemplate } from "@/lib/types";

const toneStyles: Record<string, { bg: string; badge: string; border: string }> = {
  friendly: { bg: "bg-green-50", badge: "bg-green-100 text-green-700", border: "border-green-200" },
  firm: { bg: "bg-yellow-50", badge: "bg-yellow-100 text-yellow-700", border: "border-yellow-200" },
  urgent: { bg: "bg-orange-50", badge: "bg-orange-100 text-orange-700", border: "border-orange-200" },
  final: { bg: "bg-red-50", badge: "bg-red-100 text-red-700", border: "border-red-200" },
};

const toneEmoji: Record<string, string> = {
  friendly: "😊",
  firm: "📋",
  urgent: "⚠️",
  final: "⚖️",
};

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<EscalationTemplate[]>(escalationTemplates);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<EscalationTemplate>>({});
  const [selected, setSelected] = useState<string>(templates[0].id);

  const startEdit = (t: EscalationTemplate) => {
    setEditingId(t.id);
    setEditData({ subject: t.subject, body: t.body });
  };

  const saveEdit = () => {
    setTemplates((prev) => prev.map((t) => t.id === editingId ? { ...t, ...editData } : t));
    setEditingId(null);
    setEditData({});
  };

  const selectedTpl = templates.find((t) => t.id === selected)!;
  const styles = toneStyles[selectedTpl.tone];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-56 bg-white border-r border-gray-100 flex flex-col z-40">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">PayPulse</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link href="/templates" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-violet-50 text-violet-700 font-medium text-sm">
            <FileText className="w-4 h-4" />
            Templates
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <Link href="/" className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-3 h-3" />
            Back to site
          </Link>
        </div>
      </div>

      <div className="ml-56 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Escalation Templates</h1>
          <p className="text-gray-500 text-sm mt-1">4 pre-built templates, fully customizable. Variables like {"{{clientName}}"} are auto-filled.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Template list */}
          <div className="space-y-3">
            {templates.map((t) => {
              const s = toneStyles[t.tone];
              return (
                <button
                  key={t.id}
                  onClick={() => setSelected(t.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selected === t.id ? `${s.bg} ${s.border}` : "bg-white border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{toneEmoji[t.tone]}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.badge}`}>{t.name}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Triggers at Day {t.daysTrigger}</div>
                  <div className="text-xs font-medium text-gray-700 mt-2 truncate">{t.subject.split(":")[0]}...</div>
                </button>
              );
            })}
          </div>

          {/* Template detail */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl border-2 ${styles.border} ${styles.bg} overflow-hidden`}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-current border-opacity-20 bg-white/50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{toneEmoji[selectedTpl.tone]}</span>
                  <div>
                    <div className="font-bold text-gray-900">{selectedTpl.name}</div>
                    <div className="text-xs text-gray-500">Sends automatically on Day {selectedTpl.daysTrigger}</div>
                  </div>
                </div>
                {editingId === selectedTpl.id ? (
                  <div className="flex gap-2">
                    <button onClick={() => setEditingId(null)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition-colors">
                      <X className="w-3 h-3" /> Cancel
                    </button>
                    <button onClick={saveEdit} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-medium hover:bg-violet-700 transition-colors">
                      <Save className="w-3 h-3" /> Save
                    </button>
                  </div>
                ) : (
                  <button onClick={() => startEdit(selectedTpl)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors">
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                )}
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Subject Line</label>
                  {editingId === selectedTpl.id ? (
                    <input
                      value={editData.subject || ""}
                      onChange={(e) => setEditData({ ...editData, subject: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                    />
                  ) : (
                    <div className="bg-white/70 rounded-lg px-3 py-2 text-sm text-gray-800 font-medium">
                      {selectedTpl.subject}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Email Body</label>
                  {editingId === selectedTpl.id ? (
                    <textarea
                      value={editData.body || ""}
                      onChange={(e) => setEditData({ ...editData, body: e.target.value })}
                      rows={16}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 font-mono"
                    />
                  ) : (
                    <div className="bg-white/70 rounded-lg px-4 py-3">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                        {selectedTpl.body}
                      </pre>
                    </div>
                  )}
                </div>

                <div className="bg-white/70 rounded-lg p-4 border border-current border-opacity-10">
                  <div className="text-xs font-semibold text-gray-500 mb-2">Available variables</div>
                  <div className="flex flex-wrap gap-2">
                    {["{{clientName}}", "{{invoiceNumber}}", "{{amount}}", "{{dueDate}}", "{{lateFeePercent}}", "{{senderName}}"].map((v) => (
                      <span key={v} className="text-xs bg-white px-2 py-1 rounded border border-gray-200 font-mono text-gray-600">{v}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
