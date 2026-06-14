import type {
  ApplicationSummary,
  JobApplication,
  JobListing,
  JobSearchFilters,
  TalentProfile,
} from "@/types/careeros";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function includesText(value: string, query: string) {
  return normalize(value).includes(normalize(query));
}

function profileSignals(profile: TalentProfile) {
  return new Set(
    [
      ...profile.education,
      ...profile.skills,
      ...profile.languages,
      ...profile.interests,
      ...profile.aspirations,
      ...profile.workPreferences,
      ...profile.personalityTraits,
      ...profile.projects,
    ].map(normalize),
  );
}

export function filterJobListings(
  jobs: JobListing[],
  filters: JobSearchFilters,
): JobListing[] {
  const keyword = filters.keyword.trim();

  return jobs.filter((job) => {
    const keywordMatch =
      keyword.length === 0 ||
      [
        job.title,
        job.company,
        job.location,
        job.industry,
        job.description,
        ...job.requiredSkills,
        ...job.preferredLanguages,
        ...job.matchSignals,
      ].some((value) => includesText(value, keyword));

    const locationMatch =
      filters.location === "All" || includesText(job.location, filters.location);
    const workModeMatch = filters.workMode === "All" || job.workMode === filters.workMode;
    const industryMatch =
      filters.industry === "All" || includesText(job.industry, filters.industry);

    return keywordMatch && locationMatch && workModeMatch && industryMatch;
  });
}

export function scoreJobMatch(job: JobListing, profile: TalentProfile): number {
  const signals = profileSignals(profile);
  const skillMatches = job.requiredSkills.filter((skill) => signals.has(normalize(skill)));
  const languageMatches = job.preferredLanguages.filter((language) =>
    signals.has(normalize(language)),
  );
  const signalMatches = job.matchSignals.filter((signal) => signals.has(normalize(signal)));

  const skillRatio = skillMatches.length / Math.max(job.requiredSkills.length, 1);
  const languageRatio =
    languageMatches.length / Math.max(job.preferredLanguages.length, 1);
  const signalRatio = signalMatches.length / Math.max(job.matchSignals.length, 1);

  return Math.min(Math.round(35 + skillRatio * 35 + languageRatio * 15 + signalRatio * 15), 98);
}

export function createApplication(
  existingApplications: JobApplication[],
  job: JobListing,
  matchScore: number,
): JobApplication[] {
  if (existingApplications.some((application) => application.jobId === job.id)) {
    return existingApplications;
  }

  const today = new Date().toISOString().slice(0, 10);

  return [
    {
      id: `app-${job.id}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      status: "Applied",
      appliedAt: today,
      matchScore,
    },
    ...existingApplications,
  ];
}

export function getApplicationSummary(
  applications: JobApplication[],
): ApplicationSummary {
  return applications.reduce<ApplicationSummary>(
    (summary, application) => {
      summary.total += 1;

      if (application.status === "Applied") summary.applied += 1;
      if (application.status === "Interview") summary.interview += 1;
      if (application.status === "Offer") summary.offer += 1;

      return summary;
    },
    { total: 0, applied: 0, interview: 0, offer: 0 },
  );
}
