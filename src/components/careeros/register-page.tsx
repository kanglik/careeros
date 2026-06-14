"use client";

import { useState } from "react";
import { ArrowRight, ShieldCheck, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import type { RegistrationProfile } from "@/types/careeros";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge, Card } from "@/components/ui/card";
import { CareerOSBrand } from "@/components/careeros/brand";
import { ThemeToggle } from "@/components/careeros/theme-toggle";

const registrationStorageKey = "careerOSRegistration";
const userNameStorageKey = "careerOSUserName";

export function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<RegistrationProfile["role"]>("Student");
  const [saved, setSaved] = useState(false);

  const canSubmit = name.trim().length >= 2 && email.includes("@");

  function submitRegistration() {
    if (!canSubmit) return;

    const profile: RegistrationProfile = {
      name: name.trim(),
      email: email.trim(),
      role,
      createdAt: new Date().toISOString(),
    };

    window.localStorage.setItem(registrationStorageKey, JSON.stringify(profile));
    window.localStorage.setItem(userNameStorageKey, profile.name);
    window.dispatchEvent(new Event("careeros-profile-updated"));
    setSaved(true);
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-6">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <CareerOSBrand />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <ButtonLink href="/" variant="outline">
            Back home
          </ButtonLink>
        </div>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-92px)] max-w-6xl items-center gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Badge>Sign up and register</Badge>
          <h1 className="mt-5 text-4xl font-bold tracking-normal text-slate-950 md:text-5xl">
            Create your CareerOS demo profile
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
            This prototype registration shows how students, graduates,
            professionals, recruiters, and universities enter the platform before
            building their career profile.
          </p>
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
            <ShieldCheck className="h-5 w-5" />
            Demo only: no backend, no password, no data leaves this browser.
          </div>
        </div>

        <Card className="p-6">
          {saved ? (
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500 text-white">
                <UserPlus className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-bold">Registration saved</h2>
              <p className="mt-3 text-slate-600">
                Your demo account is ready. Continue to onboarding to generate a
                personalized Career DNA and job matches.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => router.push("/onboarding")} type="button">
                  Continue onboarding <ArrowRight className="h-4 w-4" />
                </Button>
                <ButtonLink href="/dashboard" variant="outline">
                  Go to dashboard
                </ButtonLink>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold">Register</h2>
              <p className="mt-2 text-sm text-slate-600">
                Enter simple details to personalize the clickable demo.
              </p>

              <label className="mt-6 block text-sm font-bold text-slate-700">
                Full name
                <input
                  className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Example: Alicia Tan"
                  value={name}
                />
              </label>

              <label className="mt-4 block text-sm font-bold text-slate-700">
                Email
                <input
                  className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                />
              </label>

              <label className="mt-4 block text-sm font-bold text-slate-700">
                I am a
                <select
                  className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none"
                  onChange={(event) =>
                    setRole(event.target.value as RegistrationProfile["role"])
                  }
                  value={role}
                >
                  {["Student", "Graduate", "Professional", "Recruiter", "University"].map(
                    (item) => (
                      <option key={item}>{item}</option>
                    ),
                  )}
                </select>
              </label>

              <Button
                className="mt-6 w-full"
                disabled={!canSubmit}
                onClick={submitRegistration}
                type="button"
              >
                Create demo account <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
