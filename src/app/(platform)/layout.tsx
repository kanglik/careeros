import { AppShell } from "@/components/careeros/app-shell";

export default function PlatformLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}
