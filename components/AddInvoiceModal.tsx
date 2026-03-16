"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Invoice } from "@/lib/types";

interface Props {
  onClose: () => void;
  onAdd: (invoice: Invoice) => void;
}

export default function AddInvoiceModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    amount: "",
    dueDate: "",
    description: "",
    invoiceNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dueDate = new Date(form.dueDate);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));

    let status: Invoice["status"] = "upcoming";
    let daysOverdue: number | undefined;
    let escalationStage: Invoice["escalationStage"] = 0;

    if (diffDays > 0) {
      daysOverdue = diffDays;
      if (diffDays >= 30) { status = "collections"; escalationStage = 4; }
      else if (diffDays >= 14) { status = "escalating"; escalationStage = 3; }
      else if (diffDays >= 7) { status = "escalating"; escalationStage = 2; }
      else { status = "overdue"; escalationStage = 1; }
    }

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      clientName: form.clientName,
      clientEmail: form.clientEmail,
      amount: parseFloat(form.amount),
      dueDate: form.dueDate,
      description: form.description,
      invoiceNumber: form.invoiceNumber || `INV-${Date.now().toString().slice(-6)}`,
      status,
      daysOverdue,
      escalationStage,
    };

    onAdd(newInvoice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Add Invoice</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
            <input
              required
              type="text"
              value={form.clientName}
              onChange={(e) => setForm({ ...form, clientName: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
              placeholder="Acme Corp"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client Email *</label>
            <input
              required
              type="email"
              value={form.clientEmail}
              onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
              placeholder="billing@acme.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  required
                  type="number"
                  min="1"
                  step="0.01"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
                  placeholder="1,500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
              <input
                required
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
              placeholder="Website redesign — Phase 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
            <input
              type="text"
              value={form.invoiceNumber}
              onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
              placeholder="INV-2025-001 (auto-generated if blank)"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-3 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors">
              Add Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
