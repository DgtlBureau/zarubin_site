'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  XCircle,
  Shield,
  Lock,
  BookOpen,
  Bell,
  Database,
  ExternalLink,
  TrendingUp,
  Calendar,
  Zap,
  ArrowRight,
  Send,
} from 'lucide-react';
import { AssessmentResult, CategoryScore, Gap } from '@/src/lib/regfo/scoring';
import { sendEmail } from '@/src/utils/sendEmail';

// Icon mapping
const categoryIcons: Record<string, React.ElementType> = {
  'security-controls': Shield,
  'access-management': Lock,
  'monitoring-incident': Bell,
  'data-protection': Database,
  governance: BookOpen,
};

// Risk level icons
const riskIcons = {
  low: CheckCircle,
  medium: AlertTriangle,
  high: AlertCircle,
  critical: XCircle,
};

// Score Gauge Component
const ScoreGauge = ({ score }: { score: number }) => {
  const size = 180;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const center = size / 2;

  const getColor = (s: number) => {
    if (s >= 80) return '#22c55e';
    if (s >= 60) return '#eab308';
    if (s >= 40) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="regfo-score-gauge"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-regfo-dark">{score}%</span>
        <span className="text-sm text-slate-500">Compliance</span>
      </div>
    </div>
  );
};

// Category Bar Component
const CategoryBar = ({ category }: { category: CategoryScore }) => {
  const Icon = categoryIcons[category.categoryId] || CheckCircle;

  const getBarColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-slate-600" />
          <span className="typo-body font-medium text-slate-800">
            {category.categoryName}
          </span>
        </div>
        <span className="typo-body font-semibold text-slate-700">
          {category.percentage}%
        </span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getBarColor(category.percentage)} rounded-full transition-all duration-1000`}
          style={{ width: `${category.percentage}%` }}
        />
      </div>
      {category.gaps.length > 0 && (
        <p className="typo-caption text-slate-500 mt-2">
          {category.gaps.length} gap{category.gaps.length > 1 ? 's' : ''}{' '}
          identified
        </p>
      )}
    </div>
  );
};

// Gap Card Component
const GapCard = ({ gap, index }: { gap: Gap; index: number }) => {
  const RiskIcon = riskIcons[gap.riskLevel];

  const riskColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    critical: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center typo-body-sm font-bold ${
            gap.priority === 1
              ? 'bg-red-500 text-white'
              : gap.priority === 2
                ? 'bg-orange-500 text-white'
                : 'bg-yellow-500 text-white'
          }`}
        >
          {index + 1}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="typo-caption font-mono text-slate-500">
              {gap.regulation}
            </span>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full typo-caption font-medium ${
                riskColors[gap.riskLevel]
              }`}
            >
              <RiskIcon className="w-3 h-3" />
              {gap.riskLevel.charAt(0).toUpperCase() + gap.riskLevel.slice(1)}
            </span>
          </div>
          <h4 className="typo-body font-medium text-slate-800 mb-1">{gap.question}</h4>
          <p className="typo-body-sm text-slate-500 mb-2">
            Current: {gap.currentAnswer}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="typo-body-sm text-blue-800">
              <strong>Recommendation:</strong> {gap.recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick Results Banner Component
const QuickResultsBanner = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Zap className="w-5 h-5 text-yellow-600" />
        </div>
        <div className="flex-1">
          <h3 className="typo-body font-semibold text-yellow-800">Quick Assessment Results</h3>
          <p className="typo-body-sm text-yellow-700">
            Complete the full 20-question assessment for detailed gap analysis and a downloadable PDF report.
          </p>
        </div>
        <Link
          href="/regfo/assessment"
          className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition whitespace-nowrap"
        >
          Continue Full Assessment
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

// Feedback Form Component
const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using existing integration
      await sendEmail(
        name,
        email,
        phone,
        `[SOC 2 Assessment Lead] ${message}`
      );

      // Also send to Telegram
      await fetch(
        'https://api.telegram.org/bot6992822983:AAHWVJuwqeVl5kscHuZwcPx5W-IPXJ7mpkk/sendMessage',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: '199942509',
            text: `[SOC 2 Assessment Lead]\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
          }),
        }
      );

      setSubmitted(true);
    } catch (error) {
      console.error('Error sending form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-regfo-primary to-regfo-secondary rounded-xl p-8 text-white text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="typo-h3 text-white mb-2">Thank you!</h3>
        <p className="typo-body text-white/80">
          We&apos;ll be in touch shortly with expert guidance on your compliance journey.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-regfo-primary to-regfo-secondary rounded-xl p-6 md:p-8 text-white">
      <div className="max-w-2xl mx-auto">
        <h3 className="typo-h2 text-white mb-2 text-center">
          Build Compliance-Ready Software with Expert Guidance
        </h3>
        <p className="typo-body text-white/80 mb-6 text-center">
          Our team helps fast-moving companies implement practical SOC 2 and GDPR compliance systems that scale with your business
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your compliance needs (e.g., We need SOC 2 Type II certification...)"
              rows={3}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-white text-regfo-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                Schedule a Free Consultation
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <p className="typo-caption text-white/60 text-center mt-4">
          Free consultation. No commitment required.
        </p>
      </div>
    </div>
  );
};

export default function ResultsPage() {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    // Load results from localStorage
    const storedResult = localStorage.getItem('complianceAssessmentResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, []);

  // Generate PDF using jspdf (lazy loaded for faster page load)
  const handleDownloadPdf = async () => {
    if (!result) return;
    setIsGeneratingPdf(true);

    try {
      // Dynamically import jsPDF to avoid blocking page load
      const { default: jsPDF } = await import('jspdf');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let yPosition = margin;

      // Helper function to add new page if needed
      const checkNewPage = (height: number) => {
        if (yPosition + height > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
          return true;
        }
        return false;
      };

      // Title
      pdf.setFontSize(24);
      pdf.setTextColor(30, 58, 95);
      pdf.text('SOC 2 & GDPR Compliance Report', margin, yPosition + 8);
      yPosition += 15;

      // Date
      pdf.setFontSize(10);
      pdf.setTextColor(100, 116, 139);
      pdf.text(`Assessment Date: ${new Date().toLocaleDateString()}`, margin, yPosition);
      yPosition += 10;

      // Quick assessment note if applicable
      if (result.isQuickAssessment) {
        pdf.setFillColor(254, 243, 199);
        pdf.roundedRect(margin, yPosition, pageWidth - 2 * margin, 10, 2, 2, 'F');
        pdf.setTextColor(146, 64, 14);
        pdf.setFontSize(9);
        pdf.text('Quick Assessment - Complete full assessment for detailed analysis', margin + 5, yPosition + 6);
        yPosition += 15;
      }

      // Score Box
      const scoreColor = result.overallScore >= 80 ? [34, 197, 94] :
                        result.overallScore >= 60 ? [234, 179, 8] : [239, 68, 68];

      pdf.setFillColor(241, 245, 249);
      pdf.roundedRect(margin, yPosition, pageWidth - 2 * margin, 35, 3, 3, 'F');

      pdf.setFontSize(36);
      pdf.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
      pdf.text(`${result.overallScore}%`, pageWidth / 2, yPosition + 18, { align: 'center' });

      pdf.setFontSize(12);
      pdf.setTextColor(71, 85, 105);
      pdf.text('Overall Compliance Score', pageWidth / 2, yPosition + 26, { align: 'center' });

      pdf.setFontSize(10);
      pdf.setTextColor(100, 116, 139);
      pdf.text(result.complianceStatus, pageWidth / 2, yPosition + 32, { align: 'center' });
      yPosition += 42;

      // Days to Audit
      pdf.setFillColor(239, 246, 255);
      pdf.roundedRect(margin, yPosition, pageWidth - 2 * margin, 18, 2, 2, 'F');
      pdf.setFontSize(18);
      pdf.setTextColor(30, 64, 175);
      pdf.text(`${result.daysToAudit} days`, pageWidth / 2, yPosition + 10, { align: 'center' });
      pdf.setFontSize(9);
      pdf.setTextColor(100, 116, 139);
      pdf.text('Estimated time to audit readiness', pageWidth / 2, yPosition + 15, { align: 'center' });
      yPosition += 25;

      // Category Breakdown
      checkNewPage(10);
      pdf.setFontSize(14);
      pdf.setTextColor(30, 58, 95);
      pdf.text('Category Breakdown', margin, yPosition);
      yPosition += 8;

      const nonZeroCategories = result.categoryScores.filter(cs => cs.maxScore > 0);
      for (const category of nonZeroCategories) {
        checkNewPage(12);
        pdf.setFillColor(248, 250, 252);
        pdf.roundedRect(margin, yPosition, pageWidth - 2 * margin, 10, 1, 1, 'F');

        pdf.setFontSize(10);
        pdf.setTextColor(51, 65, 85);
        pdf.text(category.categoryName, margin + 3, yPosition + 6);

        pdf.setTextColor(71, 85, 105);
        pdf.text(`${category.percentage}%`, pageWidth - margin - 15, yPosition + 6);

        if (category.gaps.length > 0) {
          pdf.setTextColor(239, 68, 68);
          pdf.setFontSize(8);
          pdf.text(`(${category.gaps.length} gaps)`, pageWidth - margin - 30, yPosition + 6);
        }
        yPosition += 12;
      }
      yPosition += 5;

      // Top Priority Gaps
      if (result.topGaps.length > 0) {
        checkNewPage(15);
        pdf.setFontSize(14);
        pdf.setTextColor(30, 58, 95);
        pdf.text('Top Priority Gaps', margin, yPosition);
        yPosition += 10;

        for (let i = 0; i < result.topGaps.length; i++) {
          const gap = result.topGaps[i];
          checkNewPage(35);

          const riskColor = gap.riskLevel === 'critical' ? [239, 68, 68] :
                           gap.riskLevel === 'high' ? [249, 115, 22] :
                           gap.riskLevel === 'medium' ? [234, 179, 8] : [34, 197, 94];

          pdf.setDrawColor(riskColor[0], riskColor[1], riskColor[2]);
          pdf.setFillColor(255, 255, 255);
          pdf.roundedRect(margin, yPosition, pageWidth - 2 * margin, 30, 2, 2, 'FD');

          pdf.setFontSize(10);
          pdf.setTextColor(51, 65, 85);
          const questionLines = pdf.splitTextToSize(`#${i + 1}: ${gap.question}`, pageWidth - 2 * margin - 10);
          pdf.text(questionLines[0], margin + 3, yPosition + 6);

          pdf.setFontSize(8);
          pdf.setTextColor(100, 116, 139);
          pdf.text(`${gap.regulation} | ${gap.riskLevel.toUpperCase()} RISK`, margin + 3, yPosition + 12);

          pdf.setTextColor(71, 85, 105);
          pdf.text(`Current: ${gap.currentAnswer}`, margin + 3, yPosition + 18);

          pdf.setFillColor(239, 246, 255);
          pdf.roundedRect(margin + 2, yPosition + 21, pageWidth - 2 * margin - 4, 7, 1, 1, 'F');
          pdf.setFontSize(7);
          pdf.setTextColor(30, 64, 175);
          const recText = pdf.splitTextToSize(`Rec: ${gap.recommendation}`, pageWidth - 2 * margin - 10);
          pdf.text(recText[0], margin + 4, yPosition + 26);

          yPosition += 33;
        }
      }
      yPosition += 5;

      // Next Steps
      checkNewPage(10 + result.recommendations.length * 8);
      pdf.setFontSize(14);
      pdf.setTextColor(30, 58, 95);
      pdf.text('Recommended Next Steps', margin, yPosition);
      yPosition += 8;

      for (let i = 0; i < result.recommendations.length; i++) {
        const rec = result.recommendations[i];
        const lines = pdf.splitTextToSize(`${i + 1}. ${rec}`, pageWidth - 2 * margin - 10);

        checkNewPage(lines.length * 5 + 3);
        pdf.setFontSize(9);
        pdf.setTextColor(71, 85, 105);
        pdf.text(lines, margin + 3, yPosition);
        yPosition += lines.length * 5 + 3;
      }

      // Footer
      yPosition = pageHeight - 15;
      pdf.setFontSize(8);
      pdf.setTextColor(100, 116, 139);
      pdf.text('Generated by BrightByte - Compliance Assessment Tool', pageWidth / 2, yPosition, { align: 'center' });
      pdf.text('thebrightbyte.com', pageWidth / 2, yPosition + 4, { align: 'center' });

      // Save the PDF
      const dateStr = new Date().toISOString().split('T')[0];
      pdf.save(`compliance-report-${dateStr}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to print dialog
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (!result) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-regfo-dark">
        <div className="text-center">
          <h1 className="typo-h2 text-slate-800 mb-4">
            No Assessment Results Found
          </h1>
          <p className="typo-body text-slate-600 mb-6">
            Please complete the assessment first.
          </p>
          <Link
            href="/regfo/assessment"
            className="inline-flex items-center gap-2 bg-regfo-primary text-white px-6 py-3 rounded-lg font-semibold"
          >
            Start Assessment
          </Link>
        </div>
      </div>
    );
  }

  const getRiskBadge = (riskLevel: string) => {
    const badges = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800',
    };
    return badges[riskLevel as keyof typeof badges];
  };

  // Filter out categories with no questions (maxScore = 0)
  const nonZeroCategories = result.categoryScores.filter((cs) => cs.maxScore > 0);

  return (
    <div className="text-regfo-dark">
      {/* Sub-header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 regfo-no-print">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/regfo"
            className="flex items-center gap-2 text-slate-600 hover:text-regfo-primary typo-body-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </Link>

          <span className="typo-h4 text-regfo-primary">Assessment Results</span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex items-center gap-2 bg-regfo-primary text-white px-4 py-2 rounded-lg hover:bg-regfo-primary/90 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isGeneratingPdf ? 'Generating...' : 'Download PDF'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8" id="report-content">
        {/* Quick Assessment Banner */}
        {result.isQuickAssessment && (
          <QuickResultsBanner />
        )}

        {/* Score Section */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ScoreGauge score={result.overallScore} />

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="typo-h2 text-regfo-dark">
                  Your Compliance Score
                </h1>
                <span
                  className={`px-3 py-1 rounded-full typo-body-sm font-medium ${getRiskBadge(
                    result.overallRiskLevel
                  )}`}
                >
                  {result.overallRiskLevel.charAt(0).toUpperCase() +
                    result.overallRiskLevel.slice(1)}{' '}
                  Risk
                </span>
              </div>

              <p className="typo-body text-slate-600 mb-4">{result.complianceStatus}</p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 typo-body-sm text-slate-500">
                <span>
                  {result.answeredQuestions}/{result.totalQuestions} questions
                  answered
                </span>
                <span>•</span>
                <span>{result.topGaps.length} gaps identified</span>
              </div>
            </div>
          </div>

          {/* Days to Audit */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="typo-body-sm text-slate-600">
                Estimated time to audit readiness
              </p>
              <p className="text-2xl font-bold text-blue-700">
                {result.daysToAudit} days
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Category Breakdown */}
          <div>
            <h2 className="typo-h3 text-regfo-dark mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Category Breakdown
            </h2>
            <div className="space-y-3">
              {nonZeroCategories.map((category) => (
                <CategoryBar key={category.categoryId} category={category} />
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h2 className="typo-h3 text-regfo-dark mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Recommended Next Steps
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <ul className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-regfo-primary/10 text-regfo-primary rounded-full flex items-center justify-center typo-body-sm font-medium flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="typo-body text-slate-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Card */}
            <div className="mt-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white">
              <h3 className="typo-h4 text-white mb-2">
                Need Professional Help?
              </h3>
              <p className="typo-body-sm text-white/80 mb-4">
                BrightByte provides expert compliance consulting, SOC 2 audit
                preparation, and GDPR implementation services for growing
                companies.
              </p>
              <Link
                href="/brief"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition"
              >
                Get Expert Help
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Top Gaps */}
        {result.topGaps.length > 0 && (
          <div className="mb-8">
            <h2 className="typo-h3 text-regfo-dark mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Top Priority Gaps
            </h2>
            <div className="space-y-4">
              {result.topGaps.map((gap, index) => (
                <GapCard key={gap.questionId} gap={gap} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Feedback Form */}
        <div className="mb-8 regfo-no-print">
          <FeedbackForm />
        </div>

        {/* Retake Assessment */}
        <div className="text-center regfo-no-print">
          <Link
            href="/regfo/assessment"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-regfo-primary typo-body"
          >
            <RefreshCw className="w-4 h-4" />
            {result.isQuickAssessment ? 'Complete Full Assessment' : 'Retake Assessment'}
          </Link>
        </div>
      </main>
    </div>
  );
}
