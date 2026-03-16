"use client";
import { useState } from "react";
import { Plus, Zap, LayoutDashboard, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Invoice } from "@/lib/types";
import { demoInvoices } from "@/lib/demo-data";
import InvoiceCard from "@/components/InvoiceCard";
import AddInvoiceModal from "@/components/AddInvoiceModal";
import EmailPreviewModal from "@/components/EmailPreviewModal";

type FilterType = "all" | "overdue" | "escalating" | "paid" | "upcoming" | "collections";

export default function DashboardPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(demoInvoices);
  const [filter, setFilter] = useState<FilterType>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);

  const filtered = filter === "all" ? invoices : invoices.filter((i) => i.status === filter);

  const stats = {
    totalOverdue: invoices.filter((i) => i.status === "overdue" || i.status === "escalating" || i.status === "collections").reduce((s, i) => s + i.amount, 0),
    overdueCount: invoices.filter((i) => i.status === "overdue" || i.status === "escalating" || i.status === "collections").length,
    paidThisMonth: invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0),
    upcoming: invoices.filter((i) => i.status === "upcoming").reduce((s, i) => s + i.amount, 0),
  };

  const handleMarkPaid = (id: string) => {
    setInvoices((prev) => prev.map((inv) => inv.id === id ? { ...inv, status: "paid", daysOverdue: undefined, escalationStage: 0 } : inv));
  };

  const handleAddInvoice = (invoice: Invoice) => {
    setInvoices((prev) => [invoice, ...prev]);
  };

  const filterButtons: { key: FilterType; label: string; color: string }[] = [
    { key: "all", label: "All", color: "bg-gray-100 text-gray-700 hover:bg-gray-200" },
    { key: "overdue", label: "Overdue", color: "bg-red-100 text-red-700 hover:bg-red-200" },
    { key: "escalating", label: "Escalating", color: "bg-violet-100 text-violet-700 hover:bg-violet-200" },
    { key: "collections", label: "Collections", color: "bg-orange-100 text-orange-700 hover:bg-orange-200" },
    { key: "upcoming", label: "Upcoming", color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
    { key: "paid", label: "Paid", color: "bg-green-100 text-green-700 hover:bg-green-200" },
  ];

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
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-violet-50 text-violet-700 font-medium text-sm">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link href="/templates" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors">
            <FileText className="w-4 h-4" />
            Templates
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="bg-violet-50 rounded-xl p-3 mb-3">
            <div className="text-xs font-semibold text-violet-700 mb-1">Demo Mode</div>
            <div className="text-xs text-violet-600">Pre-loaded with sample invoices</div>
          </div>
          <Link href="/" className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-3 h-3" />
            Back to site
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-56 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invoice Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Demo mode — changes are local only</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-violet-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Invoice
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-red-100">
            <div className="text-sm text-gray-500 mb-1">Outstanding Balance</div>
            <div className="text-3xl font-bold text-red-600">${stats.totalOverdue.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">{stats.overdueCount} invoice{stats.overdueCount !== 1 ? "s" : ""} overdue</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-green-100">
            <div className="text-sm text-gray-500 mb-1">Collected</div>
            <div className="text-3xl font-bold text-green-600">${stats.paidThisMonth.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">Paid invoices</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-blue-100">
            <div className="text-sm text-gray-500 mb-1">Upcoming</div>
            <div className="text-3xl font-bold text-blue-600">${stats.upcoming.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">Not yet due</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-6">
          {filterButtons.map((btn) => {
            const count = btn.key === "all" ? invoices.length : invoices.filter((i) => i.status === btn.key).length;
            return (
              <button
                key={btn.key}
                onClick={() => setFilter(btn.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  filter === btn.key ? btn.color + " ring-2 ring-current ring-offset-1" : btn.color
                }`}
              >
                {btn.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Invoice grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">📭</div>
            <div className="font-medium">No invoices here</div>
            <div className="text-sm mt-1">Add one with the button above</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((invoice) => (
              <div key={invoice.id} className="animate-fadeIn">
                <InvoiceCard
                  invoice={invoice}
                  onMarkPaid={handleMarkPaid}
                  onViewTemplate={(inv) => setPreviewInvoice(inv)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddInvoiceModal onClose={() => setShowAddModal(false)} onAdd={handleAddInvoice} />
      )}

      {previewInvoice && (
        <EmailPreviewModal invoice={previewInvoice} onClose={() => setPreviewInvoice(null)} />
      )}
    </div>
  );
}
