# CareerOS

CareerOS is a high-fidelity frontend prototype for an AI-powered Career
Operating System designed for Asian talent discovery, career growth, salary
fairness, and hidden opportunity matching.

Tagline: **Discover who you can become.**

## Prototype Scope

- Landing page with premium enterprise recruitment-tech positioning.
- Multi-step onboarding with large categorized multi-select chip libraries.
- Career DNA and Human Potential Profile.
- Dashboard with career score, potential score, salary fairness, and progress.
- Nine product modules:
  - Career Path Navigator
  - AI Career Coach
  - Fair Pay Engine
  - Skill Gap Analyzer
  - Smart Talent Matching
  - Hidden Opportunity Discovery
  - Language Advantage Engine
  - Passion to Career Engine
  - Career Simulator
- Recruiter dashboard focused on potential, not resume keyword matching.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn-style local UI components
- Vitest

## Local Development

Use `npm.cmd` on Windows PowerShell:

```powershell
npm.cmd run dev -- --port 3000
```

Open:

```text
http://localhost:3000
```

## Local Preview Server

For a more stable Windows preview, use the project scripts:

```powershell
scripts\start_careeros_server.cmd
scripts\status_careeros_server.cmd
scripts\stop_careeros_server.cmd
```

To start without keeping a command prompt open, double-click:

```text
scripts\start_careeros_server_hidden.vbs
```

Then check the server with:

```text
scripts\status_careeros_server.cmd
```

The start script runs the server on:

```text
http://localhost:3000
```

It also prints LAN URLs such as:

```text
http://10.0.125.37:3000
```

Use the LAN URL from another phone, tablet, or laptop on the same network.

If another device cannot open the LAN URL:

- Make sure both devices are on the same Wi-Fi or LAN.
- Use the IP address printed by `scripts\status_careeros_server.cmd`.
- Allow inbound TCP traffic on port `3000` in Windows Defender Firewall.
- Some school, office, hotel, or phone hotspot networks block device-to-device access.

## Verification

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
```

The prototype uses local mock data only. No backend, database, real secrets, or
external AI API calls are required.
