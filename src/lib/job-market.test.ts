import { describe, expect, it } from "vitest";
import type { JobApplication, JobListing, TalentProfile } from "@/types/careeros";
import {
  createApplication,
  filterJobListings,
  getApplicationSummary,
  scoreJobMatch,
} from "./job-market";

const profile: TalentProfile = {
  name: "Alicia Tan",
  location: "Kuala Lumpur, Malaysia",
  currentRole: "Marketing Executive",
  education: ["Bachelor of Communication"],
  skills: ["Research", "Storytelling", "SQL", "Power BI"],
  languages: ["English", "Malay", "Mandarin"],
  interests: ["Technology", "Community Building"],
  aspirations: ["Data Career", "Product Strategy"],
  workPreferences: ["Hybrid Work", "Cross-Functional Work"],
  personalityTraits: ["Analytical", "Empathetic"],
  projects: ["Built a graduate career dashboard"],
};

const jobs: JobListing[] = [
  {
    id: "job-data",
    title: "Data Analyst",
    company: "Talentbank Labs",
    location: "Kuala Lumpur",
    workMode: "Hybrid",
    employmentType: "Full-time",
    industry: "Recruitment Technology",
    salaryRange: "RM5,500 - RM8,500",
    requiredSkills: ["SQL", "Power BI", "Research"],
    preferredLanguages: ["English", "Malay"],
    description: "Build dashboards and talent market insights.",
    matchSignals: ["Data Career", "Technology", "Analytical"],
    postedAt: "2026-06-10",
  },
  {
    id: "job-sales",
    title: "Sales Development Representative",
    company: "CloudGrowth Asia",
    location: "Singapore",
    workMode: "On-site",
    employmentType: "Full-time",
    industry: "SaaS",
    salaryRange: "SGD3,500 - SGD5,000",
    requiredSkills: ["Cold Calling", "CRM", "Negotiation"],
    preferredLanguages: ["English"],
    description: "Build outbound sales pipeline.",
    matchSignals: ["Commercial", "Client Facing"],
    postedAt: "2026-06-08",
  },
];

describe("job market", () => {
  it("filters jobs by keyword, location, work mode, and industry", () => {
    const result = filterJobListings(jobs, {
      keyword: "dashboard",
      location: "Kuala Lumpur",
      workMode: "Hybrid",
      industry: "Recruitment Technology",
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("job-data");
  });

  it("scores job matches from skills, languages, aspirations, interests, and traits", () => {
    const score = scoreJobMatch(jobs[0], profile);
    const weakerScore = scoreJobMatch(jobs[1], profile);

    expect(score).toBeGreaterThanOrEqual(80);
    expect(score).toBeGreaterThan(weakerScore);
  });

  it("creates one application per job and keeps existing status on duplicate apply", () => {
    const existing: JobApplication[] = [
      {
        id: "app-existing",
        jobId: "job-data",
        jobTitle: "Data Analyst",
        company: "Talentbank Labs",
        status: "Interview",
        appliedAt: "2026-06-14",
        matchScore: 88,
      },
    ];

    const applications = createApplication(existing, jobs[0], 91);

    expect(applications).toHaveLength(1);
    expect(applications[0].status).toBe("Interview");
    expect(applications[0].matchScore).toBe(88);
  });

  it("summarizes application status counts", () => {
    const summary = getApplicationSummary([
      {
        id: "app-1",
        jobId: "job-1",
        jobTitle: "UX Researcher",
        company: "Talentbank Labs",
        status: "Applied",
        appliedAt: "2026-06-14",
        matchScore: 82,
      },
      {
        id: "app-2",
        jobId: "job-2",
        jobTitle: "BI Analyst",
        company: "DataWorks Asia",
        status: "Interview",
        appliedAt: "2026-06-15",
        matchScore: 89,
      },
    ]);

    expect(summary.total).toBe(2);
    expect(summary.applied).toBe(1);
    expect(summary.interview).toBe(1);
    expect(summary.offer).toBe(0);
  });
});
