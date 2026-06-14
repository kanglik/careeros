import type {
  CandidateProfileSignals,
  CareerRecommendationResult,
  OnboardingSelection,
  OpportunityBlueprint,
  OpportunityMatch,
  PersonalizedCareerMatch,
  TalentProfile,
} from "../types/careeros";
import { onboardingOptions } from "../data/onboarding-options";

const opportunityBlueprints: (OpportunityBlueprint & {
  category: string;
  salaryRange: string;
  regions: string[];
  nextSkills: string[];
  skillGaps?: string[];
  nextSteps?: string[];
})[] = [
  {
    title: "UX Researcher",
    category: "Product and Research",
    salaryRange: "RM6,500 - RM11,000",
    regions: ["Malaysia", "Singapore", "Taiwan"],
    requiredSignals: ["Research", "Interviewing", "Empathetic", "Technology"],
    bonusSignals: ["Mandarin", "Storytelling", "Product Strategy"],
    nextSkills: ["Usability testing", "Figma basics", "Research synthesis"],
    skillGaps: ["Usability testing", "Research repository", "Journey mapping"],
    nextSteps: [
      "Build a 2-page UX research case study from one real interview.",
      "Learn usability testing basics and Figma navigation.",
      "Apply for UX Research Intern or Product Research Associate roles.",
    ],
  },
  {
    title: "Product Marketing Associate",
    category: "Product and Growth",
    salaryRange: "RM6,800 - RM10,500",
    regions: ["Malaysia", "Singapore", "Vietnam"],
    requiredSignals: ["Storytelling", "Digital Marketing", "Technology", "Product Strategy"],
    bonusSignals: ["Mandarin", "Research", "Regional Mobility"],
    nextSkills: ["Positioning", "Launch planning", "Competitive analysis"],
    skillGaps: ["Product positioning", "Launch planning", "Market sizing"],
    nextSteps: [
      "Rewrite one campaign as a product launch story.",
      "Create a competitor comparison for a SaaS product.",
      "Target Product Marketing Associate roles in regional startups.",
    ],
  },
  {
    title: "Customer Success Manager",
    category: "Commercial",
    salaryRange: "RM6,000 - RM9,500",
    regions: ["Malaysia", "Philippines", "Singapore"],
    requiredSignals: ["Community Building", "Empathetic", "English", "Meaningful Work"],
    bonusSignals: ["Malay", "Mandarin", "Storytelling"],
    nextSkills: ["CRM", "Renewal strategy", "Business reviews"],
    skillGaps: ["CRM workflows", "Customer health scoring", "Renewal playbooks"],
    nextSteps: [
      "Practice customer discovery and account review templates.",
      "Learn one CRM tool such as HubSpot or Salesforce basics.",
      "Apply for Customer Success Associate roles in SaaS companies.",
    ],
  },
  {
    title: "Learning Experience Designer",
    category: "Education Technology",
    salaryRange: "RM5,800 - RM9,200",
    regions: ["Malaysia", "Thailand", "Indonesia"],
    requiredSignals: ["Storytelling", "Research", "Education", "Creator"],
    bonusSignals: ["Canva", "English", "Meaningful Work"],
    nextSkills: ["Instructional design", "Workshop design", "Learning analytics"],
    skillGaps: ["Instructional design", "Learning measurement", "Workshop facilitation"],
    nextSteps: [
      "Convert one topic you know into a short learning module.",
      "Build a simple before-and-after learner assessment.",
      "Target L&D, education technology, and graduate training roles.",
    ],
  },
  {
    title: "Data Analyst",
    category: "Data and Insights",
    salaryRange: "RM5,500 - RM10,500",
    regions: ["Malaysia", "Singapore", "Indonesia"],
    requiredSignals: ["SQL", "Python", "Power BI", "Data Career"],
    bonusSignals: ["Advanced Excel", "Technology", "Earn RM10k+", "Analytical Work"],
    nextSkills: ["SQL joins", "Dashboard design", "Python data cleaning"],
    skillGaps: ["SQL portfolio", "Python projects", "Dashboard storytelling"],
    nextSteps: [
      "Create a Power BI dashboard from a public dataset.",
      "Publish one SQL case study with business recommendations.",
      "Apply for Data Analyst or Junior BI Analyst roles.",
    ],
  },
  {
    title: "BI Analyst",
    category: "Business Intelligence",
    salaryRange: "RM6,000 - RM11,500",
    regions: ["Malaysia", "Singapore", "Thailand"],
    requiredSignals: ["Power BI", "Advanced Excel", "SQL", "Structured Environment"],
    bonusSignals: ["Finance", "Analytical Work", "Earn RM10k+"],
    nextSkills: ["Data modeling", "DAX", "Stakeholder reporting"],
    skillGaps: ["DAX measures", "Data modeling", "Executive reporting"],
    nextSteps: [
      "Build a management dashboard with three business KPIs.",
      "Learn DAX basics and data model relationships.",
      "Target BI Analyst roles in finance, retail, or operations teams.",
    ],
  },
  {
    title: "People Analytics Associate",
    category: "People and Data",
    salaryRange: "RM5,800 - RM9,800",
    regions: ["Malaysia", "Singapore", "Philippines"],
    requiredSignals: ["Data Analysis", "Recruitment", "People and HR Career", "Research"],
    bonusSignals: ["Advanced Excel", "Meaningful Work", "Stakeholder Management"],
    nextSkills: ["HR metrics", "Survey analysis", "Workforce dashboards"],
    skillGaps: ["HR analytics metrics", "Survey design", "Workforce reporting"],
    nextSteps: [
      "Analyze a sample employee survey and present 3 insights.",
      "Learn attrition, engagement, and hiring funnel metrics.",
      "Apply for People Analytics or Talent Insights roles.",
    ],
  },
];

export function emptyOnboardingSelection(): OnboardingSelection {
  return {
    education: [],
    languages: [],
    skills: [],
    interests: [],
    aspirations: [],
    workPreferences: [],
  };
}

function labelsFor(category: keyof OnboardingSelection, ids: string[]) {
  const options = onboardingOptions[category];
  return ids
    .map((id) => options.find((option) => option.id === id)?.label)
    .filter((label): label is string => Boolean(label));
}

function groupsFor(category: keyof OnboardingSelection, ids: string[]) {
  const options = onboardingOptions[category];
  return ids
    .map((id) => options.find((option) => option.id === id)?.group)
    .filter((group): group is string => Boolean(group));
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function flattenProfileSignals(profile: CandidateProfileSignals) {
  return new Set(
    [
      ...profile.education,
      ...profile.skills,
      ...profile.languages,
      ...profile.interests,
      ...profile.aspirations,
      ...profile.personalityTraits,
    ].map(normalize),
  );
}

function profileFromSelection(name: string, selection: OnboardingSelection): TalentProfile {
  const education = labelsFor("education", selection.education);
  const skills = labelsFor("skills", selection.skills);
  const languages = labelsFor("languages", selection.languages);
  const interests = labelsFor("interests", selection.interests);
  const aspirations = labelsFor("aspirations", selection.aspirations);
  const workPreferences = labelsFor("workPreferences", selection.workPreferences);
  const interestGroups = groupsFor("interests", selection.interests);
  const preferenceGroups = groupsFor("workPreferences", selection.workPreferences);

  return {
    name: name.trim() || "CareerOS User",
    location: "Asia talent market",
    currentRole: "Emerging Talent",
    education,
    skills,
    languages,
    interests,
    aspirations,
    workPreferences,
    personalityTraits: [...new Set([...interestGroups, ...preferenceGroups])].slice(0, 4),
    projects: [
      "Generated a personalized CareerOS potential profile",
      "Mapped education, skills, languages, interests, and goals into career signals",
      "Discovered non-linear career pathways from transferable skills",
    ],
  };
}

export function calculateOpportunityScore(
  profile: CandidateProfileSignals,
  opportunity: OpportunityBlueprint,
) {
  const signals = flattenProfileSignals(profile);
  const requiredMatches = opportunity.requiredSignals.filter((signal) =>
    signals.has(normalize(signal)),
  );
  const bonusMatches = opportunity.bonusSignals.filter((signal) =>
    signals.has(normalize(signal)),
  );

  const requiredRatio =
    requiredMatches.length / Math.max(opportunity.requiredSignals.length, 1);
  const bonusRatio = bonusMatches.length / Math.max(opportunity.bonusSignals.length, 1);
  const score = Math.round(42 + requiredRatio * 43 + bonusRatio * 15);

  return Math.min(score, 98);
}

export function discoverHiddenOpportunities(
  profile: CandidateProfileSignals,
): OpportunityMatch[] {
  const signals = flattenProfileSignals(profile);

  return opportunityBlueprints
    .map((blueprint) => {
      const reasons = [...blueprint.requiredSignals, ...blueprint.bonusSignals].filter(
        (signal) => signals.has(normalize(signal)),
      );

      return {
        title: blueprint.title,
        match: calculateOpportunityScore(profile, blueprint),
        category: blueprint.category,
        salaryRange: blueprint.salaryRange,
        regions: blueprint.regions,
        reasons,
        nextSkills: blueprint.nextSkills,
      };
    })
    .filter((item) => item.match >= 68)
    .sort((a, b) => b.match - a.match);
}

export function generateCareerRecommendations(
  name: string,
  selection: OnboardingSelection,
): CareerRecommendationResult {
  const profile = profileFromSelection(name, selection);
  const signals = flattenProfileSignals(profile);
  const recommendations: PersonalizedCareerMatch[] = opportunityBlueprints
    .map((blueprint) => {
      const reasons = [...blueprint.requiredSignals, ...blueprint.bonusSignals].filter(
        (signal) => signals.has(normalize(signal)),
      );

      return {
        title: blueprint.title,
        match: calculateOpportunityScore(profile, blueprint),
        category: blueprint.category,
        salaryRange: blueprint.salaryRange,
        regions: blueprint.regions,
        reasons,
        nextSkills: blueprint.nextSkills,
        transferableSkills: reasons.slice(0, 5),
        skillGaps: blueprint.skillGaps ?? blueprint.nextSkills,
        nextSteps: blueprint.nextSteps ?? [
          `Build a small portfolio project related to ${blueprint.title}.`,
          "Learn one missing skill and document proof of work.",
          `Apply for entry-level ${blueprint.category} roles in regional companies.`,
        ],
      };
    })
    .filter((item) => item.match >= 55)
    .sort((a, b) => b.match - a.match)
    .slice(0, 3);

  return {
    profile,
    recommendations,
    summary:
      recommendations.length > 0
        ? `${profile.name}, your strongest signals point toward ${recommendations[0].title}, with ${recommendations[0].category.toLowerCase()} as the clearest opportunity space.`
        : `${profile.name}, add more signals to unlock personalized career pathways.`,
  };
}
