"use client";
import { Invoice } from "@/lib/types";
import { escalationTemplates } from "@/lib/demo-data";
import { X, Send } from "lucide-react";

interface Props {
  invoice: Invoice;
  onClose: () => void;
}

function fillTemplate(template: string, invoice: Invoice): string {
  const lateFeeAmount = (invoice.amount * 0.015).toFixed(2);
  const followUpDate = new Date();
  followUpDate.setDate(followUpDate.getDate() + 2);
  const collectionsDeadline = new Date();
  collectionsDeadline.setDate(collectionsDeadline.getDate() + 3);

  return template
    .replace(/{{clientName}}/g, invoice.clientName)
    .replace(/{{invoiceNumber}}/g, invoice.invoiceNumber)
    .replace(/{{amount}}/g, `$${invoice.amount.toLocaleString()}`)
    .replace(/{{dueDate}}/g, new Date(invoice.dueDate).toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" }))
    .replace(/{{lateFeePercent}}/g, "1.5")
    .replace(/{{lateFeeAmount}}/g, `$${lateFeeAmount}`)
    .replace(/{{totalWithFees}}/g, `$${(invoice.amount * 1.015).toFixed(2)}`)
    .replace(/{{followUpDate}}/g, followUpDate.toLocaleDateString("en-CA", { month: "long", day: "numeric" }))
    .replace(/{{collectionsDeadline}}/g, collectionsDeadline.toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" }))
    .replace(/{{senderName}}/g, "Alex Johnson")
    .replace(/{{senderContact}}/g, "alex@alexjohnsondesign.com | (416) 555-0192");
}

const toneColors: Record<string, string> = {
  friendly: "bg-green-100 text-green-700",
  firm: "bg-yellow-100 text-yellow-700",
  urgent: "bg-orange-100 text-orange-700",
  final: "bg-red-100 text-red-700",
};

export default function EmailPreviewModal({ invoice, onClose }: Props) {
  const stage = invoice.escalationStage || 1;
  const template = escalationTemplates.find((t) => t.stage === stage) || escalationTemplates[0];
  const allTemplates = escalationTemplates;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-fadeIn flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Email Preview</h2>
            <p className="text-sm text-gray-500 mt-0.5">{invoice.clientName} · {invoice.invoiceNumber}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Stage tabs */}
        <div className="flex gap-2 px-6 py-3 bg-gray-50 border-b border-gray-100 overflow-x-auto">
          {allTemplates.map((t) => (
            <div
              key={t.id}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                t.stage === stage
                  ? `${toneColors[t.tone]} ring-2 ring-offset-1 ring-current`
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              Day {t.daysTrigger}: {t.name}
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Current stage badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 ${toneColors[template.tone]}`}>
            📬 Currently scheduled: {template.name}
          </div>

          {/* Email mock */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 space-y-1">
              <div className="flex gap-2 text-sm">
                <span className="text-gray-400 w-12">From:</span>
                <span className="text-gray-700">alex@alexjohnsondesign.com</span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-gray-400 w-12">To:</span>
                <span className="text-gray-700">{invoice.clientEmail}</span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-gray-400 w-12">Subject:</span>
                <span className="text-gray-900 font-medium">{fillTemplate(template.subject, invoice)}</span>
              </div>
            </div>
            <div className="p-6">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                {fillTemplate(template.body, invoice)}
              </pre>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Close
          </button>
          <button className="flex-1 py-3 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
            <Send className="w-4 h-4" />
            Send Now (Demo)
          </button>
        </div>
      </div>
    </div>
  );
}
