"use client";

import { useSyncExternalStore } from "react";
import { Badge } from "@/components/ui/card";

function subscribeToUserName(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("careeros-profile-updated", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("careeros-profile-updated", onStoreChange);
  };
}

function getUserNameSnapshot() {
  return window.localStorage.getItem("careerOSUserName")?.trim() ?? "";
}

function getServerSnapshot() {
  return "";
}

export function DashboardGreeting() {
  const name = useSyncExternalStore(
    subscribeToUserName,
    getUserNameSnapshot,
    getServerSnapshot,
  );

  return <Badge>{name ? `Good Morning, ${name}` : "Good Morning"}</Badge>;
}
