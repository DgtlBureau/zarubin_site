'use client';

import Link from 'next/link';
import {
  CheckCircle,
  FileText,
  Shield,
  Clock,
  ArrowRight,
  AlertTriangle,
  Lock,
  Users,
  BookOpen,
  Zap,
  Calendar,
} from 'lucide-react';

export default function RegfoLandingPage() {
  return (
    <div className="text-regfo-dark">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full typo-body-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            100% Free - No Email Required
          </div>

          <h1 className="typo-h1 text-[32px] md:text-[40px] lg:text-[48px] text-regfo-dark mb-6 leading-tight">
            Know Your{' '}
            <span className="text-regfo-secondary">SOC 2 & GDPR</span> Gaps in 2
            Minutes
          </h1>

          <p className="typo-body-lg text-slate-600 mb-8 leading-relaxed">
            Start with 5 quick questions to get your preview score and audit
            timeline estimate. Then complete the full 20-question assessment for
            detailed gap analysis and PDF report.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/regfo/assessment"
              className="w-full sm:w-auto bg-regfo-primary text-white px-8 py-4 rounded-lg font-semibold typo-body-lg hover:bg-regfo-primary/90 transition flex items-center justify-center gap-2 shadow-lg shadow-regfo-primary/25"
            >
              Get Your Compliance Score
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 text-slate-500">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="typo-body">Preview score in 2 min</span>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="typo-body-sm">5 quick questions first</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="typo-body-sm">Days-to-audit estimate</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-500" />
              <span className="typo-body-sm">Full PDF report available</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Stage Flow Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="typo-h2 text-center text-regfo-dark mb-3">
            Two-Stage Assessment
          </h2>
          <p className="typo-body text-slate-600 text-center mb-10 max-w-2xl mx-auto">
            Get value fast with our quick assessment, then dive deep for the
            full picture
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Stage 1 */}
            <div className="bg-gradient-to-br from-slate-50 to-yellow-50 rounded-xl border border-slate-200 p-6 relative overflow-hidden regfo-card-hover">
              <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-3 py-1 text-xs font-bold rounded-bl-lg">
                QUICK
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="typo-h3 text-regfo-dark mb-2">
                Stage 1: Quick Assessment
              </h3>
              <p className="typo-body text-slate-600 mb-4">
                5 high-impact questions covering the most critical compliance
                areas.
              </p>
              <ul className="space-y-2 typo-body-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Preview compliance score
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Days-to-audit estimate
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Category breakdown preview
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />2 minutes
                </li>
              </ul>
            </div>

            {/* Stage 2 */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200 p-6 relative overflow-hidden regfo-card-hover">
              <div className="absolute top-0 right-0 bg-regfo-primary text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                FULL
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="typo-h3 text-regfo-dark mb-2">
                Stage 2: Full Assessment
              </h3>
              <p className="typo-body text-slate-600 mb-4">
                20 additional questions for comprehensive gap analysis.
              </p>
              <ul className="space-y-2 typo-body-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Detailed gap analysis
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Specific remediation steps
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Downloadable PDF report
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />5 more minutes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section - Bento Grid Style */}
      <section className="py-12" id="features">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="typo-h2 text-center text-regfo-dark mb-3">
            What Your Assessment Covers
          </h2>
          <p className="typo-body text-slate-600 text-center mb-10 max-w-2xl mx-auto">
            25 questions across 5 compliance domains - mapped to actual audit
            requirements
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Shield,
                title: 'Security Controls',
                description:
                  'Encryption, firewalls, vulnerability scanning, network segmentation',
                regulation: 'SOC 2 CC6',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: Lock,
                title: 'Access Management',
                description:
                  'MFA implementation, role-based access, provisioning workflows, reviews',
                regulation: 'SOC 2 CC6.1-6.3',
                color: 'from-purple-500 to-purple-600',
              },
              {
                icon: AlertTriangle,
                title: 'Monitoring & Incident',
                description:
                  'SIEM, logging, breach notification, incident response procedures',
                regulation: 'SOC 2 CC7 / GDPR Art 33',
                color: 'from-orange-500 to-orange-600',
              },
              {
                icon: FileText,
                title: 'Data Protection',
                description:
                  'Data minimization, retention policies, backup testing, DPAs',
                regulation: 'GDPR Art 5, 28, 32',
                color: 'from-green-500 to-green-600',
              },
              {
                icon: BookOpen,
                title: 'Governance & Privacy',
                description:
                  'Security policies, training, DPO, lawful basis, data subject rights',
                regulation: 'SOC 2 CC1 / GDPR Art 6, 37',
                color: 'from-indigo-500 to-indigo-600',
              },
              {
                icon: Users,
                title: 'Days to Audit',
                description:
                  'Get an estimated timeline to reach audit readiness based on your current state',
                regulation: 'Instant Estimate',
                color: 'from-cyan-500 to-cyan-600',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-5 regfo-card-hover border border-slate-200 hover:border-slate-300 transition-all"
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="typo-h4 text-regfo-dark mb-2">
                  {feature.title}
                </h3>
                <p className="typo-body-sm text-slate-600 mb-3">
                  {feature.description}
                </p>
                <span className="typo-caption font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">
                  {feature.regulation}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-12" id="how-it-works">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="typo-h2 text-center text-regfo-dark mb-10">
            How It Works
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                step: '1',
                title: 'Quick Start',
                description:
                  'Answer 5 high-impact questions about your security posture.',
              },
              {
                step: '2',
                title: 'Preview Results',
                description:
                  'See your score, category breakdown, and days-to-audit estimate.',
              },
              {
                step: '3',
                title: 'Go Deeper',
                description:
                  'Complete 20 more questions for comprehensive analysis.',
              },
              {
                step: '4',
                title: 'Get Your Report',
                description:
                  'Download PDF with gaps ranked by risk and remediation steps.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-regfo-primary to-regfo-secondary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="typo-h5 text-regfo-dark mb-1">
                  {item.title}
                </h3>
                <p className="typo-caption text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/regfo/assessment"
              className="inline-flex items-center gap-2 bg-regfo-primary text-white px-8 py-4 rounded-lg font-semibold typo-body-lg hover:bg-regfo-primary/90 transition shadow-lg shadow-regfo-primary/25"
            >
              Start Quick Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Risk Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="typo-h2 text-white mb-3">
            Lost a deal because you weren&apos;t SOC 2 certified?
          </h2>
          <p className="typo-body text-white/90 mb-6">
            Enterprise buyers require SOC 2 before signing. GDPR regulators
            don&apos;t accept &quot;we&apos;re working on it.&quot; Find your
            gaps now - before a prospect asks for your audit report or a regulator
            asks for your DPA.
          </p>
          <Link
            href="/regfo/assessment"
            className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition"
          >
            Find Your Gaps Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
