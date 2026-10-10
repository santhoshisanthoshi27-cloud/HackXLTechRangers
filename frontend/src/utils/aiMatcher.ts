import type { Campaign, Creator, MatchScoreDetails } from '../types';

/**
 * Deterministic multi-attribute heuristic matcher for NECTO AI Match prototype.
 * Evaluates compatibility across 5 distinct dimensions (total: 100 points):
 * 1. Niche Alignment (Max 35 pts)
 * 2. Platform Overlap (Max 25 pts)
 * 3. Budget Compatibility (Max 20 pts)
 * 4. Engagement & Audience Quality (Max 10 pts)
 * 5. Current Availability (Max 10 pts)
 * 
 * NOTE: This is a client-side rule-based/heuristic matching engine designed
 * for interactive demo and hackathon presentation. It will connect to a
 * trained vector-similarity ML service in backend phases.
 */
export function calculateCreatorMatch(
  campaign: Partial<Campaign> | null | undefined, 
  creator: Partial<Creator> | null | undefined
): MatchScoreDetails {
  if (!campaign || !creator) {
    return {
      overallScore: 0,
      nicheMatch: false,
      nicheScore: 0,
      platformMatchCount: 0,
      platformScore: 0,
      budgetCompatible: false,
      budgetScore: 0,
      audienceScore: 0,
      availabilityMatch: false,
      availabilityScore: 0,
      reasons: ['Insufficient campaign or creator parameters provided.']
    };
  }

  const reasons: string[] = [];

  // 1. Niche Alignment (Max 35 points)
  const creatorPrimaryNiche = (creator.primaryNiche || '').trim().toLowerCase();
  const campNiche = (campaign.preferredNiche || '').trim().toLowerCase();
  const creatorNiches = (creator.niches || []).map(n => (n || '').toLowerCase());

  let nicheScore = 0;
  let nicheMatch = false;

  if (campNiche && creatorPrimaryNiche === campNiche) {
    nicheScore = 35;
    nicheMatch = true;
    reasons.push(`Direct primary niche match in ${campaign.preferredNiche}`);
  } else if (campNiche && creatorNiches.includes(campNiche)) {
    nicheScore = 24;
    nicheMatch = true;
    reasons.push(`Secondary niche alignment in ${campaign.preferredNiche}`);
  } else {
    nicheScore = 0;
  }

  // 2. Platform Compatibility (Max 25 points)
  const campaignPlatforms = campaign.platforms || [];
  const creatorPlatforms = creator.platforms || [];
  const sharedPlatforms = creatorPlatforms.filter(p => campaignPlatforms.includes(p));
  const platformMatchCount = sharedPlatforms.length;

  let platformScore = 0;
  if (campaignPlatforms.length > 0 && platformMatchCount > 0) {
    platformScore = Math.min(25, Math.round((platformMatchCount / campaignPlatforms.length) * 25));
    reasons.push(`Platform compatibility across ${sharedPlatforms.join(', ')}`);
  } else {
    platformScore = 0;
  }

  // 3. Budget Compatibility (Max 20 points)
  const campBudget = Number(campaign.budget || 0);
  const minBudget = Number(creator.minBudget || 0);
  const maxBudget = Number(creator.maxBudget || minBudget || 1);

  let budgetScore = 0;
  let budgetCompatible = false;

  if (campBudget > 0 && minBudget > 0 && campBudget >= minBudget && campBudget <= maxBudget * 1.25) {
    budgetScore = 20;
    budgetCompatible = true;
    reasons.push(`Budget (${campaign.budgetDisplay || `$${campBudget}`}) aligns with pricing bracket (${creator.pricingRange || `$${minBudget}-$${maxBudget}`})`);
  } else if (campBudget > 0 && minBudget > 0 && campBudget >= minBudget * 0.75) {
    budgetScore = 12;
    budgetCompatible = true;
    reasons.push(`Budget is within close negotiable range of creator base tier`);
  } else if (campBudget > 0 && campBudget > maxBudget * 1.25) {
    budgetScore = 15; // Above creator rate
    budgetCompatible = true;
    reasons.push(`Budget fully exceeds creator minimum requirements`);
  } else {
    budgetScore = 0;
  }

  // 4. Engagement & Audience Quality (Max 10 points)
  const engagementRate = Number(creator.engagementRate || 0);
  let audienceScore = 0;

  if (engagementRate >= 5.0) {
    audienceScore = 10;
    reasons.push(`High engagement rate (${engagementRate}%) indicates strong organic reach`);
  } else if (engagementRate >= 3.5) {
    audienceScore = 7;
    reasons.push(`Healthy engagement rate (${engagementRate}%)`);
  } else if (engagementRate >= 1.0) {
    audienceScore = 4;
    reasons.push(`Consistent baseline engagement (${engagementRate}%)`);
  } else {
    audienceScore = 0;
  }

  // 5. Real-time Availability (Max 10 points)
  const availabilityMatch = Boolean(creator.available);
  let availabilityScore = 0;

  if (availabilityMatch) {
    availabilityScore = 10;
    reasons.push('Creator is currently open for immediate brand collaborations');
  } else {
    availabilityScore = 0;
  }

  // Strictly sum component scores, bounded [0, 100]
  const totalRaw = nicheScore + platformScore + budgetScore + audienceScore + availabilityScore;
  const overallScore = Math.max(0, Math.min(100, Math.round(totalRaw)));

  return {
    overallScore,
    nicheMatch,
    nicheScore,
    platformMatchCount,
    platformScore,
    budgetCompatible,
    budgetScore,
    audienceScore,
    availabilityMatch,
    availabilityScore,
    reasons
  };
}
