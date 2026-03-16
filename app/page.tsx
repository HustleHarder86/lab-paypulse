"use client";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle, ArrowRight, Zap, Shield, Clock, TrendingUp, Mail, ChevronDown } from "lucide-react";

const steps = [
  {
    icon: "📄",
    title: "Add Your Invoice",
    desc: "Enter client details, amount, and due date. Takes 30 seconds.",
  },
  {
    icon: "⚙️",
    title: "Set Escalation Rules",
    desc: "Choose your escalation sequence — we have pre-built templates ready to go.",
  },
  {
    icon: "💸",
    title: "Get Paid Automatically",
    desc: "PayPulse sends increasingly firm reminders on your behalf. You focus on work.",
  },
];

const testimonials = [
  {
    name: "Sarah K.",
    role: "Freelance Designer",
    quote: "I used to spend hours chasing invoices. Now I just set it and get paid. Recovered $4,200 in my first month.",
    avatar: "SK",
  },
  {
    name: "Marcus T.",
    role: "Web Developer",
    quote: "The escalation sequence feels professional but firm. Clients actually pay faster now — they know I'm serious.",
    avatar: "MT",
  },
  {
    name: "Jenna P.",
    role: "Copywriter",
    quote: "Worth every penny at $15/mo. I got paid a 90-day-overdue invoice within 3 days of using PayPulse.",
    avatar: "JP",
  },
];

const faqs = [
  {
    q: "Do I need to sign up to try it?",
    a: "Nope! Hit 'Try the Demo' and explore the full dashboard with sample invoices — no account needed.",
  },
  {
    q: "Will clients know I'm using software?",
    a: "Emails come from your address and look completely human-written. Your clients will never know.",
  },
  {
    q: "What happens after the collections warning?",
    a: "We flag the invoice and provide you with a summary to send to a collections agency or small claims court.",
  },
  {
    q: "Can I customize the email templates?",
    a: "Yes — our pre-built templates are just a starting point. Edit tone, add your terms, personalize every message.",
  },
];

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">PayPulse</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm">How It Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm">Pricing</a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900 text-sm">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Sign In</Link>
            <Link
              href="/dashboard"
              className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
            >
              Try Free Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></span>
            2,400+ freelancers recovered $2.1M in late payments
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Stop Chasing Late Payments.{" "}
            <span className="text-violet-600">Let PayPulse Do It.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Automated invoice escalation that sends increasingly firm reminders on your behalf.
            From friendly nudge to collections warning — all on autopilot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-violet-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 pulse-glow"
            >
              Try the Demo — No Signup
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold border border-gray-200 hover:border-violet-300 hover:text-violet-600 transition-all"
            >
              See How It Works
            </a>
          </div>

          {/* Social proof numbers */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div>
              <div className="text-3xl font-bold text-gray-900">87%</div>
              <div className="text-sm text-gray-500 mt-1">of overdue invoices collected</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">14 days</div>
              <div className="text-sm text-gray-500 mt-1">avg time to payment</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">$0</div>
              <div className="text-sm text-gray-500 mt-1">time spent chasing</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Set it up in 2 minutes</h2>
            <p className="text-lg text-gray-600">Three steps to never chase a payment again.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="text-center p-8 rounded-2xl border border-gray-100 hover:border-violet-200 hover:shadow-lg transition-all group"
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Escalation sequence visual */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Escalation Sequence</h2>
            <p className="text-lg text-gray-600">Professionally written. Automatically sent. Increasingly impossible to ignore.</p>
          </div>
          <div className="space-y-4">
            {[
              { day: "Day 1", label: "Friendly Reminder", color: "bg-green-100 border-green-200 text-green-700", icon: "😊", desc: "A warm nudge — assumes positive intent. Most clients pay here." },
              { day: "Day 7", label: "Firm Follow-Up", color: "bg-yellow-100 border-yellow-200 text-yellow-700", icon: "📋", desc: "Polite but direct. References the missed payment clearly." },
              { day: "Day 14", label: "Final Notice + Late Fee Warning", color: "bg-orange-100 border-orange-200 text-orange-700", icon: "⚠️", desc: "Formal tone. Late fee clause activated. Creates urgency." },
              { day: "Day 30", label: "Collections Warning", color: "bg-red-100 border-red-200 text-red-700", icon: "⚖️", desc: "Final opportunity before referral to collections agency." },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-4 p-5 rounded-xl border ${item.color} animate-fadeIn`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-2xl">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-gray-900">{item.day}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.color}`}>{item.label}</span>
                  </div>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/templates" className="inline-flex items-center gap-2 text-violet-600 font-semibold hover:underline">
              Preview all templates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need. Nothing you don&apos;t.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Clock className="w-5 h-5" />, title: "Automatic Timing", desc: "Emails go out exactly when they should — day 1, 7, 14, and 30. Never too early, never too late." },
              { icon: <Mail className="w-5 h-5" />, title: "Sends From Your Email", desc: "Clients see emails from you, not from us. Maintain your professional relationships." },
              { icon: <Shield className="w-5 h-5" />, title: "Template Customization", desc: "Edit every template to match your voice. Keep it professional or make it personal." },
              { icon: <TrendingUp className="w-5 h-5" />, title: "Payment Tracking", desc: "See every invoice status at a glance. Color-coded dashboard shows what needs attention." },
              { icon: <CheckCircle className="w-5 h-5" />, title: "Preview Before Sending", desc: "See exactly what your client will receive before each email goes out. Stay in control." },
              { icon: <Zap className="w-5 h-5" />, title: "Instant Setup", desc: "Add an invoice in 30 seconds. No integration required. No invoicing software needed." },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 hover:border-violet-200 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-violet-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Freelancers love PayPulse</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, flat pricing</h2>
          <p className="text-lg text-gray-600 mb-12">One invoice recovered pays for a year of PayPulse.</p>
          <div className="bg-gradient-to-br from-violet-600 to-violet-800 rounded-3xl p-1">
            <div className="bg-white rounded-[20px] p-10">
              <div className="text-violet-600 font-semibold mb-2">Everything included</div>
              <div className="text-7xl font-bold text-gray-900 mb-2">$15</div>
              <div className="text-gray-500 mb-8">per month</div>
              <ul className="space-y-3 text-left max-w-sm mx-auto mb-8">
                {[
                  "Unlimited invoices",
                  "All 4 escalation templates",
                  "Full template customization",
                  "Email preview before sending",
                  "Payment status tracking",
                  "Invoice history & reporting",
                  "Cancel anytime",
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className="inline-block w-full bg-violet-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-violet-700 transition-colors"
              >
                Start Free — Try Demo Now
              </Link>
              <p className="text-gray-400 text-sm mt-4">No credit card required to try the demo</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Questions & Answers</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-violet-600 to-violet-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to stop chasing?</h2>
          <p className="text-violet-200 text-lg mb-8">Try the demo — no signup, no credit card. See it working in 60 seconds.</p>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="bg-white text-violet-700 px-6 py-3 rounded-xl font-semibold hover:bg-violet-50 transition-colors whitespace-nowrap"
              >
                Get Early Access
              </button>
            </form>
          ) : (
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 mb-6 max-w-md mx-auto text-white">
              ✅ You&apos;re on the list! We&apos;ll be in touch soon.
            </div>
          )}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-violet-200 hover:text-white font-medium underline underline-offset-4"
          >
            Or try the demo right now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-white">PayPulse</span>
          </div>
          <p className="text-gray-500 text-sm">© 2025 PayPulse. Built for freelancers who deserve to get paid.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300">Privacy</a>
            <a href="#" className="hover:text-gray-300">Terms</a>
            <a href="mailto:hello@paypulse.co" className="hover:text-gray-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
