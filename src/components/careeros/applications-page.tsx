"use client";

import { useMemo, useSyncExternalStore } from "react";
import { CalendarDays, CheckCircle2, ClipboardList, FileCheck2 } from "lucide-react";
import { getApplicationSummary } from "@/lib/job-market";
import type { JobApplication } from "@/types/careeros";
import { Badge, Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

const applicationStorageKey = "careerOSApplications";

const demoApplications: JobApplication[] = [
  {
    id: "demo-app-1",
    jobId: "nexus-ux-researcher",
    jobTitle: "UX Research Associate",
    company: "Nexus Product Studio",
    status: "Interview",
    appliedAt: "2026-06-14",
    matchScore: 88,
  },
  {
    id: "demo-app-2",
    jobId: "talentbank-data-analyst",
    jobTitle: "Data Analyst",
    company: "Talentbank Labs",
    status: "Applied",
    appliedAt: "2026-06-15",
    matchScore: 84,
  },
];

function subscribeToApplications(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("careeros-applications-updated", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("careeros-applications-updated", onStoreChange);
  };
}

function getApplicationsSnapshot() {
  return window.localStorage.getItem(applicationStorageKey) ?? "";
}

function getServerApplicationsSnapshot() {
  return "";
}

function parseApplications(snapshot: string): JobApplication[] {
  if (!snapshot) return demoApplications;

  try {
    const parsed = JSON.parse(snapshot);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : demoApplications;
  } catch {
    return demoApplications;
  }
}

export function ApplicationsPage() {
  const applicationsSnapshot = useSyncExternalStore(
    subscribeToApplications,
    getApplicationsSnapshot,
    getServerApplicationsSnapshot,
  );
  const applications = useMemo(
    () => parseApplications(applicationsSnapshot),
    [applicationsSnapshot],
  );
  const summary = getApplicationSummary(applications);

  const metrics = [
    { label: "Total applications", value: summary.total, icon: ClipboardList },
    { label: "Applied", value: summary.applied, icon: FileCheck2 },
    { label: "Interview", value: summary.interview, icon: CalendarDays },
    { label: "Offer", value: summary.offer, icon: CheckCircle2 },
  ];

  return (
    <div className="px-5 py-8 md:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <Badge>Job applications</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-normal text-slate-950 md:text-4xl">
            Track every opportunity in one place
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            CareerOS keeps a simple application pipeline so candidates can see
            where each matched role stands.
          </p>
        </div>
        <ButtonLink href="/jobs" variant="outline">
          Find more jobs
        </ButtonLink>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card className="p-5" key={metric.label}>
              <Icon className="h-5 w-5 text-blue-700" />
              <p className="mt-4 text-sm font-semibold text-slate-500">{metric.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">{metric.value}</p>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 overflow-hidden p-0">
        <div className="grid border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 md:grid-cols-[1.3fr_1fr_0.8fr_0.7fr]">
          <span>Role</span>
          <span>Company</span>
          <span>Status</span>
          <span>Match</span>
        </div>
        {applications.map((application) => (
          <div
            className="grid gap-3 border-b border-slate-100 px-5 py-5 last:border-b-0 md:grid-cols-[1.3fr_1fr_0.8fr_0.7fr] md:items-center"
            key={application.id}
          >
            <div>
              <p className="font-bold text-slate-950">{application.jobTitle}</p>
              <p className="mt-1 text-sm text-slate-500">
                Applied on {application.appliedAt}
              </p>
            </div>
            <p className="font-semibold text-slate-700">{application.company}</p>
            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
              {application.status}
            </span>
            <p className="text-xl font-bold text-emerald-600">
              {application.matchScore}%
            </p>
          </div>
        ))}
      </Card>
    </div>
  );
}
