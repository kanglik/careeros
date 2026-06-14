import { cn } from "@/lib/utils";

type ProgressRingProps = {
  value: number;
  label: string;
  size?: "sm" | "md";
  className?: string;
};

export function ProgressRing({
  value,
  label,
  size = "md",
  className,
}: ProgressRingProps) {
  const gradientId = `career-gradient-${label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}-${value}`;
  const diameter = size === "sm" ? 92 : 124;
  const strokeWidth = size === "sm" ? 8 : 10;
  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative" style={{ width: diameter, height: diameter }}>
        <svg width={diameter} height={diameter} className="-rotate-90">
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          <defs>
            <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-slate-950">
          {value}
        </div>
      </div>
      <span className="text-center text-sm font-medium text-slate-600">{label}</span>
    </div>
  );
}
