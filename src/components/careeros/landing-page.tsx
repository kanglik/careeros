import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Globe2,
  Sparkles,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Badge, Card } from "@/components/ui/card";
import { CareerOSBrand } from "./brand";
import { ThemeToggle } from "./theme-toggle";

const trustSignals = ["Students", "Graduates", "Professionals", "Recruiters", "Universities"];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <CareerOSBrand />
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
          <a href="#platform">Platform</a>
          <a href="#ecosystem">Asia focus</a>
          <a href="#trust">Trust</a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <ButtonLink href="/register" variant="outline">
            Sign up
          </ButtonLink>
        </div>
      </header>

      <main>
        <section className="enterprise-grid relative overflow-hidden border-y border-slate-100 bg-gradient-to-b from-white to-blue-50/40">
          <div className="mx-auto grid min-h-[calc(100vh-82px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <Badge>Inspired by premium enterprise recruitment technology</Badge>
              <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-tight tracking-normal text-slate-950 md:text-6xl">
                Your Career Has More Possibilities Than Your Resume Shows.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                CareerOS discovers hidden potential, maps career paths, identifies
                skill gaps, and helps professionals across Asia build meaningful
                careers.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/register" className="h-12">
                  Start Your Career Journey <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/dashboard" variant="outline" className="h-12">
                  View product demo
                </ButtonLink>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {trustSignals.map((signal) => (
                  <span
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600"
                    key={signal}
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>

            <div className="premium-shadow rounded-2xl border border-blue-100 bg-white p-4">
              <div className="rounded-xl bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-blue-700">Career growth map</p>
                    <h2 className="mt-1 text-2xl font-bold">Marketing to Product</h2>
                  </div>
                  <Sparkles className="h-6 w-6 text-emerald-500" />
                </div>
                <div className="mt-8 space-y-5">
                  {[
                    ["Marketing Executive", "RM4.5k", 72],
                    ["Product Marketing", "RM7.8k", 84],
                    ["Associate PM", "RM9.6k", 89],
                    ["Product Manager", "RM13.5k", 94],
                  ].map(([role, salary, width]) => (
                    <div key={role}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-semibold text-slate-800">{role}</span>
                        <span className="text-slate-500">{salary}</span>
                      </div>
                      <div className="h-3 rounded-full bg-white">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-blue-700 to-emerald-500"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    [BarChart3, "Fair salary", "RM5.8k"],
                    [BriefcaseBusiness, "Hidden fit", "UX Research"],
                    [Globe2, "Regional lift", "+240%"],
                  ].map(([Icon, label, value]) => (
                    <Card className="p-4" key={String(label)}>
                      <Icon className="h-5 w-5 text-blue-700" />
                      <p className="mt-3 text-xs font-medium text-slate-500">{String(label)}</p>
                      <p className="mt-1 text-lg font-bold text-slate-950">{String(value)}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="platform" className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              "Potential beyond resume keywords",
              "Transferable skill discovery",
              "Asia-ready language and salary intelligence",
            ].map((item) => (
              <Card className="p-6" key={item}>
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                <h3 className="mt-4 text-lg font-bold">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Designed for diverse education paths, multilingual talent, and
                  nonlinear career growth.
                </p>
              </Card>
            ))}
          </div>
        </section>
        <section id="ecosystem" className="border-y border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <Badge>Asia focus</Badge>
            <div className="mt-5 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <h2 className="text-3xl font-bold tracking-normal">
                  Built for a diverse Asian talent ecosystem.
                </h2>
                <p className="mt-3 text-slate-600">
                  CareerOS supports multilingual talent, alternative credentials,
                  cross-border roles, and nonlinear career pathways across Malaysia,
                  Singapore, Thailand, Vietnam, Indonesia, and the Philippines.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Languages", "Transferable skills", "Regional mobility"].map((item) => (
                  <Card className="p-4" key={item}>
                    <p className="text-sm font-bold text-blue-700">{item}</p>
                    <p className="mt-2 text-sm text-slate-600">
                      Used as a career signal, not a simple filter.
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="trust" className="mx-auto max-w-7xl px-6 py-16">
          <Badge>Trust layer</Badge>
          <div className="mt-5 grid gap-5 md:grid-cols-5">
            {trustSignals.map((signal) => (
              <Card className="p-5 text-center" key={signal}>
                <p className="font-bold text-slate-950">{signal}</p>
                <p className="mt-2 text-sm text-slate-600">
                  Clear, human-centered career intelligence.
                </p>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
