/**
 * Store Fixture Calculator
 * Calculates optimal number and sizes of retail fixtures based on store dimensions
 */

// Industry standard constants
const CONSTANTS = {
  GONDOLA_STANDARD_SIZE: { length: 4, depth: 2, height: 5.5 },
  GONDOLA_FOOTPRINT: 8, // 4 x 2 sq. ft.
  AISLE_WIDTH_MIN: 3,
  WALL_RACK_PER_LINEAR_FT: 1,
  USABLE_AREA_RATIO: 0.65,
  PRODUCT_RACK_SECTION_LENGTH: 3,
  ENTRANCE_WIDTH: 10,
  CASH_COUNTER_PERIMETER: 12,
  CASH_COUNTER_AREA: 60,
  PRODUCT_DISPLAY_PODIUM_AREA: 40,
  GONDOLA_AISLE_SHARE: 3, // Additional aisle space per gondola
  PODIUM_AREA_RATIO: 200, // sq. ft. per podium
  BASKET_STAND_THRESHOLD: 500,
  PILLARS_PER_1000_SQFT: 4
};

// Store type adjustment multipliers
const STORE_TYPE_ADJUSTMENTS = {
  grocery: { gondolas: 1.2, wallRacks: 1.3, podiums: 1.0 },
  fashion: { gondolas: 0.9, wallRacks: 1.5, podiums: 1.0 },
  electronics: { gondolas: 0.8, wallRacks: 1.0, podiums: 1.4 },
  pharmacy: { gondolas: 1.0, wallRacks: 1.15, podiums: 1.0 },
  general: { gondolas: 1.0, wallRacks: 1.0, podiums: 1.0 }
};

/**
 * Calculate store fixtures based on area, perimeter, and store type
 * @param {Object} inputData - Store parameters
 * @returns {Object} Complete fixture calculations and specifications
 */
export function calculateStoreFixtures(inputData) {
  const { storeArea, storePerimeter, storeType, city } = inputData;
  
  // Get store type adjustments
  const adjustments = STORE_TYPE_ADJUSTMENTS[storeType] || STORE_TYPE_ADJUSTMENTS.general;
  
  // 1. Calculate wall-mounted product racks
  const usablePerimeter = storePerimeter - CONSTANTS.ENTRANCE_WIDTH - CONSTANTS.CASH_COUNTER_PERIMETER;
  const baseWallRackSections = Math.floor(usablePerimeter / CONSTANTS.PRODUCT_RACK_SECTION_LENGTH);
  const wallRackSections = Math.floor(baseWallRackSections * adjustments.wallRacks);
  
  // 2. Calculate gondola units
  const usableFloorArea = storeArea * CONSTANTS.USABLE_AREA_RATIO;
  const maxGondolaArea = usableFloorArea - CONSTANTS.CASH_COUNTER_AREA - CONSTANTS.PRODUCT_DISPLAY_PODIUM_AREA;
  const baseGondolaUnits = Math.floor(maxGondolaArea / (CONSTANTS.GONDOLA_FOOTPRINT + CONSTANTS.GONDOLA_AISLE_SHARE));
  const gondolaUnits = Math.floor(baseGondolaUnits * adjustments.gondolas);
  
  // 3. Calculate product display podiums
  const basePodiums = Math.floor(storeArea / CONSTANTS.PODIUM_AREA_RATIO);
  const productPodiums = Math.floor(basePodiums * adjustments.podiums);
  
  // 4. Cash counter (always 1)
  const cashCounter = 1;
  
  // 5. Basket/trolley stands
  const basketStands = storeArea > CONSTANTS.BASKET_STAND_THRESHOLD ? 2 : 1;
  
  // 6. Pillar wrapping estimate
  const pillarWraps = Math.floor((storeArea / 1000) * CONSTANTS.PILLARS_PER_1000_SQFT);
  
  // Calculate area utilization
  const fixtureArea = (gondolaUnits * CONSTANTS.GONDOLA_FOOTPRINT) + 
                     (wallRackSections * CONSTANTS.PRODUCT_RACK_SECTION_LENGTH * 1.5) +
                     (productPodiums * 4) + // 2x2 podium
                     CONSTANTS.CASH_COUNTER_AREA;
  
  const aisleArea = usableFloorArea - fixtureArea;
  const utilizationPercentage = Math.round((fixtureArea / usableFloorArea) * 100);
  
  return {
    calculations: {
      wallRackSections,
      gondolaUnits,
      productPodiums,
      cashCounter,
      basketStands,
      pillarWraps
    },
    specifications: {
      gondola: { length: 4, width: 2, height: 5.5, unit: "ft" },
      wallRack: { length: 3, depth: 1.5, height: 8, unit: "ft" },
      podium: { length: 2, width: 2, height: 3.5, unit: "ft" },
      cashCounter: { length: 6, width: 4, height: 3.5, unit: "ft" }
    },
    areaUtilization: {
      totalArea: storeArea,
      usableArea: Math.round(usableFloorArea),
      fixtureArea: Math.round(fixtureArea),
      aisleArea: Math.round(aisleArea),
      utilizationPercentage
    }
  };
}