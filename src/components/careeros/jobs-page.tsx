"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { BriefcaseBusiness, Check, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { jobListings, defaultJobSearchFilters } from "@/data/jobs";
import { demoProfile } from "@/data/mock-data";
import { createApplication, filterJobListings, scoreJobMatch } from "@/lib/job-market";
import type { JobApplication, JobSearchFilters } from "@/types/careeros";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge, Card } from "@/components/ui/card";

const applicationStorageKey = "careerOSApplications";

function parseApplications(snapshot: string): JobApplication[] {
  try {
    return JSON.parse(snapshot);
  } catch {
    return [];
  }
}

function writeApplications(applications: JobApplication[]) {
  window.localStorage.setItem(applicationStorageKey, JSON.stringify(applications));
  window.dispatchEvent(new Event("careeros-applications-updated"));
}

function subscribeToApplications(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("careeros-applications-updated", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("careeros-applications-updated", onStoreChange);
  };
}

function getApplicationsSnapshot() {
  return window.localStorage.getItem(applicationStorageKey) ?? "[]";
}

function getServerApplicationsSnapshot() {
  return "[]";
}

export function JobsPage() {
  const [filters, setFilters] = useState<JobSearchFilters>(defaultJobSearchFilters);
  const applicationsSnapshot = useSyncExternalStore(
    subscribeToApplications,
    getApplicationsSnapshot,
    getServerApplicationsSnapshot,
  );
  const applications = useMemo(
    () => parseApplications(applicationsSnapshot),
    [applicationsSnapshot],
  );

  const locations = useMemo(
    () => ["All", ...Array.from(new Set(jobListings.map((job) => job.location)))],
    [],
  );
  const industries = useMemo(
    () => ["All", ...Array.from(new Set(jobListings.map((job) => job.industry)))],
    [],
  );
  const filteredJobs = useMemo(
    () => filterJobListings(jobListings, filters),
    [filters],
  );

  function updateFilter<K extends keyof JobSearchFilters>(
    key: K,
    value: JobSearchFilters[K],
  ) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function applyToJob(jobId: string) {
    const job = jobListings.find((item) => item.id === jobId);
    if (!job) return;

    const updatedApplications = createApplication(
      applications,
      job,
      scoreJobMatch(job, demoProfile),
    );
    writeApplications(updatedApplications);
  }

  return (
    <div className="px-5 py-8 md:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <Badge>Job listings</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-normal text-slate-950 md:text-4xl">
            Search roles matched to your Career DNA
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            Browse realistic job opportunities, filter by keyword and work style,
            and apply with one click in this prototype.
          </p>
        </div>
        <ButtonLink href="/applications" variant="outline">
          View applications
        </ButtonLink>
      </div>

      <Card className="p-5">
        <div className="grid gap-3 xl:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <input
              className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              onChange={(event) => updateFilter("keyword", event.target.value)}
              placeholder="Search title, skill, company, keyword"
              value={filters.keyword}
            />
          </label>
          <select
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none"
            onChange={(event) => updateFilter("location", event.target.value)}
            value={filters.location}
          >
            {locations.map((location) => (
              <option key={location}>{location}</option>
            ))}
          </select>
          <select
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none"
            onChange={(event) =>
              updateFilter("workMode", event.target.value as JobSearchFilters["workMode"])
            }
            value={filters.workMode}
          >
            {["All", "Remote", "Hybrid", "On-site"].map((mode) => (
              <option key={mode}>{mode}</option>
            ))}
          </select>
          <select
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none"
            onChange={(event) => updateFilter("industry", event.target.value)}
            value={filters.industry}
          >
            {industries.map((industry) => (
              <option key={industry}>{industry}</option>
            ))}
          </select>
          <Button
            onClick={() => setFilters(defaultJobSearchFilters)}
            type="button"
            variant="outline"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </Card>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {filteredJobs.map((job) => {
          const matchScore = scoreJobMatch(job, demoProfile);
          const applied = applications.some((application) => application.jobId === job.id);

          return (
            <Card className="p-6" key={job.id}>
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{job.employmentType}</Badge>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      {job.workMode}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-slate-950">{job.title}</h2>
                  <p className="mt-1 font-semibold text-slate-600">{job.company}</p>
                </div>
                <div className="rounded-lg bg-blue-50 px-4 py-3 text-center">
                  <p className="text-xs font-bold uppercase text-blue-700">Match</p>
                  <p className="mt-1 text-3xl font-bold text-blue-700">{matchScore}%</p>
                </div>
              </div>

              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-600">
                <MapPin className="h-4 w-4 text-blue-700" />
                {job.location} | {job.industry} | {job.salaryRange}
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-600">{job.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.requiredSkills.map((skill) => (
                  <span
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button disabled={applied} onClick={() => applyToJob(job.id)} type="button">
                  {applied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Applied
                    </>
                  ) : (
                    <>
                      <BriefcaseBusiness className="h-4 w-4" />
                      Apply now
                    </>
                  )}
                </Button>
                <ButtonLink href="/profile" variant="outline">
                  Review resume fit
                </ButtonLink>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredJobs.length === 0 ? (
        <Card className="mt-6 p-8 text-center">
          <h2 className="text-xl font-bold">No jobs match this search</h2>
          <p className="mt-2 text-slate-600">
            Try a broader keyword or reset filters to view all demo roles.
          </p>
        </Card>
      ) : null}
    </div>
  );
}
