/**
 * Pricing Calculator for Store Branding Projects
 * Converts fixture quantities into detailed cost estimates
 */

// Pricing constants (Indian Market - 2025)
const FIXTURE_PRICES = {
  gondola: 18000,
  wallRack: 4500,
  podium: 6000,
  cashCounter: 25000,
  basketStand: 3000,
  pillarWrap: 3000
};

const BRANDING_COSTS = {
  signage: {
    led: { small: 15000, medium: 30000, large: 45000 },
    nonLed: { small: 8000, medium: 15000, large: 20000 }
  },
  wallGraphicsPer100Sqft: 12000,
  floorGraphicsPer100Sqft: 8000
};

const CAMPAIGN_COSTS = {
  seasonal: { min: 15000, max: 50000 },
  launch: { min: 30000, max: 80000 },
  standard: { min: 8000, max: 20000 },
  none: { min: 0, max: 0 }
};

const CITY_MULTIPLIERS = {
  tier1: 1.0, // Mumbai, Delhi, Bangalore, Pune
  tier2: 0.85, // Jaipur, Lucknow, Indore, Chandigarh
  tier3: 0.75
};

const TIER1_CITIES = ['mumbai', 'delhi', 'bangalore', 'pune', 'hyderabad', 'chennai'];
const TIER2_CITIES = ['jaipur', 'lucknow', 'indore', 'chandigarh', 'ahmedabad', 'surat', 'kochi', 'coimbatore'];

const GST_RATE = 0.18;

/**
 * Get city tier based on city name
 */
function getCityTier(city) {
  const cityLower = city.toLowerCase();
  if (TIER1_CITIES.includes(cityLower)) return 'tier1';
  if (TIER2_CITIES.includes(cityLower)) return 'tier2';
  return 'tier3';
}

/**
 * Calculate signage cost based on store area
 */
function calculateSignageCost(area, signageType = 'led') {
  const costs = BRANDING_COSTS.signage[signageType];
  if (area < 500) return costs.small;
  if (area < 1000) return costs.medium;
  return costs.large;
}

/**
 * Calculate campaign cost based on type and store area
 */
function calculateCampaignCost(campaignType, area) {
  const campaign = CAMPAIGN_COSTS[campaignType] || CAMPAIGN_COSTS.none;
  // Scale campaign cost based on store area
  const scaleFactor = Math.min(area / 500, 2); // Cap at 2x for very large stores
  return Math.round(campaign.min + (campaign.max - campaign.min) * scaleFactor * 0.5);
}

/**
 * Calculate complete pricing estimate
 * @param {Object} fixtureData - Output from storeCalculator
 * @param {string} city - City name for logistics multiplier
 * @param {string} campaignType - Type of campaign (seasonal/launch/standard/none)
 * @param {Object} brandingOptions - Branding preferences
 * @returns {Object} Complete pricing breakdown
 */
export function calculateEstimate(fixtureData, city, campaignType = 'none', brandingOptions = {}) {
  const { calculations, areaUtilization } = fixtureData;
  const { signageType = 'led' } = brandingOptions;
  
  // 1. Calculate fixture costs
  const fixtures = {
    gondolas: {
      qty: calculations.gondolaUnits,
      unitPrice: FIXTURE_PRICES.gondola,
      total: calculations.gondolaUnits * FIXTURE_PRICES.gondola
    },
    wallRacks: {
      qty: calculations.wallRackSections,
      unitPrice: FIXTURE_PRICES.wallRack,
      total: calculations.wallRackSections * FIXTURE_PRICES.wallRack
    },
    podiums: {
      qty: calculations.productPodiums,
      unitPrice: FIXTURE_PRICES.podium,
      total: calculations.productPodiums * FIXTURE_PRICES.podium
    },
    cashCounter: {
      qty: calculations.cashCounter,
      unitPrice: FIXTURE_PRICES.cashCounter,
      total: calculations.cashCounter * FIXTURE_PRICES.cashCounter
    },
    basketStands: {
      qty: calculations.basketStands,
      unitPrice: FIXTURE_PRICES.basketStand,
      total: calculations.basketStands * FIXTURE_PRICES.basketStand
    },
    pillarWraps: {
      qty: calculations.pillarWraps,
      unitPrice: FIXTURE_PRICES.pillarWrap,
      total: calculations.pillarWraps * FIXTURE_PRICES.pillarWrap
    }
  };
  
  const fixtureTotal = Object.values(fixtures).reduce((sum, item) => sum + item.total, 0);
  
  // 2. Calculate branding costs
  const signageCost = calculateSignageCost(areaUtilization.totalArea, signageType);
  const wallGraphicsArea = Math.ceil(areaUtilization.totalArea / 100);
  const wallGraphicsCost = wallGraphicsArea * BRANDING_COSTS.wallGraphicsPer100Sqft;
  
  const branding = {
    signage: {
      type: signageType.toUpperCase(),
      total: signageCost
    },
    wallGraphics: {
      sqft: wallGraphicsArea * 100,
      total: wallGraphicsCost
    }
  };
  
  const brandingTotal = signageCost + wallGraphicsCost;
  
  // 3. Calculate campaign costs
  const campaignCost = calculateCampaignCost(campaignType, areaUtilization.totalArea);
  const campaign = {
    type: campaignType,
    total: campaignCost
  };
  
  // 4. Apply city multiplier
  const cityTier = getCityTier(city);
  const multiplier = CITY_MULTIPLIERS[cityTier];
  const subtotalBeforeLogistics = fixtureTotal + brandingTotal + campaignCost;
  const adjustedCost = Math.round(subtotalBeforeLogistics * multiplier);
  
  const logistics = {
    city: city,
    multiplier: multiplier,
    adjustedCost: adjustedCost
  };
  
  // 5. Calculate GST and totals
  const subtotal = adjustedCost;
  const gst = Math.round(subtotal * GST_RATE);
  const grandTotal = subtotal + gst;
  
  // 6. Payment schedule
  const paymentSchedule = {
    advance25: Math.round(grandTotal * 0.25),
    beforeInstallation50: Math.round(grandTotal * 0.50),
    afterCompletion25: Math.round(grandTotal * 0.25)
  };
  
  return {
    breakdown: {
      fixtures,
      branding,
      campaign,
      logistics
    },
    summary: {
      subtotal,
      gst,
      grandTotal
    },
    paymentSchedule
  };
}