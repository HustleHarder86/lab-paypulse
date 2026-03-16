import { Metadata } from "next";
import Link from "next/link";
import { professions } from "@/lib/professions";

export const metadata: Metadata = {
  title: "Free Invoice Templates by Profession — PayPulse",
  description:
    "Download free, professional invoice templates for 25+ professions. Each template includes industry-standard line items, payment terms, and late fee language.",
  openGraph: {
    title: "Free Invoice Templates for Freelancers",
    description:
      "Professional invoice templates for graphic designers, developers, consultants, photographers, and 20+ more professions.",
  },
};

const categories = [
  "Creative",
  "Tech",
  "Professional Services",
  "Trades & Other",
];

export default function TemplatesIndexPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <span className="text-2xl">⚡</span> PayPulse
          </Link>
          <Link
            href="/"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition text-sm"
          >
            Get Paid Faster →
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free Invoice Templates for Freelancers
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional, ready-to-use invoice templates built for your profession. Download,
            customize, and get paid.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
            <span>⚡</span>
            <span>25 profession-specific templates — always free</span>
          </div>
        </div>

        {/* Categories */}
        {categories.map((category) => {
          const categoryProfessions = professions.filter((p) => p.category === category);
          return (
            <div key={category} className="mb-12">
              <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                {category === "Creative" && "🎨"}
                {category === "Tech" && "💻"}
                {category === "Professional Services" && "💼"}
                {category === "Trades & Other" && "🔧"}
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryProfessions.map((prof) => (
                  <Link
                    key={prof.slug}
                    href={`/templates/${prof.slug}`}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-400 hover:shadow-md transition group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{prof.emoji}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                          {prof.name}
                        </h3>
                        <p className="text-xs text-gray-500">{prof.paymentTerms}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {prof.lineItems
                        .slice(0, 2)
                        .map((li) => li.description)
                        .join(" · ")}
                    </p>
                    <div className="mt-3 text-xs font-medium text-indigo-600 group-hover:text-indigo-700">
                      View template →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* CTA */}
        <div className="mt-8 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-3">Stop chasing late payments</h2>
          <p className="text-indigo-100 text-lg mb-6 max-w-xl mx-auto">
            PayPulse automatically follows up on unpaid invoices with professional, escalating
            reminders — so you can focus on your work.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-indigo-700 py-3 px-8 rounded-xl font-bold text-lg hover:bg-indigo-50 transition"
          >
            Try PayPulse Free →
          </Link>
          <p className="text-indigo-200 text-sm mt-4">No credit card required</p>
        </div>
      </div>
    </div>
  );
}
