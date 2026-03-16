export type InvoiceStatus = "paid" | "upcoming" | "overdue" | "escalating" | "collections";

export interface Invoice {
  id: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  dueDate: string; // ISO date string
  status: InvoiceStatus;
  invoiceNumber: string;
  description: string;
  daysOverdue?: number;
  escalationStage?: 0 | 1 | 2 | 3 | 4; // 0=none, 1=day1, 2=day7, 3=day14, 4=day30
  lastContactedDate?: string;
}

export interface EscalationTemplate {
  id: string;
  stage: number;
  daysTrigger: number;
  name: string;
  subject: string;
  body: string;
  tone: "friendly" | "firm" | "urgent" | "final";
}
