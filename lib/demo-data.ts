import { Invoice, EscalationTemplate } from "./types";

export const demoInvoices: Invoice[] = [
  {
    id: "inv-001",
    clientName: "Bright Creative Agency",
    clientEmail: "billing@brightcreative.com",
    amount: 3200,
    dueDate: "2025-01-28",
    status: "paid",
    invoiceNumber: "INV-2025-001",
    description: "Brand redesign + logo package",
    escalationStage: 0,
    lastContactedDate: "2025-01-28",
  },
  {
    id: "inv-002",
    clientName: "TechFlow Solutions",
    clientEmail: "accounts@techflow.io",
    amount: 5500,
    dueDate: "2025-02-05",
    status: "escalating",
    invoiceNumber: "INV-2025-002",
    description: "Website development — Phase 2",
    daysOverdue: 16,
    escalationStage: 3,
    lastContactedDate: "2025-02-19",
  },
  {
    id: "inv-003",
    clientName: "Maple Street Bakery",
    clientEmail: "hello@maplestreetbakery.ca",
    amount: 850,
    dueDate: "2025-02-15",
    status: "overdue",
    invoiceNumber: "INV-2025-003",
    description: "Social media content package — February",
    daysOverdue: 6,
    escalationStage: 1,
    lastContactedDate: "2025-02-16",
  },
  {
    id: "inv-004",
    clientName: "NorthStar Consulting",
    clientEmail: "finance@northstarconsulting.com",
    amount: 12000,
    dueDate: "2025-02-20",
    status: "upcoming",
    invoiceNumber: "INV-2025-004",
    description: "Strategic UX audit + report",
    escalationStage: 0,
  },
  {
    id: "inv-005",
    clientName: "Pixel & Co.",
    clientEmail: "pay@pixelandco.studio",
    amount: 1800,
    dueDate: "2025-01-15",
    status: "collections",
    invoiceNumber: "INV-2024-098",
    description: "Motion graphics — product launch video",
    daysOverdue: 36,
    escalationStage: 4,
    lastContactedDate: "2025-02-14",
  },
  {
    id: "inv-006",
    clientName: "Greenfield Properties",
    clientEmail: "admin@greenfieldprops.com",
    amount: 4200,
    dueDate: "2025-02-22",
    status: "upcoming",
    invoiceNumber: "INV-2025-005",
    description: "Photography — Q1 listings package",
    escalationStage: 0,
  },
];

export const escalationTemplates: EscalationTemplate[] = [
  {
    id: "tpl-1",
    stage: 1,
    daysTrigger: 1,
    name: "Friendly Reminder",
    tone: "friendly",
    subject: "Quick reminder: Invoice {{invoiceNumber}} was due yesterday",
    body: `Hi {{clientName}},

I hope you're having a great week!

Just a friendly reminder that invoice {{invoiceNumber}} for {{amount}} was due on {{dueDate}}.

If you've already sent payment, please disregard this message — it may have crossed in the mail. If not, you can pay via the link below.

[Pay Invoice Now →]

Thanks so much, and let me know if you have any questions!

Warm regards,
{{senderName}}`,
  },
  {
    id: "tpl-2",
    stage: 2,
    daysTrigger: 7,
    name: "Firm Follow-Up",
    tone: "firm",
    subject: "Invoice {{invoiceNumber}} — 7 days overdue (action required)",
    body: `Hi {{clientName}},

I'm following up on invoice {{invoiceNumber}} for {{amount}}, which is now 7 days past due.

I haven't received payment or a response to my previous message. Could you let me know when we can expect payment, or if there's an issue I can help resolve?

[Pay Invoice Now →]

If payment has already been sent, please send me the confirmation so I can update my records.

I'd appreciate hearing from you by end of day {{followUpDate}}.

Thank you,
{{senderName}}`,
  },
  {
    id: "tpl-3",
    stage: 3,
    daysTrigger: 14,
    name: "Final Notice",
    tone: "urgent",
    subject: "FINAL NOTICE: Invoice {{invoiceNumber}} — 14 days overdue",
    body: `Hi {{clientName}},

This is a final notice regarding invoice {{invoiceNumber}} for {{amount}}, now 14 days overdue.

As stated in our agreement, late payments are subject to a {{lateFeePercent}}% monthly late fee. If payment is not received within 5 business days, a late fee of {{lateFeeAmount}} will be added to your outstanding balance.

[Pay Invoice Now — Due Immediately →]

If there is a dispute regarding this invoice, please contact me immediately so we can resolve it.

This is my final notice before escalating to a collections agency.

{{senderName}}`,
  },
  {
    id: "tpl-4",
    stage: 4,
    daysTrigger: 30,
    name: "Collections Warning",
    tone: "final",
    subject: "Invoice {{invoiceNumber}} — Collections referral in 72 hours",
    body: `Dear {{clientName}},

Despite multiple attempts to collect payment on invoice {{invoiceNumber}} for {{amount}} (now 30 days overdue), I have not received payment or satisfactory communication from you.

This is formal notice that if payment is not received in full within 72 hours, I will be referring this matter to a collections agency and may pursue legal remedies available under Ontario law.

[Pay Immediately — Final Opportunity →]

Total Amount Due (including late fees): {{totalWithFees}}

To avoid collections action, payment must be received by: {{collectionsDeadline}}

{{senderName}}
{{senderContact}}`,
  },
];
