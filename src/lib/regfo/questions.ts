// SOC 2 + GDPR Compliance Questions
// 2-Stage Assessment: 5 Quick + 20 Full Questions

export type AnswerOption = {
  id: string;
  text: string;
  score: number; // 0-100 percentage of max points for this question
  riskLevel: "low" | "medium" | "high" | "critical";
};

export type Question = {
  id: string;
  category: string;
  categoryId: string;
  regulation: string;
  question: string;
  helpText: string;
  options: AnswerOption[];
  weight: number;
  stage: "quick" | "full";
};

export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
  maxScore: number;
};

export const categories: Category[] = [
  {
    id: "security-controls",
    name: "Security Controls",
    description: "Technical safeguards protecting systems and data",
    icon: "Shield",
    maxScore: 100,
  },
  {
    id: "access-management",
    name: "Access Management",
    description: "Authentication, authorization, and identity controls",
    icon: "Lock",
    maxScore: 100,
  },
  {
    id: "monitoring-incident",
    name: "Monitoring & Incident Response",
    description: "Detection, logging, and breach response capabilities",
    icon: "Bell",
    maxScore: 100,
  },
  {
    id: "data-protection",
    name: "Data Protection",
    description: "Encryption, minimization, and data handling practices",
    icon: "Database",
    maxScore: 100,
  },
  {
    id: "governance",
    name: "Governance & Privacy",
    description: "Policies, training, and organizational controls",
    icon: "BookOpen",
    maxScore: 100,
  },
];

// ============================================
// STAGE 1: QUICK ASSESSMENT (5 Questions)
// One high-impact question per key compliance area
// ============================================

export const quickQuestions: Question[] = [
  {
    id: "quick-1",
    category: "Governance & Privacy",
    categoryId: "governance",
    regulation: "SOC 2 CC1.1",
    question: "Does your organization have documented security policies?",
    helpText:
      "Formal security policies should be approved by leadership and communicated to all employees.",
    weight: 3,
    stage: "quick",
    options: [
      {
        id: "quick-1-a",
        text: "Yes, comprehensive policies reviewed annually",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "quick-1-b",
        text: "Partial - some policies exist but incomplete",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "quick-1-c",
        text: "In draft - working on documenting policies",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "quick-1-d",
        text: "No documented security policies",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "quick-2",
    category: "Access Management",
    categoryId: "access-management",
    regulation: "SOC 2 CC6.1",
    question: "Is multi-factor authentication (MFA) enabled for all users?",
    helpText:
      "MFA significantly reduces the risk of unauthorized access from compromised credentials.",
    weight: 3,
    stage: "quick",
    options: [
      {
        id: "quick-2-a",
        text: "Yes, enforced for all users",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "quick-2-b",
        text: "Admin accounts only",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "quick-2-c",
        text: "Optional - available but not enforced",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "quick-2-d",
        text: "No MFA implemented",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "quick-3",
    category: "Security Controls",
    categoryId: "security-controls",
    regulation: "SOC 2 CC6.1 / GDPR Art 32",
    question: "Is sensitive data encrypted at rest and in transit?",
    helpText:
      "Data should be encrypted using AES-256 at rest and TLS 1.2+ in transit.",
    weight: 3,
    stage: "quick",
    options: [
      {
        id: "quick-3-a",
        text: "Yes, AES-256 + TLS 1.2+ for all sensitive data",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "quick-3-b",
        text: "Partial coverage - some data encrypted",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "quick-3-c",
        text: "In progress - implementing encryption",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "quick-3-d",
        text: "No encryption implemented",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "quick-4",
    category: "Monitoring & Incident Response",
    categoryId: "monitoring-incident",
    regulation: "SOC 2 CC7.2",
    question: "Do you have security monitoring and alerting in place?",
    helpText:
      "Security-relevant events should be collected in a SIEM or centralized logging solution with alerting.",
    weight: 3,
    stage: "quick",
    options: [
      {
        id: "quick-4-a",
        text: "24/7 SIEM with automated alerting",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "quick-4-b",
        text: "Business hours monitoring only",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "quick-4-c",
        text: "Ad-hoc - logs exist but no active monitoring",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "quick-4-d",
        text: "No security monitoring",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "quick-5",
    category: "Monitoring & Incident Response",
    categoryId: "monitoring-incident",
    regulation: "SOC 2 CC7.3 / GDPR Art 33",
    question: "Do you have a documented incident response plan?",
    helpText:
      "A formal plan defining roles, communication, and procedures for security incidents.",
    weight: 3,
    stage: "quick",
    options: [
      {
        id: "quick-5-a",
        text: "Yes, documented and tested annually",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "quick-5-b",
        text: "Documented but not regularly tested",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "quick-5-c",
        text: "In draft - working on documentation",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "quick-5-d",
        text: "No incident response plan",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
];

// ============================================
// STAGE 2: FULL ASSESSMENT (20 Questions)
// Detailed questions across all compliance areas
// ============================================

export const fullQuestions: Question[] = [
  // --- Security Controls (4 questions) ---
  {
    id: "full-sec-1",
    category: "Security Controls",
    categoryId: "security-controls",
    regulation: "SOC 2 CC6.1",
    question: "Is data encrypted at rest using AES-256 or equivalent?",
    helpText:
      "Data at rest should be encrypted using AES-256 or equivalent algorithms.",
    weight: 3,
    stage: "full",
    options: [
      {
        id: "full-sec-1-a",
        text: "Yes, AES-256 encryption for all sensitive data",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-sec-1-b",
        text: "Encryption exists but uses older algorithms",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-sec-1-c",
        text: "Only some data is encrypted",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-sec-1-d",
        text: "No encryption at rest",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "full-sec-2",
    category: "Security Controls",
    categoryId: "security-controls",
    regulation: "SOC 2 CC6.1",
    question: "Is TLS 1.2+ enforced for all communications?",
    helpText:
      "All network communications should use TLS 1.2+ to prevent interception.",
    weight: 3,
    stage: "full",
    options: [
      {
        id: "full-sec-2-a",
        text: "Yes, TLS 1.2+ enforced everywhere",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-sec-2-b",
        text: "TLS used but older versions still allowed",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-sec-2-c",
        text: "Some internal communications unencrypted",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-sec-2-d",
        text: "No encryption in transit",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "full-sec-3",
    category: "Security Controls",
    categoryId: "security-controls",
    regulation: "SOC 2 CC6.6",
    question: "Do you have firewalls and network segmentation in place?",
    helpText:
      "Network boundaries should be protected with firewalls and sensitive systems isolated.",
    weight: 2,
    stage: "full",
    options: [
      {
        id: "full-sec-3-a",
        text: "Yes, WAF + network segmentation with DMZ",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-sec-3-b",
        text: "Firewalls exist but limited segmentation",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-sec-3-c",
        text: "Basic firewall only",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-sec-3-d",
        text: "No firewall protection",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "full-sec-4",
    category: "Security Controls",
    categoryId: "security-controls",
    regulation: "SOC 2 CC6.8",
    question: "Is there automated vulnerability scanning with SLAs?",
    helpText:
      "Regular vulnerability scanning and timely patching of identified vulnerabilities.",
    weight: 2,
    stage: "full",
    options: [
      {
        id: "full-sec-4-a",
        text: "Yes, automated scanning with defined SLAs",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-sec-4-b",
        text: "Regular scanning but no formal SLAs",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-sec-4-c",
        text: "Ad-hoc vulnerability assessments",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-sec-4-d",
        text: "No vulnerability management",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },

  // --- Access Management (4 questions) ---
  {
    id: "full-access-1",
    category: "Access Management",
    categoryId: "access-management",
    regulation: "SOC 2 CC6.2",
    question: "Is role-based access control (RBAC) implemented?",
    helpText:
      "Users should only have access to systems and data necessary for their job function.",
    weight: 3,
    stage: "full",
    options: [
      {
        id: "full-access-1-a",
        text: "Yes, documented RBAC with least privilege",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-access-1-b",
        text: "RBAC exists but not fully documented",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-access-1-c",
        text: "Access granted on ad-hoc basis",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-access-1-d",
        text: "All users have similar access levels",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "full-access-2",
    category: "Access Management",
    categoryId: "access-management",
    regulation: "SOC 2 CC6.2",
    question: "Is there a formal user provisioning/deprovisioning process?",
    helpText:
      "New users should be formally onboarded; departing users should have access revoked promptly.",
    weight: 2,
    stage: "full",
    options: [
      {
        id: "full-access-2-a",
        text: "Yes, automated with same-day deprovisioning",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-access-2-b",
        text: "Documented process but manual execution",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-access-2-c",
        text: "Informal process, deprovisioning often delayed",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-access-2-d",
        text: "No formal process",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "full-access-3",
    category: "Access Management",
    categoryId: "access-management",
    regulation: "SOC 2 CC6.3",
    question: "Are access rights reviewed periodically?",
    helpText:
      "Regular access reviews ensure users still need their current permissions.",
    weight: 2,
    stage: "full",
    options: [
      {
        id: "full-access-3-a",
        text: "Yes, quarterly reviews with documented approvals",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-access-3-b",
        text: "Annual reviews conducted",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-access-3-c",
        text: "Reviews done occasionally when issues arise",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-access-3-d",
        text: "No periodic access reviews",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "full-access-4",
    category: "Access Management",
    categoryId: "access-management",
    regulation: "SOC 2 CC6.1",
    question: "Are strong password policies enforced?",
    helpText:
      "Passwords should meet complexity requirements and be rotated periodically.",
    weight: 2,
    stage: "full",
    options: [
      {
        id: "full-access-4-a",
        text: "Yes, complexity + password manager encouraged",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-access-4-b",
        text: "Complexity requirements enforced",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-access-4-c",
        text: "Basic password requirements only",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-access-4-d",
        text: "No password policy",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },

  // --- Monitoring & Incident Response (4 questions) ---
  {
    id: "full-monitor-1",
    category: "Monitoring & Incident Response",
    categoryId: "monitoring-incident",
    regulation: "SOC 2 CC7.2",
    question: "Is centralized logging implemented (SIEM)?",
    helpText:
      "Security-relevant events should be collected in a SIEM or centralized logging solution.",
    weight: 3,
    stage: "full",
    options: [
      {
        id: "full-monitor-1-a",
        text: "Yes, SIEM with automated alerting and correlation",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-monitor-1-b",
        text: "Centralized logging but limited alerting",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-monitor-1-c",
        text: "Logs exist but not centralized",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-monitor-1-d",
        text: "No centralized logging",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "full-monitor-2",
    category: "Monitoring & Incident Response",
    categoryId: "monitoring-incident",
    regulation: "GDPR Article 33",
    question: "Can you notify authorities of a breach within 72 hours?",
    helpText:
      "GDPR requires notification to supervisory authority within 72 hours of becoming aware of a breach.",
    weight: 3,
    stage: "full",
    options: [
      {
        id: "full-monitor-2-a",
        text: "Yes, documented process with templates ready",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-monitor-2-b",
        text: "Process exists but not fully documented",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-monitor-2-c",
        text: "Would need to figure it out if it happened",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-monitor-2-d",
        text: "No breach notification process",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "full-monitor-3",
    category: "Monitoring & Incident Response",
    categoryId: "monitoring-incident",
    regulation: "SOC 2 CC7.4",
    question: "Are audit logs protected and retained 12+ months?",
    helpText:
      "Logs should be immutable and retained for at least 12 months for forensic purposes.",
    weight: 2,
    stage: "full",
    options: [
      {
        id: "full-monitor-3-a",
        text: "Yes, write-once storage with 12+ month retention",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-monitor-3-b",
        text: "Protected logs with shorter retention",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-monitor-3-c",
        text: "Logs retained but not protected",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-monitor-3-d",
        text: "No log retention policy",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "full-monitor-4",
    category: "Monitoring & Incident Response",
    categoryId: "monitoring-incident",
    regulation: "GDPR Article 34",
    question: "Is there a process to notify affected individuals of breaches?",
    helpText:
      "High-risk breaches require direct notification to affected data subjects.",
    weight: 2,
    stage: "full",
    options: [
      {
        id: "full-monitor-4-a",
        text: "Yes, documented process with templates",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-monitor-4-b",
        text: "Process exists but templates not prepared",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-monitor-4-c",
        text: "Would handle on case-by-case basis",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-monitor-4-d",
        text: "No process for individual notification",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },

  // --- Data Protection (4 questions) ---
  {
    id: "full-data-1",
    category: "Data Protection",
    categoryId: "data-protection",
    regulation: "GDPR Article 5(1)(c)",
    question: "Do you practice data minimization?",
    helpText:
      "Only collect and retain personal data that is necessary for the specified purpose.",
    weight: 3,
    stage: "full",
    options: [
      {
        id: "full-data-1-a",
        text: "Yes, documented data inventory with justification",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-data-1-b",
        text: "Generally collect only needed data, not documented",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-data-1-c",
        text: "Collect more data than strictly necessary",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-data-1-d",
        text: "No data minimization practices",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "full-data-2",
    category: "Data Protection",
    categoryId: "data-protection",
    regulation: "GDPR Article 5(1)(e)",
    question: "Is there a data retention policy with defined periods?",
    helpText:
      "Personal data should not be kept longer than necessary for the purposes it was collected.",
    weight: 2,
    stage: "full",
    options: [
      {
        id: "full-data-2-a",
        text: "Yes, documented periods with automated deletion",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-data-2-b",
        text: "Retention policy exists but deletion is manual",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-data-2-c",
        text: "Informal retention practices",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-data-2-d",
        text: "Data retained indefinitely",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "full-data-3",
    category: "Data Protection",
    categoryId: "data-protection",
    regulation: "GDPR Article 32",
    question: "Are backups encrypted and tested regularly?",
    helpText:
      "Backups should be encrypted and restoration procedures tested periodically.",
    weight: 2,
    stage: "full",
    options: [
      {
        id: "full-data-3-a",
        text: "Yes, encrypted with quarterly restore tests",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-data-3-b",
        text: "Encrypted backups but rarely tested",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-data-3-c",
        text: "Backups exist but not encrypted",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-data-3-d",
        text: "No backup procedures",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "full-data-4",
    category: "Data Protection",
    categoryId: "data-protection",
    regulation: "GDPR Article 28",
    question: "Are Data Processing Agreements (DPAs) in place with vendors?",
    helpText:
      "Any third party processing personal data on your behalf must have a signed DPA.",
    weight: 2,
    stage: "full",
    options: [
      {
        id: "full-data-4-a",
        text: "Yes, DPAs with all vendors in registry",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-data-4-b",
        text: "DPAs with major vendors only",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-data-4-c",
        text: "Some DPAs in place, not comprehensive",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-data-4-d",
        text: "No DPAs in place",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },

  // --- Governance & Privacy (4 questions) ---
  {
    id: "full-gov-1",
    category: "Governance & Privacy",
    categoryId: "governance",
    regulation: "SOC 2 CC1.4",
    question: "Is there regular security awareness training?",
    helpText:
      "Employees should receive security training upon hire and at least annually thereafter.",
    weight: 2,
    stage: "full",
    options: [
      {
        id: "full-gov-1-a",
        text: "Yes, annual training with phishing simulations",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-gov-1-b",
        text: "Annual training without simulations",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-gov-1-c",
        text: "Training at onboarding only",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-gov-1-d",
        text: "No security training program",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "full-gov-2",
    category: "Governance & Privacy",
    categoryId: "governance",
    regulation: "GDPR Article 37-39",
    question: "Is there a designated DPO or privacy owner?",
    helpText:
      "Someone should be accountable for privacy compliance, even if a formal DPO isn't required.",
    weight: 2,
    stage: "full",
    options: [
      {
        id: "full-gov-2-a",
        text: "Yes, designated DPO or privacy officer",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-gov-2-b",
        text: "Privacy responsibility assigned but not primary role",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-gov-2-c",
        text: "No clear ownership, handled ad-hoc",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-gov-2-d",
        text: "No one responsible for privacy compliance",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "full-gov-3",
    category: "Governance & Privacy",
    categoryId: "governance",
    regulation: "GDPR Article 6",
    question: "Do you have documented lawful basis for data processing?",
    helpText:
      "Every processing activity needs a valid legal basis (consent, contract, legitimate interest, etc.).",
    weight: 3,
    stage: "full",
    options: [
      {
        id: "full-gov-3-a",
        text: "Yes, documented in Records of Processing Activities",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-gov-3-b",
        text: "Lawful basis identified but not fully documented",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-gov-3-c",
        text: "Lawful basis unclear for some processing",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-gov-3-d",
        text: "No documented lawful basis",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "full-gov-4",
    category: "Governance & Privacy",
    categoryId: "governance",
    regulation: "GDPR Article 15-17",
    question: "Can you fulfill data subject requests (access, deletion)?",
    helpText:
      "Individuals have the right to access their data, correct inaccuracies, and request deletion.",
    weight: 3,
    stage: "full",
    options: [
      {
        id: "full-gov-4-a",
        text: "Yes, automated self-service portal",
        score: 100,
        riskLevel: "low",
      },
      {
        id: "full-gov-4-b",
        text: "Manual process but can fulfill within 30 days",
        score: 66,
        riskLevel: "medium",
      },
      {
        id: "full-gov-4-c",
        text: "Can partially fulfill, some data hard to locate",
        score: 33,
        riskLevel: "high",
      },
      {
        id: "full-gov-4-d",
        text: "Cannot reliably fulfill these requests",
        score: 0,
        riskLevel: "critical",
      },
    ],
  },
];

// Combined questions array for backward compatibility
export const questions: Question[] = [...quickQuestions, ...fullQuestions];

// Helper to get questions by stage
export const getQuickQuestions = (): Question[] => quickQuestions;
export const getFullQuestions = (): Question[] => fullQuestions;

// Helper to get questions by category
export const getQuestionsByCategory = (categoryId: string): Question[] => {
  return questions.filter((q) => q.categoryId === categoryId);
};

// Get total number of questions
export const getTotalQuestions = (): number => questions.length;
export const getQuickQuestionCount = (): number => quickQuestions.length;
export const getFullQuestionCount = (): number => fullQuestions.length;

// Get category by id
export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find((c) => c.id === categoryId);
};

// Map quick questions to categories for preview
export const quickCategoryMapping: Record<string, string> = {
  "quick-1": "governance",
  "quick-2": "access-management",
  "quick-3": "security-controls",
  "quick-4": "monitoring-incident",
  "quick-5": "monitoring-incident",
};
