import type { LucideIcon } from "lucide-react";

export type TalentProfile = {
  name: string;
  location: string;
  currentRole: string;
  education: string[];
  skills: string[];
  languages: string[];
  interests: string[];
  aspirations: string[];
  workPreferences: string[];
  personalityTraits: string[];
  projects: string[];
};

export type OnboardingCategory =
  | "education"
  | "languages"
  | "skills"
  | "interests"
  | "aspirations"
  | "workPreferences";

export type SelectionOption = {
  id: string;
  label: string;
  group: string;
};

export type OnboardingSelection = Record<OnboardingCategory, string[]>;

export type CareerDNA = {
  trait: "Explorer" | "Builder" | "Leader" | "Creator" | "Connector";
  score: number;
  description: string;
};

export type CareerPathStep = {
  role: string;
  salary: string;
  requiredSkills: string[];
  estimatedTime: string;
  marketDemand: "Moderate" | "High" | "Very High";
};

export type OpportunityMatch = {
  title: string;
  match: number;
  category: string;
  salaryRange: string;
  regions: string[];
  reasons: string[];
  nextSkills: string[];
};

export type PersonalizedCareerMatch = OpportunityMatch & {
  transferableSkills: string[];
  skillGaps: string[];
  nextSteps: string[];
};

export type CareerRecommendationResult = {
  profile: TalentProfile;
  recommendations: PersonalizedCareerMatch[];
  summary: string;
};

export type SalaryInsight = {
  currentSalary: number;
  fairSalary: number;
  underpaidPercent: number;
  contributors: { label: string; value: number }[];
  negotiationTips: string[];
};

export type SkillGap = {
  targetJob: string;
  readinessScore: number;
  currentSkills: string[];
  missingSkills: { label: string; importance: number }[];
};

export type LanguageAdvantage = {
  languages: string[];
  powerScore: number;
  unlockedMarkets: string[];
  regionalJobsIncrease: string;
};

export type RecruiterCandidate = {
  name: string;
  potentialScore: number;
  growthPotential: "Medium" | "High" | "Exceptional";
  languages: string[];
  transferableSkills: string[];
  aspirationAlignment: number;
  suggestedRoles: string[];
  hiringConfidence: number;
};

export type ModuleLink = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

export type CandidateProfileSignals = {
  education: string[];
  skills: string[];
  languages: string[];
  interests: string[];
  aspirations: string[];
  personalityTraits: string[];
};

export type OpportunityBlueprint = {
  title: string;
  requiredSignals: string[];
  bonusSignals: string[];
};
