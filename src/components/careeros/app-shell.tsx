"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BriefcaseBusiness, ClipboardList, Menu, Search, UserRound } from "lucide-react";
import { CareerOSBrand } from "./brand";
import { ThemeToggle } from "./theme-toggle";
import { moduleLinks } from "@/data/mock-data";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { title: "Dashboard", href: "/dashboard", icon: BriefcaseBusiness },
  { title: "Job Listings", href: "/jobs", icon: Search },
  { title: "Applications", href: "/applications", icon: ClipboardList },
  { title: "Human Potential Profile", href: "/profile", icon: UserRound },
  ...moduleLinks,
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-white px-5 py-6 lg:block">
        <CareerOSBrand />
        <nav className="mt-8 space-y-1">
          {primaryLinks.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                )}
                href={item.href}
                key={item.href}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:ml-72">
        <div className="flex items-center justify-between">
          <div className="lg:hidden">
            <CareerOSBrand />
          </div>
          <div className="hidden text-sm font-medium text-slate-500 lg:block">
            AI-powered career intelligence for Asian talent ecosystems
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              className="hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:inline-flex"
              href="/recruiter"
            >
              Recruiter view
            </Link>
            <button
              aria-label="Toggle navigation"
              aria-expanded={mobileNavOpen}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 lg:hidden"
              onClick={() => setMobileNavOpen((open) => !open)}
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        {mobileNavOpen ? (
          <nav className="mt-4 grid gap-2 border-t border-slate-200 pt-4 lg:hidden">
            {primaryLinks.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                  )}
                  href={item.href}
                  key={item.href}
                  onClick={() => setMobileNavOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        ) : null}
      </header>

      <main className="lg:ml-72">{children}</main>
    </div>
  );
}
