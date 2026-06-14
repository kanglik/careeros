import {
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Compass,
  Gem,
  Globe2,
  HeartHandshake,
  Languages,
  LineChart,
  Map,
  Radar,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import type {
  CareerDNA,
  CareerPathStep,
  LanguageAdvantage,
  ModuleLink,
  OpportunityMatch,
  RecruiterCandidate,
  SalaryInsight,
  SkillGap,
  TalentProfile,
} from "@/types/careeros";

export const demoProfile: TalentProfile = {
  name: "CareerOS Demo Talent",
  location: "Kuala Lumpur, Malaysia",
  currentRole: "Marketing Executive",
  education: ["Bachelor of Communication", "Diploma in Journalism"],
  skills: ["Interviewing", "Storytelling", "Research", "Canva", "Digital Marketing"],
  languages: ["English", "Malay", "Mandarin"],
  interests: ["Technology", "Travel", "Community Building", "Photography"],
  aspirations: ["Product Strategy", "Regional Mobility", "Meaningful Work"],
  workPreferences: ["Hybrid Work", "Cross-Functional Work", "Strong Mentorship"],
  personalityTraits: ["Curious", "Empathetic", "Analytical", "Adaptable"],
  projects: [
    "Built a campus ambassador content campaign",
    "Interviewed 30 graduates for a regional employability report",
    "Launched a social media series on early career growth",
  ],
};

export const careerDNA: CareerDNA[] = [
  {
    trait: "Creator",
    score: 88,
    description: "Turns ideas and observations into compelling narratives.",
  },
  {
    trait: "Explorer",
    score: 78,
    description: "Actively tests new paths and learns across domains.",
  },
  {
    trait: "Builder",
    score: 65,
    description: "Can convert insights into repeatable systems and workflows.",
  },
  {
    trait: "Connector",
    score: 84,
    description: "Builds trust across cultures, languages, and communities.",
  },
  {
    trait: "Leader",
    score: 42,
    description: "Early leadership signal with room to grow through ownership.",
  },
];

export const dashboardMetrics = [
  { label: "Career Score", value: 72, suffix: "/100", icon: Target },
  { label: "Potential Score", value: 89, suffix: "/100", icon: Sparkles },
  { label: "Salary Fairness", value: 73, suffix: "/100", icon: BarChart3 },
  { label: "Career Goal Progress", value: 48, suffix: "%", icon: Trophy },
];

export const moduleLinks: ModuleLink[] = [
  {
    title: "Career Path Navigator",
    href: "/career-path",
    description: "Map practical routes from today's role to future opportunities.",
    icon: Map,
  },
  {
    title: "AI Career Coach",
    href: "/ai-coach",
    description: "Ask realistic career questions and receive guided next steps.",
    icon: Bot,
  },
  {
    title: "Fair Pay Engine",
    href: "/fair-pay",
    description: "Compare current pay with market signals and negotiation levers.",
    icon: LineChart,
  },
  {
    title: "Skill Gap Analyzer",
    href: "/skill-gap",
    description: "See readiness for target roles and the missing capabilities.",
    icon: Radar,
  },
  {
    title: "Smart Talent Matching",
    href: "/talent-matching",
    description: "Match by potential, language strength, and aspirations.",
    icon: Users,
  },
  {
    title: "Hidden Opportunity Discovery",
    href: "/hidden-opportunities",
    description: "Find careers you would not normally search for.",
    icon: Compass,
  },
  {
    title: "Language Advantage Engine",
    href: "/language-advantage",
    description: "Turn multilingual ability into regional career leverage.",
    icon: Languages,
  },
  {
    title: "Passion to Career Engine",
    href: "/passion-to-career",
    description: "Translate interests into serious career options.",
    icon: HeartHandshake,
  },
  {
    title: "Career Simulator",
    href: "/career-simulator",
    description: "Compare future salary paths across realistic career moves.",
    icon: Globe2,
  },
];

export const careerPath: CareerPathStep[] = [
  {
    role: "Marketing Executive",
    salary: "RM4,500 - RM5,200",
    requiredSkills: ["Campaign execution", "Copywriting", "Stakeholder updates"],
    estimatedTime: "Now",
    marketDemand: "High",
  },
  {
    role: "Senior Marketing Executive",
    salary: "RM5,500 - RM6,800",
    requiredSkills: ["Performance reporting", "CRM", "Mentoring interns"],
    estimatedTime: "8-12 months",
    marketDemand: "High",
  },
  {
    role: "Product Marketing Executive",
    salary: "RM6,800 - RM8,200",
    requiredSkills: ["User research", "Launch planning", "Competitive insight"],
    estimatedTime: "12-18 months",
    marketDemand: "Very High",
  },
  {
    role: "Associate Product Manager",
    salary: "RM8,000 - RM10,500",
    requiredSkills: ["Roadmapping", "Analytics", "Cross-functional delivery"],
    estimatedTime: "18-30 months",
    marketDemand: "Very High",
  },
  {
    role: "Product Manager",
    salary: "RM10,000 - RM14,000",
    requiredSkills: ["Product strategy", "Experiment design", "Commercial judgment"],
    estimatedTime: "30-42 months",
    marketDemand: "Very High",
  },
];

export const salaryInsight: SalaryInsight = {
  currentSalary: 4500,
  fairSalary: 5800,
  underpaidPercent: 22,
  contributors: [
    { label: "SQL", value: 500 },
    { label: "Leadership", value: 800 },
    { label: "Power BI", value: 400 },
    { label: "Mandarin regional support", value: 600 },
  ],
  negotiationTips: [
    "Anchor on campaign impact and multilingual market coverage.",
    "Show how analytics skills reduce reporting dependency.",
    "Ask for a growth-linked adjustment tied to product marketing ownership.",
  ],
};

export const skillGap: SkillGap = {
  targetJob: "Data Analyst",
  readinessScore: 38,
  currentSkills: ["Excel", "Canva", "Research"],
  missingSkills: [
    { label: "SQL", importance: 92 },
    { label: "Python", importance: 78 },
    { label: "Power BI", importance: 84 },
    { label: "Dashboard storytelling", importance: 72 },
  ],
};

export const hiddenOpportunities: OpportunityMatch[] = [
  {
    title: "UX Researcher",
    match: 89,
    category: "Product and Research",
    salaryRange: "RM6,500 - RM11,000",
    regions: ["Malaysia", "Singapore", "Taiwan"],
    reasons: ["Interviewing", "Research", "Empathy", "Technology curiosity"],
    nextSkills: ["Usability testing", "Figma basics", "Research synthesis"],
  },
  {
    title: "Product Marketing Associate",
    match: 86,
    category: "Product and Growth",
    salaryRange: "RM6,800 - RM10,500",
    regions: ["Malaysia", "Singapore", "Vietnam"],
    reasons: ["Storytelling", "Digital marketing", "Product Strategy", "Mandarin"],
    nextSkills: ["Positioning", "Launch planning", "Competitive analysis"],
  },
  {
    title: "Customer Success Manager",
    match: 82,
    category: "Commercial",
    salaryRange: "RM6,000 - RM9,500",
    regions: ["Malaysia", "Philippines", "Singapore"],
    reasons: ["Communication", "Community Building", "Empathy", "Multilingual support"],
    nextSkills: ["CRM", "Renewal strategy", "Business reviews"],
  },
];

export const languageAdvantage: LanguageAdvantage = {
  languages: ["Chinese", "English", "Malay"],
  powerScore: 87,
  unlockedMarkets: ["Singapore", "Taiwan", "Hong Kong", "Malaysia regional HQ"],
  regionalJobsIncrease: "+240%",
};

export const recruiterCandidates: RecruiterCandidate[] = [
  {
    name: "Alyssa Tan",
    potentialScore: 92,
    growthPotential: "Exceptional",
    languages: ["Chinese", "English", "Malay"],
    transferableSkills: ["Community Building", "Research", "Storytelling"],
    aspirationAlignment: 88,
    suggestedRoles: ["Product Marketing", "Community Manager", "Customer Success"],
    hiringConfidence: 91,
  },
  {
    name: "Daniel Lim",
    potentialScore: 86,
    growthPotential: "High",
    languages: ["English", "Malay", "Japanese"],
    transferableSkills: ["Training", "Analytics", "Stakeholder Management"],
    aspirationAlignment: 81,
    suggestedRoles: ["Learning and Development", "Implementation Consultant"],
    hiringConfidence: 84,
  },
];

export const achievements = [
  { label: "First Career Plan", icon: Gem, status: "Unlocked" },
  { label: "Salary Negotiator", icon: BriefcaseBusiness, status: "In progress" },
  { label: "Skill Builder", icon: Trophy, status: "Unlocked" },
  { label: "Career Explorer", icon: Compass, status: "Unlocked" },
];

export const regionalMarkets = [
  { country: "Malaysia", demand: 78, salary: "RM6k - RM11k", growth: "+34%" },
  { country: "Singapore", demand: 91, salary: "SGD4.5k - SGD8k", growth: "+48%" },
  { country: "Thailand", demand: 67, salary: "THB55k - THB95k", growth: "+26%" },
  { country: "Vietnam", demand: 74, salary: "VND28m - VND55m", growth: "+41%" },
  { country: "Indonesia", demand: 70, salary: "IDR18m - IDR35m", growth: "+29%" },
  { country: "Philippines", demand: 76, salary: "PHP65k - PHP120k", growth: "+38%" },
];
