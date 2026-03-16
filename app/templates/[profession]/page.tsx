import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { professions, getProfession } from "@/lib/professions";
import PrintButton from "@/components/PrintButton";

export async function generateStaticParams() {
  return professions.map((p) => ({ profession: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ profession: string }>;
}): Promise<Metadata> {
  const { profession: slug } = await params;
  const prof = getProfession(slug);
  if (!prof) return { title: "Not Found" };

  return {
    title: `Free Invoice Template for ${prof.plural} — Download & Customize`,
    description: `Professional invoice template designed for ${prof.plural.toLowerCase()}. Includes industry-standard line items, payment terms, and late fee language. Download free.`,
    openGraph: {
      title: `Free Invoice Template for ${prof.plural}`,
      description: `Download a free, professional invoice template built specifically for ${prof.plural.toLowerCase()}. Customizable line items, payment terms, and more.`,
    },
  };
}

export default async function ProfessionTemplatePage({
  params,
}: {
  params: Promise<{ profession: string }>;
}) {
  const { profession: slug } = await params;
  const prof = getProfession(slug);
  if (!prof) notFound();

  const today = new Date();
  const dueDate = new Date(today);
  if (prof.paymentTerms === "Net 14") dueDate.setDate(today.getDate() + 14);
  else if (prof.paymentTerms === "Net 7") dueDate.setDate(today.getDate() + 7);
  else dueDate.setDate(today.getDate() + 7);

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <span className="text-2xl">⚡</span> PayPulse
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/templates" className="text-gray-600 hover:text-gray-900">
              All Templates
            </Link>
            <Link
              href="/"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Get Paid Faster →
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/templates" className="hover:text-indigo-600">
              Invoice Templates
            </Link>
            <span>/</span>
            <span>{prof.name}</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {prof.emoji} Free Invoice Template for {prof.plural}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            A professional, ready-to-use invoice template built specifically for{" "}
            {prof.plural.toLowerCase()}. Includes industry-standard line items, payment terms, and
            late fee language.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Invoice Template */}
          <div className="lg:col-span-2">
            <div
              id="invoice-template"
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              {/* Invoice header */}
              <div className="bg-indigo-600 text-white p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">INVOICE</h2>
                    <p className="text-indigo-200 mt-1 text-sm">#{prof.slug.substring(0, 3).toUpperCase()}-2024-001</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">Your Business Name</p>
                    <p className="text-indigo-200 text-sm mt-1">your@email.com</p>
                    <p className="text-indigo-200 text-sm">+1 (555) 000-0000</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Bill to + dates */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Bill To
                    </p>
                    <p className="font-semibold text-gray-900">Client Name</p>
                    <p className="text-gray-600 text-sm">Client Company</p>
                    <p className="text-gray-600 text-sm">client@email.com</p>
                  </div>
                  <div className="text-right">
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Invoice Date
                      </p>
                      <p className="text-gray-900 font-medium">{fmt(today)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Due Date
                      </p>
                      <p className="text-gray-900 font-medium">{fmt(dueDate)}</p>
                    </div>
                    <div className="mt-2">
                      <span className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2 py-1 rounded">
                        {prof.paymentTerms}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Line items */}
                <table className="w-full mb-6">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">
                        Description
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">
                        Unit
                      </th>
                      <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">
                        Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {prof.lineItems.map((item, i) => (
                      <tr key={i}>
                        <td className="py-3 text-gray-800 text-sm">{item.description}</td>
                        <td className="py-3 text-center text-gray-500 text-sm">{item.unit}</td>
                        <td className="py-3 text-right text-gray-900 font-medium text-sm">
                          {item.rate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totals */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-end">
                    <div className="w-56">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Subtotal</span>
                        <span>$____.__</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-3">
                        <span>Tax (if applicable)</span>
                        <span>$____.__</span>
                      </div>
                      <div className="flex justify-between font-bold text-gray-900 text-lg border-t border-gray-200 pt-3">
                        <span>Total Due</span>
                        <span>$____.__</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment terms */}
                <div className="mt-8 bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Payment Terms & Notes
                  </p>
                  <p className="text-sm text-gray-700">{prof.lateFeeNote}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Payment accepted via bank transfer, PayPal, or credit card. Please include
                    invoice number in payment reference.
                  </p>
                </div>
              </div>
            </div>

            {/* Print button */}
            <div className="mt-6 flex gap-4">
              <PrintButton />
              <Link
                href="/"
                className="flex-1 bg-white border-2 border-indigo-600 text-indigo-600 py-3 px-6 rounded-xl font-semibold hover:bg-indigo-50 transition text-center"
              >
                ⚡ Automate Follow-ups
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Average rates */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                📊 Average {prof.name} Rates
              </h3>
              <div className="space-y-3">
                {prof.avgRates.map((rate, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{rate.label}</span>
                    <span className="text-sm font-semibold text-gray-900 bg-green-50 text-green-700 px-2 py-1 rounded">
                      {rate.range}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment norms */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-3">💡 Payment Tips for {prof.plural}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{prof.paymentNorm}</p>
            </div>

            {/* PayPulse CTA */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-xl mb-2">😤 Tired of chasing late payments?</h3>
              <p className="text-indigo-100 text-sm mb-4">
                PayPulse auto-follows up so you don&apos;t have to. Set it once, get paid on time — every
                time.
              </p>
              <ul className="text-sm text-indigo-100 space-y-2 mb-5">
                <li>✅ Automatic reminder sequences</li>
                <li>✅ Escalating urgency on autopilot</li>
                <li>✅ Professional tone, every message</li>
                <li>✅ Average 3x faster payment</li>
              </ul>
              <Link
                href="/"
                className="block bg-white text-indigo-700 text-center py-3 px-4 rounded-xl font-bold hover:bg-indigo-50 transition text-sm"
              >
                Try PayPulse Free →
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ / guide section */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Invoice Guide for {prof.plural}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">📄 What to include on your invoice</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ Your name/business name and contact info</li>
                <li>✓ Client name, company, and billing address</li>
                <li>✓ Unique invoice number for tracking</li>
                <li>✓ Invoice date and payment due date</li>
                <li>✓ Itemized list of services with rates</li>
                <li>✓ Payment terms and late fee policy</li>
                <li>✓ Accepted payment methods</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">⏱️ Getting paid faster</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ Send invoices immediately — don&apos;t wait</li>
                <li>✓ Always include a clear due date</li>
                <li>✓ Specify late fees upfront (in your contract)</li>
                <li>✓ Follow up at 7 days if unpaid</li>
                <li>✓ Send a firm reminder at 14 days</li>
                <li>✓ Escalate professionally at 21+ days</li>
                <li>✓ Use PayPulse to automate all of this</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Browse other templates */}
        <div className="mt-8 text-center">
          <Link
            href="/templates"
            className="inline-block text-indigo-600 hover:text-indigo-800 font-medium text-sm"
          >
            ← Browse all 25 profession invoice templates
          </Link>
        </div>
      </div>

      <style>{`
        @media print {
          nav, button { display: none !important; }
          #invoice-template { box-shadow: none !important; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
}
