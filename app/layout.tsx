import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PayPulse — Stop Chasing Late Payments",
  description: "Automated invoice escalation for freelancers. Set it, forget it, get paid.",
  openGraph: {
    title: "PayPulse — Stop Chasing Late Payments",
    description: "Automated invoice escalation for freelancers.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
