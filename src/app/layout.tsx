import type { Metadata } from "next";
import { themePreferenceScript } from "@/lib/theme-preference";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerOS | Discover who you can become",
  description:
    "An AI-powered Career Operating System prototype for Asian talent discovery, growth, and opportunity matching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
      style={
        {
          "--font-geist-sans": "Arial, Helvetica, sans-serif",
          "--font-geist-mono":
            '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
        } as React.CSSProperties
      }
    >
      <body className="min-h-full bg-white text-slate-950">
        <script dangerouslySetInnerHTML={{ __html: themePreferenceScript }} />
        {children}
      </body>
    </html>
  );
}
