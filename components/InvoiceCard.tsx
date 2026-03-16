"use client";
import { Invoice, InvoiceStatus } from "@/lib/types";
import { Mail, Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const statusConfig: Record<InvoiceStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  paid: {
    label: "Paid",
    color: "text-green-700",
    bg: "bg-green-100",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  upcoming: {
    label: "Upcoming",
    color: "text-blue-700",
    bg: "bg-blue-100",
    icon: <Clock className="w-4 h-4" />,
  },
  overdue: {
    label: "Overdue",
    color: "text-red-700",
    bg: "bg-red-100",
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  escalating: {
    label: "Escalating",
    color: "text-violet-700",
    bg: "bg-violet-100",
    icon: <Mail className="w-4 h-4" />,
  },
  collections: {
    label: "Collections",
    color: "text-orange-700",
    bg: "bg-orange-100",
    icon: <XCircle className="w-4 h-4" />,
  },
};

const stageLabels = ["", "Day 1: Friendly Reminder", "Day 7: Firm Follow-Up", "Day 14: Final Notice", "Day 30: Collections Warning"];

interface Props {
  invoice: Invoice;
  onMarkPaid: (id: string) => void;
  onViewTemplate: (invoice: Invoice) => void;
}

export default function InvoiceCard({ invoice, onMarkPaid, onViewTemplate }: Props) {
  const cfg = statusConfig[invoice.status];
  const dueDate = new Date(invoice.dueDate);
  const formatted = dueDate.toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className={`bg-white rounded-2xl border-2 p-5 transition-all hover:shadow-md ${
      invoice.status === "paid" ? "border-green-100" :
      invoice.status === "upcoming" ? "border-blue-100" :
      invoice.status === "overdue" ? "border-red-200" :
      invoice.status === "escalating" ? "border-violet-200" :
      "border-orange-200"
    }`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{invoice.clientName}</h3>
          <p className="text-xs text-gray-400 truncate">{invoice.invoiceNumber} · {invoice.description}</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color} whitespace-nowrap flex-shrink-0`}>
          {cfg.icon}
          {cfg.label}
        </span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="text-2xl font-bold text-gray-900">
          ${invoice.amount.toLocaleString()}
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">Due</div>
          <div className="text-sm font-medium text-gray-700">{formatted}</div>
        </div>
      </div>

      {invoice.daysOverdue && invoice.daysOverdue > 0 && (
        <div className="bg-red-50 text-red-700 text-xs font-medium px-3 py-1.5 rounded-lg mb-3">
          {invoice.daysOverdue} days overdue
          {invoice.escalationStage && invoice.escalationStage > 0 && (
            <span className="text-red-500 ml-2">· {stageLabels[invoice.escalationStage]}</span>
          )}
        </div>
      )}

      {invoice.lastContactedDate && invoice.status !== "paid" && (
        <div className="text-xs text-gray-400 mb-3">
          Last contacted: {new Date(invoice.lastContactedDate).toLocaleDateString("en-CA", { month: "short", day: "numeric" })}
        </div>
      )}

      <div className="flex gap-2 mt-2">
        {invoice.status !== "paid" && (
          <button
            onClick={() => onMarkPaid(invoice.id)}
            className="flex-1 bg-green-50 text-green-700 hover:bg-green-100 text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            ✓ Mark Paid
          </button>
        )}
        {(invoice.status === "overdue" || invoice.status === "escalating" || invoice.status === "collections") && (
          <button
            onClick={() => onViewTemplate(invoice)}
            className="flex-1 bg-violet-50 text-violet-700 hover:bg-violet-100 text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            📧 Preview Email
          </button>
        )}
      </div>
    </div>
  );
}
