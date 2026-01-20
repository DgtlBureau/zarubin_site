// Scoring logic for SOC 2 + GDPR Compliance Checker
// Supports both Quick (5 questions) and Full (25 questions) assessments

import {
  questions,
  categories,
  Question,
  quickQuestions,
} from "./questions";

export type Answer = {
  questionId: string;
  selectedOptionId: string;
  score: number;
  riskLevel: "low" | "medium" | "high" | "critical";
};

export type CategoryScore = {
  categoryId: string;
  categoryName: string;
  score: number;
  maxScore: number;
  percentage: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  gaps: Gap[];
};

export type Gap = {
  questionId: string;
  question: string;
  regulation: string;
  currentAnswer: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  recommendation: string;
  priority: number; // 1 = highest priority
};

// Quick assessment result type
export type QuickResult = {
  score: number;
  daysToAudit: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  categoryPreview: { categoryId: string; name: string; score: number }[];
  criticalGaps: number;
  highGaps: number;
};

// Full assessment result type
export type AssessmentResult = {
  overallScore: number;
  overallRiskLevel: "low" | "medium" | "high" | "critical";
  categoryScores: CategoryScore[];
  topGaps: Gap[];
  totalQuestions: number;
  answeredQuestions: number;
  complianceStatus: string;
  recommendations: string[];
  daysToAudit: number;
  isQuickAssessment: boolean;
};

// Get risk level based on percentage
const getRiskLevel = (
  percentage: number
): "low" | "medium" | "high" | "critical" => {
  if (percentage >= 80) return "low";
  if (percentage >= 60) return "medium";
  if (percentage >= 40) return "high";
  return "critical";
};

// Calculate "Days to Audit" based on score and gaps
export const calculateDaysToAudit = (
  score: number,
  criticalGaps: number,
  highGaps: number
): number => {
  // Base: 90 days
  let baseDays = 90;

  // Score-based reduction
  if (score >= 80) {
    baseDays = 30; // -60 days
  } else if (score >= 60) {
    baseDays = 50; // -40 days
  } else if (score >= 40) {
    baseDays = 70; // -20 days
  }
  // score < 40: stays at 90 days

  // Gap penalties
  const gapPenalty = criticalGaps * 10 + highGaps * 5;

  return Math.min(baseDays + gapPenalty, 180); // Cap at 180 days
};

// Calculate quick assessment result (5 questions)
export const calculateQuickResult = (
  answers: Map<string, Answer>
): QuickResult => {
  let totalScore = 0;
  let answeredCount = 0;
  let criticalGaps = 0;
  let highGaps = 0;

  // Category scores from quick questions
  const categoryScores: Record<string, { total: number; count: number }> = {
    governance: { total: 0, count: 0 },
    "access-management": { total: 0, count: 0 },
    "security-controls": { total: 0, count: 0 },
    "monitoring-incident": { total: 0, count: 0 },
    "data-protection": { total: 0, count: 0 },
  };

  quickQuestions.forEach((question) => {
    const answer = answers.get(question.id);
    if (answer) {
      totalScore += answer.score;
      answeredCount++;

      // Track gaps
      if (answer.riskLevel === "critical") criticalGaps++;
      if (answer.riskLevel === "high") highGaps++;

      // Add to category
      if (categoryScores[question.categoryId]) {
        categoryScores[question.categoryId].total += answer.score;
        categoryScores[question.categoryId].count += 1;
      }
    }
  });

  const score = answeredCount > 0 ? Math.round(totalScore / answeredCount) : 0;
  const riskLevel = getRiskLevel(score);
  const daysToAudit = calculateDaysToAudit(score, criticalGaps, highGaps);

  // Build category preview
  const categoryPreview = [
    {
      categoryId: "security-controls",
      name: "Security",
      score: categoryScores["security-controls"].count > 0
        ? Math.round(
            categoryScores["security-controls"].total /
              categoryScores["security-controls"].count
          )
        : 0,
    },
    {
      categoryId: "access-management",
      name: "Access",
      score: categoryScores["access-management"].count > 0
        ? Math.round(
            categoryScores["access-management"].total /
              categoryScores["access-management"].count
          )
        : 0,
    },
    {
      categoryId: "data-protection",
      name: "Data",
      score: 0, // No quick questions for data protection, will estimate from overall
    },
    {
      categoryId: "monitoring-incident",
      name: "Monitoring",
      score: categoryScores["monitoring-incident"].count > 0
        ? Math.round(
            categoryScores["monitoring-incident"].total /
              categoryScores["monitoring-incident"].count
          )
        : 0,
    },
    {
      categoryId: "governance",
      name: "Governance",
      score: categoryScores["governance"].count > 0
        ? Math.round(
            categoryScores["governance"].total /
              categoryScores["governance"].count
          )
        : 0,
    },
  ];

  // Estimate data protection score from overall (since no quick question for it)
  categoryPreview[2].score = score;

  return {
    score,
    daysToAudit,
    riskLevel,
    categoryPreview,
    criticalGaps,
    highGaps,
  };
};

// Calculate weighted score for a category
const calculateCategoryScore = (
  categoryId: string,
  answers: Map<string, Answer>,
  questionSet: Question[]
): CategoryScore => {
  const categoryQuestions = questionSet.filter(
    (q) => q.categoryId === categoryId
  );
  const category = categories.find((c) => c.id === categoryId)!;

  let totalWeightedScore = 0;
  let totalWeight = 0;
  const gaps: Gap[] = [];

  categoryQuestions.forEach((question) => {
    const answer = answers.get(question.id);
    if (answer) {
      totalWeightedScore += answer.score * question.weight;
      totalWeight += 100 * question.weight;

      // Identify gaps (anything below 70% score)
      if (answer.score < 70) {
        const selectedOption = question.options.find(
          (o) => o.id === answer.selectedOptionId
        );
        gaps.push({
          questionId: question.id,
          question: question.question,
          regulation: question.regulation,
          currentAnswer: selectedOption?.text || "Unknown",
          riskLevel: answer.riskLevel,
          recommendation: getRecommendation(question),
          priority:
            answer.riskLevel === "critical"
              ? 1
              : answer.riskLevel === "high"
                ? 2
                : answer.riskLevel === "medium"
                  ? 3
                  : 4,
        });
      }
    } else {
      totalWeight += 100 * question.weight;
    }
  });

  const percentage =
    totalWeight > 0 ? (totalWeightedScore / totalWeight) * 100 : 0;
  const riskLevel = getRiskLevel(percentage);

  // Sort gaps by priority
  gaps.sort((a, b) => a.priority - b.priority);

  return {
    categoryId,
    categoryName: category?.name || categoryId,
    score: Math.round(totalWeightedScore),
    maxScore: totalWeight,
    percentage: Math.round(percentage),
    riskLevel,
    gaps,
  };
};

// Generate recommendation based on question
const getRecommendation = (question: Question): string => {
  const recommendations: Record<string, string> = {
    // Quick questions
    "quick-1":
      "Document comprehensive security policies and establish annual review cycle with management approval.",
    "quick-2":
      "Implement MFA for all user accounts using TOTP, hardware keys, or push notifications.",
    "quick-3":
      "Implement AES-256 encryption for all sensitive data at rest and enforce TLS 1.2+ for all communications.",
    "quick-4":
      "Implement a SIEM solution with automated alerting for security events and anomaly detection.",
    "quick-5":
      "Document and test your incident response plan annually with tabletop exercises.",

    // Full Security Controls
    "full-sec-1":
      "Implement AES-256 encryption for all sensitive data at rest using a key management service.",
    "full-sec-2":
      "Enforce TLS 1.2+ for all communications and disable older protocols.",
    "full-sec-3":
      "Deploy a Web Application Firewall (WAF) and implement network segmentation for sensitive systems.",
    "full-sec-4":
      "Implement automated vulnerability scanning with defined SLAs (Critical: 24h, High: 7 days, Medium: 30 days).",

    // Full Access Management
    "full-access-1":
      "Document and implement role-based access control (RBAC) following the principle of least privilege.",
    "full-access-2":
      "Establish formal user lifecycle procedures with automated provisioning and same-day deprovisioning.",
    "full-access-3":
      "Implement quarterly access reviews with documented approvals and evidence retention.",
    "full-access-4":
      "Enforce strong password policies (12+ chars, complexity) and encourage password manager adoption.",

    // Full Monitoring & Incident Response
    "full-monitor-1":
      "Implement a SIEM solution with automated alerting for security events and anomaly detection.",
    "full-monitor-2":
      "Create a breach notification playbook with pre-approved templates for 72-hour authority notification.",
    "full-monitor-3":
      "Configure write-once log storage with 12+ month retention and integrity verification.",
    "full-monitor-4":
      "Prepare breach notification templates and establish communication channels for affected individuals.",

    // Full Data Protection
    "full-data-1":
      "Conduct a data inventory and document justification for each personal data element collected.",
    "full-data-2":
      "Define retention periods for each data category and implement automated deletion workflows.",
    "full-data-3":
      "Encrypt backups and perform quarterly restoration tests with documented results.",
    "full-data-4":
      "Ensure all vendors processing personal data have signed Data Processing Agreements (DPAs).",

    // Full Governance & Privacy
    "full-gov-1":
      "Implement annual security awareness training with phishing simulations and completion tracking.",
    "full-gov-2":
      "Designate a Data Protection Officer or privacy owner with clear accountability.",
    "full-gov-3":
      "Create a Records of Processing Activities (RoPA) documenting lawful basis for each processing activity.",
    "full-gov-4":
      "Build or procure a data subject request portal to handle access, rectification, and deletion within 30 days.",
  };

  return (
    recommendations[question.id] ||
    "Review and improve controls for this requirement."
  );
};

// Main scoring function for full assessment
export const calculateAssessmentResult = (
  answers: Map<string, Answer>,
  isQuickOnly: boolean = false
): AssessmentResult => {
  const questionSet = isQuickOnly ? quickQuestions : questions;

  // Calculate scores for each category
  const categoryScores = categories.map((category) =>
    calculateCategoryScore(category.id, answers, questionSet)
  );

  // Calculate overall score (average of category percentages, excluding zero-question categories)
  const nonZeroCategories = categoryScores.filter((cs) => cs.maxScore > 0);
  const overallScore =
    nonZeroCategories.length > 0
      ? Math.round(
          nonZeroCategories.reduce((sum, cs) => sum + cs.percentage, 0) /
            nonZeroCategories.length
        )
      : 0;

  // Get overall risk level
  const overallRiskLevel = getRiskLevel(overallScore);

  // Collect all gaps and sort by priority
  const allGaps = categoryScores.flatMap((cs) => cs.gaps);
  allGaps.sort((a, b) => a.priority - b.priority);
  const topGaps = allGaps.slice(0, 5);

  // Count critical and high gaps
  const criticalGaps = allGaps.filter((g) => g.riskLevel === "critical").length;
  const highGaps = allGaps.filter((g) => g.riskLevel === "high").length;

  // Calculate days to audit
  const daysToAudit = calculateDaysToAudit(overallScore, criticalGaps, highGaps);

  // Generate compliance status message
  const complianceStatus = getComplianceStatus(overallScore);

  // Generate recommendations
  const recommendations = generateRecommendations(overallScore, categoryScores);

  return {
    overallScore,
    overallRiskLevel,
    categoryScores,
    topGaps,
    totalQuestions: questionSet.length,
    answeredQuestions: answers.size,
    complianceStatus,
    recommendations,
    daysToAudit,
    isQuickAssessment: isQuickOnly,
  };
};

const getComplianceStatus = (score: number): string => {
  if (score >= 90)
    return "Excellent - Your organization demonstrates strong SOC 2 and GDPR compliance";
  if (score >= 80)
    return "Good - Minor improvements needed for full compliance readiness";
  if (score >= 60)
    return "Fair - Several areas require attention before audit or regulatory review";
  if (score >= 40)
    return "Poor - Significant compliance gaps exist that need immediate attention";
  return "Critical - Major compliance deficiencies require urgent remediation";
};

const generateRecommendations = (
  overallScore: number,
  categoryScores: CategoryScore[]
): string[] => {
  const recommendations: string[] = [];

  // Find weakest categories
  const sortedCategories = [...categoryScores]
    .filter((cs) => cs.maxScore > 0)
    .sort((a, b) => a.percentage - b.percentage);

  if (overallScore < 80 && sortedCategories.length > 0) {
    recommendations.push(
      `Priority focus: ${sortedCategories[0].categoryName} (${sortedCategories[0].percentage}%)`
    );
  }

  if (sortedCategories.length > 0 && sortedCategories[0].percentage < 50) {
    recommendations.push(
      "Consider engaging a compliance consultant or vCISO for remediation planning"
    );
  }

  // Add specific recommendations based on weak areas
  sortedCategories.slice(0, 2).forEach((cs) => {
    if (cs.percentage < 70 && cs.gaps.length > 0) {
      recommendations.push(`${cs.categoryName}: ${cs.gaps[0].recommendation}`);
    }
  });

  if (overallScore >= 80) {
    recommendations.push(
      "Document your current controls and consider pursuing formal SOC 2 Type II certification"
    );
  }

  return recommendations.slice(0, 4);
};

// Export answers to JSON for potential future use
export const exportAnswersToJson = (answers: Map<string, Answer>): string => {
  const obj = Object.fromEntries(answers);
  return JSON.stringify(obj, null, 2);
};

// Risk level colors for UI
export const riskLevelColors = {
  low: { bg: "bg-green-100", text: "text-green-800", border: "border-green-500" },
  medium: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-500",
  },
  high: {
    bg: "bg-orange-100",
    text: "text-orange-800",
    border: "border-orange-500",
  },
  critical: { bg: "bg-red-100", text: "text-red-800", border: "border-red-500" },
};
