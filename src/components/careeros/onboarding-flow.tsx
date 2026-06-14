"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Sparkles, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { onboardingOptions } from "@/data/onboarding-options";
import { careerDNA } from "@/data/mock-data";
import {
  emptyOnboardingSelection,
  generateCareerRecommendations,
} from "@/lib/career-intelligence";
import type {
  CareerRecommendationResult,
  OnboardingCategory,
  OnboardingSelection,
} from "@/types/careeros";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge, Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/careeros/theme-toggle";
import { cn } from "@/lib/utils";

const steps: { key: OnboardingCategory; title: string; helper: string }[] = [
  {
    key: "education",
    title: "Education Backgrounds",
    helper: "Select formal and alternative learning paths that shaped you.",
  },
  {
    key: "languages",
    title: "Languages",
    helper: "Add every language or dialect that could unlock regional opportunities.",
  },
  {
    key: "skills",
    title: "Skills",
    helper: "Choose both technical and transferable capabilities.",
  },
  {
    key: "interests",
    title: "Interests",
    helper: "CareerOS uses interests to discover serious but unexpected roles.",
  },
  {
    key: "aspirations",
    title: "Career Aspirations",
    helper: "Pick multiple goals. The AI looks for combinations, not single labels.",
  },
  {
    key: "workPreferences",
    title: "Work Preferences",
    helper: "Describe the environment where you can grow fastest.",
  },
];

const initialSelection: OnboardingSelection = emptyOnboardingSelection();

export function OnboardingFlow() {
  const [name, setName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [selection, setSelection] = useState<OnboardingSelection>(initialSelection);
  const [result, setResult] = useState<CareerRecommendationResult | null>(null);
  const activeStep = steps[stepIndex];
  const complete = stepIndex >= steps.length;
  const trimmedName = name.trim();

  const groupedOptions = useMemo(() => {
    if (complete) return {};

    return onboardingOptions[activeStep.key].reduce<Record<string, typeof onboardingOptions.education>>(
      (groups, option) => {
        groups[option.group] = [...(groups[option.group] ?? []), option];
        return groups;
      },
      {},
    );
  }, [activeStep, complete]);

  function toggle(category: OnboardingCategory, id: string) {
    setSelection((current) => {
      const selected = current[category].includes(id);
      return {
        ...current,
        [category]: selected
          ? current[category].filter((item) => item !== id)
          : [...current[category], id],
      };
    });
  }

  function completeCurrentStep() {
    if (stepIndex === steps.length - 1) {
      const generatedResult = generateCareerRecommendations(trimmedName, selection);
      setResult(generatedResult);
      setStepIndex((index) => index + 1);
      return;
    }

    setStepIndex((index) => index + 1);
  }

  useEffect(() => {
    if (!result) return;

    window.localStorage.setItem("careerOSUserName", result.profile.name);
    window.localStorage.setItem("careerOSLatestResult", JSON.stringify(result));
    window.dispatchEvent(new Event("careeros-profile-updated"));
  }, [result]);

  if (!nameSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="fixed right-5 top-5 z-20">
          <ThemeToggle />
        </div>
        <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Badge>Start your CareerOS profile</Badge>
            <h1 className="mt-4 text-4xl font-bold tracking-normal text-slate-950 md:text-5xl">
              First, tell CareerOS what to call you.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
              Your name will personalize the demo results, dashboard greeting, and
              Human Potential Profile. Nothing is sent to a backend.
            </p>
          </div>
          <Card className="p-6">
            <label
              className="text-sm font-bold uppercase tracking-wide text-slate-500"
              htmlFor="career-user-name"
            >
              Your name
            </label>
            <input
              className="mt-3 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base font-semibold text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              id="career-user-name"
              onChange={(event) => setName(event.target.value)}
              placeholder="Example: Alicia Tan"
              type="text"
              value={name}
            />
            <Button
              className="mt-5 w-full"
              disabled={trimmedName.length < 2}
              onClick={() => setNameSubmitted(true)}
            >
              Continue to career discovery <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              The next steps begin with no default selections, so every result reflects
              what the user actively chooses.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  if (complete) {
    const careerResult = result ?? generateCareerRecommendations(trimmedName, selection);
    const topRecommendation = careerResult.recommendations[0];

    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="fixed right-5 top-5 z-20">
          <ThemeToggle />
        </div>
        <div className="mx-auto max-w-6xl">
          <Badge>Career DNA generated</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-normal text-slate-950">
            {careerResult.profile.name}, your Human Potential Profile is ready.
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            {careerResult.summary} CareerOS maps active choices into career signals
            so the demo shows why each pathway is recommended.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-5">
            {careerDNA.map((item) => (
              <Card className="p-5" key={item.trait}>
                <p className="text-sm font-semibold text-slate-500">{item.trait}</p>
                <p className="mt-3 text-3xl font-bold text-blue-700">{item.score}%</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </Card>
            ))}
          </div>
          <Card className="mt-8 overflow-hidden p-0">
            <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
              <div className="bg-blue-700 p-8 text-white">
                <Sparkles className="h-8 w-8" />
                <h2 className="mt-5 text-2xl font-bold">
                  {topRecommendation?.title ?? "Career pathway"} found
                </h2>
                <p className="mt-3 text-blue-100">
                  {topRecommendation
                    ? `${topRecommendation.category} roles match your selected education, skills, languages, interests, and goals.`
                    : "Select more signals to unlock a stronger career pathway."}
                </p>
                {topRecommendation ? (
                  <div className="mt-6 rounded-lg bg-white/10 p-4">
                    <p className="text-sm font-semibold text-blue-100">Match score</p>
                    <p className="mt-1 text-4xl font-bold">{topRecommendation.match}%</p>
                    <p className="mt-1 text-sm text-blue-100">
                      Salary range: {topRecommendation.salaryRange}
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="p-8">
                <h3 className="text-lg font-bold">Why this fits you</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {(topRecommendation?.reasons ?? []).slice(0, 6).map((signal) => (
                    <div
                      className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                      key={signal}
                    >
                      <Check className="h-5 w-5 text-emerald-500" />
                      <p className="mt-3 font-semibold">{signal}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="flex items-center gap-2 font-bold">
                      <Target className="h-4 w-4 text-blue-700" />
                      Skill gaps
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(topRecommendation?.skillGaps ?? []).map((skill) => (
                        <span
                          className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700"
                          key={skill}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 font-bold">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      Next steps
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                      {(topRecommendation?.nextSteps ?? []).map((step) => (
                        <li className="flex gap-2" key={step}>
                          <Check className="mt-1 h-4 w-4 text-emerald-500" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {careerResult.recommendations.slice(1).map((item) => (
                    <Card className="p-4" key={item.title}>
                      <p className="text-sm font-bold text-slate-950">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                      <p className="mt-3 text-lg font-bold text-blue-700">
                        {item.match}% match
                      </p>
                    </Card>
                  ))}
                </div>
                <ButtonLink href="/dashboard" className="mt-6">
                  Enter CareerOS dashboard <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <Badge>Onboarding system</Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-normal text-slate-950">
              Build your Human Potential Profile
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-slate-500">
              Step {stepIndex + 1} of {steps.length}
            </p>
            <ThemeToggle />
          </div>
        </div>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200">
          <motion.div
            animate={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
            className="h-full rounded-full bg-blue-700"
          />
        </div>

        <Card className="mt-8 p-6">
          <h2 className="text-2xl font-bold">{activeStep.title}</h2>
          <p className="mt-2 text-slate-600">{activeStep.helper}</p>

          <div className="mt-6 space-y-6">
            {Object.entries(groupedOptions).map(([group, options]) => (
              <section key={group}>
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  {group}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {options.map((option) => {
                    const selected = selection[activeStep.key].includes(option.id);
                    return (
                      <button
                        className={cn(
                          "rounded-full border px-4 py-2 text-sm font-semibold transition",
                          selected
                            ? "border-blue-700 bg-blue-700 text-white shadow-md shadow-blue-700/20"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50",
                        )}
                        key={option.id}
                        onClick={() => toggle(activeStep.key, option.id)}
                        type="button"
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">
            <Button
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((index) => Math.max(index - 1, 0))}
              variant="outline"
            >
              Back
            </Button>
            <Button
              disabled={selection[activeStep.key].length === 0}
              onClick={completeCurrentStep}
            >
              {stepIndex === steps.length - 1 ? "Generate Career DNA" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
