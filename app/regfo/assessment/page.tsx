'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Shield,
  Lock,
  BookOpen,
  Bell,
  Database,
  HelpCircle,
  Info,
  Calendar,
  Zap,
  FileText,
  ChevronRight,
} from 'lucide-react';
import {
  quickQuestions,
  fullQuestions,
  categories,
} from '@/src/lib/regfo/questions';
import {
  Answer,
  calculateAssessmentResult,
  calculateQuickResult,
  QuickResult,
} from '@/src/lib/regfo/scoring';

// Icon mapping for categories
const categoryIcons: Record<string, React.ElementType> = {
  'security-controls': Shield,
  'access-management': Lock,
  'monitoring-incident': Bell,
  'data-protection': Database,
  governance: BookOpen,
};

// All questions combined
const allQuestions = [...quickQuestions, ...fullQuestions];

// Score Gauge Component for Quick Results
const ScoreGauge = ({ score }: { score: number }) => {
  const size = 140;
  const strokeWidth = 10;
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
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-regfo-dark">{score}%</span>
        <span className="text-xs text-slate-500">Preview</span>
      </div>
    </div>
  );
};

// Category Bar for Quick Results Preview
const CategoryPreviewBar = ({
  name,
  score,
}: {
  name: string;
  score: number;
}) => {
  const getBarColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center gap-2">
      <span className="typo-caption text-slate-600 w-20 truncate">{name}</span>
      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getBarColor(score)} rounded-full transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="typo-caption font-medium text-slate-700 w-8">{score}%</span>
    </div>
  );
};

// Quick Results Preview Component
const QuickResultsPreview = ({
  result,
  onContinue,
  onViewResults,
}: {
  result: QuickResult;
  onContinue: () => void;
  onViewResults: () => void;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 md:p-8 regfo-fade-in">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full typo-body-sm font-medium mb-4">
          <Zap className="w-4 h-4" />
          Quick Assessment Complete
        </div>
        <h2 className="typo-h2 text-regfo-dark">
          Your Preview Score
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Score Gauge */}
        <div className="flex-shrink-0">
          <ScoreGauge score={result.score} />
        </div>

        {/* Category Preview */}
        <div className="flex-1 w-full">
          <h3 className="typo-body-sm font-semibold text-slate-500 mb-3">
            Category Preview
          </h3>
          <div className="space-y-2">
            {result.categoryPreview.map((cat) => (
              <CategoryPreviewBar
                key={cat.categoryId}
                name={cat.name}
                score={cat.score}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Days to Audit */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Calendar className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="typo-body-sm text-slate-600">Estimated time to audit readiness</p>
          <p className="text-2xl font-bold text-blue-700">
            {result.daysToAudit} days
          </p>
        </div>
      </div>

      {/* Benefits of Full Assessment */}
      <div className="mt-6 bg-slate-50 rounded-xl p-4">
        <h3 className="typo-body font-semibold text-slate-700 mb-3">
          Complete the full assessment for:
        </h3>
        <ul className="space-y-2 typo-body-sm text-slate-600">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Detailed gap analysis with specific recommendations
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Downloadable PDF report for stakeholders
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Prioritized remediation steps by risk level
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onContinue}
          className="flex-1 flex items-center justify-center gap-2 bg-regfo-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-regfo-primary/90 transition"
        >
          Continue Full Assessment
          <ArrowRight className="w-5 h-5" />
        </button>
        <button
          onClick={onViewResults}
          className="flex items-center justify-center gap-2 text-slate-600 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition border border-slate-200"
        >
          <FileText className="w-5 h-5" />
          View Quick Results
        </button>
      </div>
    </div>
  );
};

export default function AssessmentPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, Answer>>(new Map());
  const [showHelp, setShowHelp] = useState(false);
  const [stage, setStage] = useState<'quick' | 'preview' | 'full'>('quick');
  const [quickResult, setQuickResult] = useState<QuickResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Prefetch results page for faster navigation
  useEffect(() => {
    router.prefetch('/regfo/results');
  }, [router]);

  // Get current question based on stage
  const getCurrentQuestions = () => {
    if (stage === 'quick' || stage === 'preview') {
      return quickQuestions;
    }
    return allQuestions;
  };

  const currentQuestions = getCurrentQuestions();
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const totalQuestions = currentQuestions.length;

  // Calculate progress
  const getProgress = () => {
    if (stage === 'quick') {
      return ((currentQuestionIndex + 1) / quickQuestions.length) * 100;
    }
    return ((currentQuestionIndex + 1) / allQuestions.length) * 100;
  };

  // Get display question number
  const getDisplayNumber = () => {
    if (stage === 'full' && currentQuestionIndex >= quickQuestions.length) {
      return `Question ${currentQuestionIndex + 1} of ${allQuestions.length}`;
    }
    if (stage === 'quick') {
      return `Question ${currentQuestionIndex + 1} of 5`;
    }
    return `Question ${currentQuestionIndex + 1} of ${allQuestions.length}`;
  };

  // Get progress bar color
  const getProgressColor = () => {
    const progress = getProgress();
    if (progress >= 80) return 'from-green-500 to-emerald-500';
    if (progress >= 60) return 'from-yellow-500 to-amber-500';
    if (progress >= 40) return 'from-orange-500 to-amber-500';
    return 'from-red-500 to-orange-500';
  };

  // Get current category info
  const currentCategory = categories.find(
    (c) => c.id === currentQuestion?.categoryId
  );
  const CategoryIcon = currentQuestion
    ? categoryIcons[currentQuestion.categoryId] || CheckCircle
    : CheckCircle;

  // Check if current question is answered
  const currentAnswer = currentQuestion
    ? answers.get(currentQuestion.id)
    : undefined;

  // Handle answer selection
  const handleAnswerSelect = (optionId: string) => {
    if (!currentQuestion) return;

    const option = currentQuestion.options.find((o) => o.id === optionId);
    if (!option) return;

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedOptionId: optionId,
      score: option.score,
      riskLevel: option.riskLevel,
    };

    const newAnswers = new Map(answers);
    newAnswers.set(currentQuestion.id, newAnswer);
    setAnswers(newAnswers);

    // Auto-advance after short delay
    setTimeout(() => {
      // Check if we just finished the quick stage
      if (
        stage === 'quick' &&
        currentQuestionIndex === quickQuestions.length - 1
      ) {
        // Calculate quick result and show preview
        const result = calculateQuickResult(newAnswers);
        setQuickResult(result);
        setStage('preview');
      } else if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 300);
  };

  // Navigation
  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Continue to full assessment from preview
  const handleContinueToFull = () => {
    setStage('full');
    setCurrentQuestionIndex(quickQuestions.length); // Start at first full question
  };

  // View quick results
  const handleViewQuickResults = () => {
    setIsLoading(true);
    const result = calculateAssessmentResult(answers, true);
    localStorage.setItem('complianceAssessmentResult', JSON.stringify(result));
    localStorage.setItem(
      'complianceAssessmentAnswers',
      JSON.stringify(Object.fromEntries(answers))
    );
    router.push('/regfo/results');
  };

  // Complete full assessment
  const handleComplete = () => {
    setIsLoading(true);
    const result = calculateAssessmentResult(answers, false);
    localStorage.setItem('complianceAssessmentResult', JSON.stringify(result));
    localStorage.setItem(
      'complianceAssessmentAnswers',
      JSON.stringify(Object.fromEntries(answers))
    );
    router.push('/regfo/results');
  };

  // Get risk level color classes
  const getRiskLevelClasses = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'border-green-500 bg-green-50 hover:bg-green-100';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50 hover:bg-yellow-100';
      case 'high':
        return 'border-orange-500 bg-orange-50 hover:bg-orange-100';
      case 'critical':
        return 'border-red-500 bg-red-50 hover:bg-red-100';
      default:
        return 'border-slate-200 bg-white hover:bg-slate-50';
    }
  };

  // Loading overlay
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-blue-50 z-50 flex items-center justify-center">
        <div className="text-center">
          {/* Animated circles */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-regfo-primary/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-regfo-primary rounded-full animate-spin" />
            <div className="absolute inset-2 border-4 border-transparent border-t-regfo-secondary rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
            <div className="absolute inset-4 border-4 border-transparent border-t-regfo-accent rounded-full animate-spin" style={{ animationDuration: '1.2s' }} />
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-8 h-8 text-regfo-primary animate-pulse" />
            </div>
          </div>
          <p className="typo-h3 text-regfo-dark mb-2">Preparing Your Results</p>
          <p className="typo-body text-slate-500 mb-4">Analyzing your compliance readiness...</p>
          {/* Progress dots */}
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-regfo-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-regfo-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-regfo-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  // Show preview screen
  if (stage === 'preview' && quickResult) {
    return (
      <div className="text-regfo-dark">
        {/* Sub-header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/regfo"
                className="flex items-center gap-2 text-slate-600 hover:text-regfo-primary typo-body-sm"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </Link>

              <span className="typo-h4 text-regfo-primary">SOC 2 & GDPR Assessment</span>

              <div className="typo-body-sm text-slate-500">Stage 1 Complete</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-2xl mx-auto px-4 py-8">
          <QuickResultsPreview
            result={quickResult}
            onContinue={handleContinueToFull}
            onViewResults={handleViewQuickResults}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="text-regfo-dark">
      {/* Sub-header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/regfo"
              className="flex items-center gap-2 text-slate-600 hover:text-regfo-primary typo-body-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </Link>

            <span className="typo-h4 text-regfo-primary">SOC 2 & GDPR Assessment</span>

            <div className="typo-body-sm text-slate-500">{getDisplayNumber()}</div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getProgressColor()} rounded-full transition-all duration-500`}
                style={{ width: `${getProgress()}%` }}
              />
            </div>
            {/* Stage indicator */}
            <div className="flex items-center justify-between mt-2 typo-caption text-slate-500">
              <span
                className={stage === 'quick' ? 'text-regfo-primary font-medium' : ''}
              >
                Quick (1-5)
              </span>
              <span
                className={
                  stage === 'full' && currentQuestionIndex >= quickQuestions.length
                    ? 'text-regfo-primary font-medium'
                    : ''
                }
              >
                Full (6-25)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Progress Sidebar (Desktop) */}
      <div className="hidden lg:block fixed left-4 top-36 w-48">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <h3 className="typo-body-sm font-semibold text-slate-500 mb-3">
            {stage === 'quick' ? 'Quick Assessment' : 'Full Assessment'}
          </h3>
          <div className="space-y-2">
            {categories.map((category) => {
              const Icon = categoryIcons[category.id] || CheckCircle;
              const isActive = category.id === currentQuestion?.categoryId;

              // Count answered questions in this category
              const catQuestions = (
                stage === 'quick' ? quickQuestions : allQuestions
              ).filter((q) => q.categoryId === category.id);
              const answered = catQuestions.filter((q) =>
                answers.has(q.id)
              ).length;

              return (
                <div
                  key={category.id}
                  className={`flex items-center gap-2 p-2 rounded-lg typo-caption ${
                    isActive
                      ? 'bg-regfo-primary/10 text-regfo-primary'
                      : 'text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="flex-1 truncate">{category.name}</span>
                  <span className="text-xs">
                    {answered}/{catQuestions.length}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Stage Badge */}
        <div className="flex items-center gap-2 mb-6">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full typo-body-sm font-medium ${
              stage === 'quick'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {stage === 'quick' ? (
              <>
                <Zap className="w-4 h-4" />
                Quick Assessment
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Full Assessment
              </>
            )}
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <div className="flex items-center gap-2 bg-regfo-primary/10 text-regfo-primary px-3 py-1.5 rounded-full typo-body-sm font-medium">
            <CategoryIcon className="w-4 h-4" />
            {currentCategory?.name}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 md:p-8 mb-6 regfo-fade-in">
          {/* Regulation reference */}
          <span className="typo-caption font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
            {currentQuestion?.regulation}
          </span>

          {/* Question */}
          <h2 className="typo-h3 text-regfo-dark mt-4 mb-4">
            {currentQuestion?.question}
          </h2>

          {/* Help Text Toggle */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-2 typo-body-sm text-slate-500 hover:text-regfo-primary mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            {showHelp ? 'Hide explanation' : 'What does this mean?'}
          </button>

          {/* Help Text */}
          {showHelp && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="typo-body-sm text-blue-800">
                {currentQuestion?.helpText}
              </p>
            </div>
          )}

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion?.options.map((option) => {
              const isSelected = currentAnswer?.selectedOptionId === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? `${getRiskLevelClasses(option.riskLevel)} border-2`
                      : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isSelected
                          ? 'border-regfo-primary bg-regfo-primary'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="typo-body font-medium text-slate-800">{option.text}</p>
                      {isSelected && (
                        <div className="mt-2 flex items-center gap-2">
                          <span
                            className={`typo-caption px-2 py-0.5 rounded-full font-medium ${
                              option.riskLevel === 'low'
                                ? 'bg-green-100 text-green-700'
                                : option.riskLevel === 'medium'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : option.riskLevel === 'high'
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {option.riskLevel.charAt(0).toUpperCase() +
                              option.riskLevel.slice(1)}{' '}
                            Risk
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={goToPrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-regfo-primary disabled:opacity-50 disabled:cursor-not-allowed typo-body"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          {/* Show different button based on state */}
          {stage === 'full' &&
          currentQuestionIndex === allQuestions.length - 1 ? (
            <button
              onClick={handleComplete}
              disabled={answers.size < allQuestions.length}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete Assessment
              <CheckCircle className="w-5 h-5" />
            </button>
          ) : stage === 'quick' &&
            currentQuestionIndex === quickQuestions.length - 1 ? (
            // Last quick question - button is hidden, auto-advance to preview
            <div className="typo-body-sm text-slate-500">
              Answer to see your preview
            </div>
          ) : (
            <button
              onClick={goToNext}
              disabled={!currentAnswer}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-regfo-primary disabled:opacity-50 disabled:cursor-not-allowed typo-body"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Skip to results (if in full stage and enough answered) */}
        {stage === 'full' &&
          answers.size >= 15 &&
          currentQuestionIndex < allQuestions.length - 1 && (
            <div className="text-center mt-6">
              <button
                onClick={handleComplete}
                className="typo-body-sm text-slate-500 hover:text-regfo-primary underline"
              >
                Skip remaining questions and see results ({answers.size}/
                {allQuestions.length} answered)
              </button>
            </div>
          )}
      </main>
    </div>
  );
}
