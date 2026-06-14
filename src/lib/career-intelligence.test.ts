import { describe, expect, it } from "vitest";
import {
  calculateOpportunityScore,
  discoverHiddenOpportunities,
  emptyOnboardingSelection,
  generateCareerRecommendations,
} from "./career-intelligence";

const journalismProfile = {
  education: ["Bachelor of Communication", "Diploma in Journalism"],
  skills: ["Interviewing", "Storytelling", "Research", "Canva"],
  languages: ["English", "Malay", "Mandarin"],
  interests: ["Technology", "Travel", "Community Building"],
  aspirations: ["Product Strategy", "Regional Mobility", "Meaningful Work"],
  personalityTraits: ["Curious", "Empathetic", "Analytical"],
};

describe("career intelligence", () => {
  it("starts onboarding with no selected chips", () => {
    expect(emptyOnboardingSelection()).toEqual({
      education: [],
      languages: [],
      skills: [],
      interests: [],
      aspirations: [],
      workPreferences: [],
    });
  });

  it("scores transferable matches using combined profile signals", () => {
    const score = calculateOpportunityScore(journalismProfile, {
      title: "UX Researcher",
      requiredSignals: ["Research", "Interviewing", "Empathetic", "Technology"],
      bonusSignals: ["Mandarin", "Storytelling", "Product Strategy"],
    });

    expect(score).toBeGreaterThanOrEqual(85);
  });

  it("recommends realistic non-linear careers with explanations", () => {
    const opportunities = discoverHiddenOpportunities(journalismProfile);

    expect(opportunities[0].title).toBe("UX Researcher");
    expect(opportunities[0].match).toBeGreaterThanOrEqual(85);
    expect(opportunities[0].reasons).toContain("Interviewing");
    expect(opportunities.map((item) => item.title)).toContain(
      "Product Marketing Associate",
    );
  });

  it("generates different ranked careers from different onboarding signals", () => {
    const dataResult = generateCareerRecommendations("Alicia", {
      education: ["degree-data"],
      languages: ["english"],
      skills: ["sql", "python", "power-bi", "excel"],
      interests: ["technology", "finance"],
      aspirations: ["data-career", "earn-rm10k"],
      workPreferences: ["analytical", "structured"],
    });

    const productResult = generateCareerRecommendations("Marcus", {
      education: ["degree-communication"],
      languages: ["english", "mandarin"],
      skills: ["research", "interviewing", "storytelling", "digital-marketing"],
      interests: ["technology", "community-work"],
      aspirations: ["product-strategy-aspiration", "regional-mobility"],
      workPreferences: ["cross-functional", "client-facing"],
    });

    expect(dataResult.profile.name).toBe("Alicia");
    expect(productResult.profile.name).toBe("Marcus");
    expect(dataResult.recommendations[0].title).not.toBe(
      productResult.recommendations[0].title,
    );
    expect(dataResult.recommendations[0].title).toMatch(/Data|BI|Analytics/);
    expect(productResult.recommendations[0].title).toMatch(/UX|Product/);
    expect(productResult.recommendations[0].reasons.length).toBeGreaterThan(0);
    expect(productResult.recommendations[0].nextSteps.length).toBeGreaterThan(0);
    expect(productResult.recommendations[0].skillGaps.length).toBeGreaterThan(0);
  });
});
