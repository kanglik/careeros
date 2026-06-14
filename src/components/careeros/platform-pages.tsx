import type { ReactNode } from "react";
import {
  Bot,
  CheckCircle2,
  Globe2,
  Lightbulb,
  MapPin,
  MessageSquareText,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import {
  achievements,
  careerDNA,
  careerPath,
  dashboardMetrics,
  demoProfile,
  languageAdvantage,
  moduleLinks,
  recruiterCandidates,
  regionalMarkets,
  salaryInsight,
  skillGap,
} from "@/data/mock-data";
import { discoverHiddenOpportunities } from "@/lib/career-intelligence";
import { formatCurrency } from "@/lib/utils";
import { Badge, Card } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { ButtonLink } from "@/components/ui/button";
import { DashboardGreeting } from "@/components/careeros/dashboard-greeting";

function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      {typeof eyebrow === "string" ? <Badge>{eyebrow}</Badge> : eyebrow}
      <h1 className="mt-4 text-3xl font-bold tracking-normal text-slate-950 md:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">{description}</p>
    </div>
  );
}

export function DashboardPage() {
  return (
    <div className="px-5 py-8 md:px-8">
      <PageHeader
        eyebrow={<DashboardGreeting />}
        title="Your CareerOS command center"
        description="A single view of career score, potential, fair pay, progress, regional demand, and next best actions."
      />

      <div className="grid gap-5 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card className="p-5" key={metric.label}>
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-blue-700" />
                <span className="text-xs font-semibold text-slate-500">
                  {metric.suffix === "%" ? "Progress" : "Index"}
                </span>
              </div>
              <p className="mt-5 text-sm font-semibold text-slate-500">{metric.label}</p>
              <p className="mt-2 text-4xl font-bold text-slate-950">
                {metric.value}
                <span className="text-lg text-slate-400">{metric.suffix}</span>
              </p>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Career modules</h2>
              <p className="mt-1 text-sm text-slate-600">
                Explore the full prototype from one product shell.
              </p>
            </div>
            <ButtonLink href="/hidden-opportunities" variant="outline">
              Explore hidden paths
            </ButtonLink>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {moduleLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                  href={item.href}
                  key={item.href}
                >
                  <Icon className="h-5 w-5 text-blue-700" />
                  <h3 className="mt-3 font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                </Link>
              );
            })}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold">Career DNA</h2>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {careerDNA.slice(0, 4).map((item) => (
                <ProgressRing
                  key={item.trait}
                  label={item.trait}
                  size="sm"
                  value={item.score}
                />
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-bold">Career XP</h2>
            <p className="mt-1 text-sm text-slate-600">Level 8 Career Explorer</p>
            <div className="mt-5 space-y-3">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
                    key={achievement.label}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-blue-700" />
                      <span className="text-sm font-semibold">{achievement.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      {achievement.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function ProfilePage() {
  const sections = [
    ["Education", demoProfile.education],
    ["Skills", demoProfile.skills],
    ["Languages", demoProfile.languages],
    ["Interests", demoProfile.interests],
    ["Work Preferences", demoProfile.workPreferences],
    ["Career Aspirations", demoProfile.aspirations],
    ["Personality Traits", demoProfile.personalityTraits],
  ];

  return (
    <div className="px-5 py-8 md:px-8">
      <PageHeader
        eyebrow="Human Potential Profile"
        title={`${demoProfile.name}'s talent intelligence profile`}
        description="A richer candidate profile that combines education, projects, languages, interests, aspirations, traits, and growth signals."
      />
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card className="p-6">
          <div className="rounded-lg bg-blue-700 p-6 text-white">
            <p className="text-blue-100">{demoProfile.currentRole}</p>
            <h2 className="mt-2 text-3xl font-bold">{demoProfile.name}</h2>
            <p className="mt-3 flex items-center gap-2 text-blue-100">
              <MapPin className="h-4 w-4" /> {demoProfile.location}
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <ProgressRing label="Growth Potential" value={89} />
            <ProgressRing label="Potential Index" value={92} />
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {sections.map(([title, values]) => (
            <Card className="p-5" key={title as string}>
              <h3 className="font-bold">{title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {(values as string[]).map((value) => (
                  <span
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
                    key={value}
                  >
                    {value}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CareerPathPage() {
  return (
    <div className="px-5 py-8 md:px-8">
      <PageHeader
        eyebrow="Module 1"
        title="Career Path Navigator"
        description="Google Maps-style role progression from Marketing Executive to Product Manager."
      />
      <div className="space-y-4">
        {careerPath.map((step, index) => (
          <Card className="p-5" key={step.role}>
            <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-lg font-bold text-white">
                {index + 1}
              </div>
              <div>
                <h2 className="text-xl font-bold">{step.role}</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {step.estimatedTime} | Demand: {step.marketDemand}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {step.requiredSkills.map((skill) => (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-lg font-bold text-emerald-600">{step.salary}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function AiCoachPage() {
  return (
    <div className="px-5 py-8 md:px-8">
      <PageHeader
        eyebrow="Module 2"
        title="AI Career Coach"
        description="A ChatGPT-style coach for career switches, salary goals, skill planning, and regional mobility."
      />
      <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
        <Card className="p-5">
          <h2 className="font-bold">Popular questions</h2>
          {[
            "Should I switch careers?",
            "How can I earn RM10k?",
            "What skills should I learn?",
            "Which country has better opportunities?",
          ].map((question) => (
            <div className="mt-3 rounded-lg border border-slate-200 p-4 text-sm font-semibold" key={question}>
              {question}
            </div>
          ))}
        </Card>
        <Card className="p-6">
          <div className="flex items-start gap-3">
            <Bot className="mt-1 h-6 w-6 text-blue-700" />
            <div className="rounded-lg bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-700">CareerOS Coach</p>
              <p className="mt-3 leading-7 text-slate-700">
                Based on your communication background, multilingual profile, and
                product strategy aspiration, the fastest RM10k pathway is likely
                Product Marketing or Associate Product Management. Start with SQL,
                user research, and launch planning. Your Mandarin, Malay, and English
                combination also opens regional roles in Singapore and Taiwan.
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-500">
            <MessageSquareText className="h-4 w-4" />
            Ask CareerOS about your next move...
          </div>
        </Card>
      </div>
    </div>
  );
}

export function FairPayPage() {
  return (
    <div className="px-5 py-8 md:px-8">
      <PageHeader
        eyebrow="Module 3"
        title="Fair Pay Engine"
        description="Compare current pay with fair salary signals and see the skills that change negotiation power."
      />
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card className="p-6">
          <ProgressRing label="Salary Fairness" value={73} />
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xs font-semibold text-slate-500">Current</p>
              <p className="mt-1 text-xl font-bold">{formatCurrency(salaryInsight.currentSalary)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Fair</p>
              <p className="mt-1 text-xl font-bold text-emerald-600">
                {formatCurrency(salaryInsight.fairSalary)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Underpaid</p>
              <p className="mt-1 text-xl font-bold text-blue-700">
                {salaryInsight.underpaidPercent}%
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-bold">Salary levers</h2>
          <div className="mt-5 space-y-4">
            {salaryInsight.contributors.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm font-semibold">
                  <span>{item.label}</span>
                  <span className="text-emerald-600">+RM{item.value}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${Math.min(item.value / 8, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <h3 className="mt-6 font-bold">Negotiation suggestions</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            {salaryInsight.negotiationTips.map((tip) => (
              <li className="flex gap-2" key={tip}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                {tip}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

export function SkillGapPage() {
  return (
    <div className="px-5 py-8 md:px-8">
      <PageHeader
        eyebrow="Module 4"
        title="Skill Gap Analyzer"
        description="Understand readiness for a target role and the learning priorities that matter most."
      />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-6">
          <ProgressRing label={`${skillGap.targetJob} readiness`} value={skillGap.readinessScore} />
          <div className="mt-6 flex flex-wrap gap-2">
            {skillGap.currentSkills.map((skill) => (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-bold">Missing skills</h2>
          <div className="mt-5 space-y-5">
            {skillGap.missingSkills.map((skill) => (
              <div key={skill.label}>
                <div className="flex justify-between text-sm font-semibold">
                  <span>{skill.label}</span>
                  <span>{skill.importance}% importance</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-blue-700" style={{ width: `${skill.importance}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function TalentMatchingPage() {
  const roles = ["HR Executive", "Learning & Development", "Customer Success Manager"];
  return (
    <div className="px-5 py-8 md:px-8">
      <PageHeader
        eyebrow="Module 5"
        title="Smart Talent Matching"
        description="Role recommendations are based on potential, transferable skills, languages, interests, and aspirations."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {roles.map((role, index) => (
          <Card className="p-6" key={role}>
            <p className="text-sm font-semibold text-slate-500">Recommended role</p>
            <h2 className="mt-3 text-xl font-bold">{role}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              AI explanation: teaching and communication signals transfer into
              stakeholder guidance, learning design, and high-trust customer support.
            </p>
            <p className="mt-5 text-3xl font-bold text-blue-700">{88 - index * 3}%</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function HiddenOpportunitiesPage() {
  const opportunities = discoverHiddenOpportunities(demoProfile);
  return (
    <div className="px-5 py-8 md:px-8">
      <PageHeader
        eyebrow="Module 6"
        title="Careers you never considered"
        description="CareerOS identifies hidden opportunity by combining education, skills, languages, interests, personality traits, and aspirations."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {opportunities.map((item) => (
          <Card className="p-6" key={item.title}>
            <div className="flex items-start justify-between">
              <Lightbulb className="h-6 w-6 text-emerald-500" />
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                {item.match}% match
              </span>
            </div>
            <h2 className="mt-5 text-xl font-bold">{item.title}</h2>
            <p className="mt-1 text-sm font-semibold text-blue-700">{item.category}</p>
            <p className="mt-3 text-sm text-slate-600">{item.salaryRange}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.reasons.map((reason) => (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700" key={reason}>
                  {reason}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function LanguageAdvantagePage() {
  return (
    <div className="px-5 py-8 md:px-8">
      <PageHeader
        eyebrow="Module 7"
        title="Language Advantage Engine"
        description="Turn multilingual ability into measurable regional opportunity."
      />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-6">
          <ProgressRing label="Language Power Score" value={languageAdvantage.powerScore} />
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {languageAdvantage.languages.map((language) => (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700" key={language}>
                {language}
              </span>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-bold">Additional opportunities unlocked</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {languageAdvantage.unlockedMarkets.map((market) => (
              <div className="rounded-lg bg-slate-50 p-4" key={market}>
                <Globe2 className="h-5 w-5 text-blue-700" />
                <p className="mt-3 font-semibold">{market}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-3xl font-bold text-emerald-600">
            {languageAdvantage.regionalJobsIncrease}
          </p>
          <p className="mt-1 text-sm text-slate-600">regional jobs increase</p>
        </Card>
      </div>
    </div>
  );
}

export function PassionToCareerPage() {
  const careers = ["Content Strategist", "Tourism Marketing", "Brand Storytelling", "Social Media Manager"];
  return (
    <div className="px-5 py-8 md:px-8">
      <PageHeader
        eyebrow="Module 8"
        title="Passion to Career Engine"
        description="Translate interests like photography, travel, and technology into serious career options."
      />
      <div className="grid gap-5 md:grid-cols-4">
        {careers.map((career) => (
          <Card className="p-6" key={career}>
            <TrendingUp className="h-6 w-6 text-blue-700" />
            <h2 className="mt-5 text-lg font-bold">{career}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Combines visual taste, audience empathy, storytelling, and market
              awareness into a commercially useful role.
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function CareerSimulatorPage() {
  const paths = [
    ["Stay in current field", "RM8,000", 58],
    ["Switch to Data Analytics", "RM12,000", 82],
    ["Switch to Product", "RM13,500", 92],
  ];
  return (
    <div className="px-5 py-8 md:px-8">
      <PageHeader
        eyebrow="Module 9"
        title="Career Simulator"
        description="Compare future salary projections for different career choices."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {paths.map(([path, salary, value]) => (
          <Card className="p-6" key={path}>
            <h2 className="text-xl font-bold">{path}</h2>
            <p className="mt-2 text-sm text-slate-600">Projected salary in 2030</p>
            <p className="mt-4 text-3xl font-bold text-blue-700">{salary}</p>
            <div className="mt-6 h-3 rounded-full bg-slate-100">
              <div className="h-3 rounded-full bg-gradient-to-r from-blue-700 to-emerald-500" style={{ width: `${value}%` }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function RecruiterPage() {
  return (
    <div className="px-5 py-8 md:px-8">
      <PageHeader
        eyebrow="Employer View"
        title="Recruit by potential, not just resumes"
        description="A recruiter dashboard focused on growth potential, languages, transferable skills, career aspiration alignment, and hiring confidence."
      />
      <div className="grid gap-5 xl:grid-cols-2">
        {recruiterCandidates.map((candidate) => (
          <Card className="p-6" key={candidate.name}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">{candidate.name}</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Growth Potential: {candidate.growthPotential}
                </p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
                {candidate.potentialScore}/100
              </span>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-500">Languages</p>
                <p className="mt-2 font-bold">{candidate.languages.join(", ")}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-500">Hiring Confidence</p>
                <p className="mt-2 font-bold text-emerald-600">
                  {candidate.hiringConfidence}%
                </p>
              </div>
            </div>
            <h3 className="mt-5 font-bold">Suggested roles</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {candidate.suggestedRoles.map((role) => (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700" key={role}>
                  {role}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function AsiaFocusPageSection() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {regionalMarkets.map((market) => (
        <div className="rounded-lg border border-slate-200 bg-white p-4" key={market.country}>
          <p className="font-bold">{market.country}</p>
          <p className="mt-2 text-sm text-slate-600">{market.salary}</p>
          <p className="mt-3 text-sm font-bold text-emerald-600">
            Demand {market.demand}/100 | {market.growth}
          </p>
        </div>
      ))}
    </div>
  );
}
