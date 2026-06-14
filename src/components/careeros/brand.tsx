import Link from "next/link";
import { Sparkles } from "lucide-react";

export function CareerOSBrand() {
  return (
    <Link className="flex items-center gap-3" href="/">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 text-white shadow-lg shadow-blue-700/20">
        <Sparkles className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-lg font-bold tracking-tight text-slate-950">
          CareerOS
        </span>
        <span className="block text-xs font-medium text-slate-500">
          Discover who you can become.
        </span>
      </span>
    </Link>
  );
}
