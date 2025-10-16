/**
 * Estimate Formatter for Excel Export
 * Converts calculation data into ExcelJS-compatible structure
 */

/**
 * Generate unique estimate ID
 */
function generateEstimateId() {
  const year = new Date().getFullYear();
  const sequence = Math.floor(Math.random() * 9999) + 1;
  return `EST-${year}-${sequence.toString().padStart(4, '0')}`;
}

/**
 * Format currency with ₹ symbol and commas
 */
function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Get current date in DD-MMM-YYYY format
 */
function getCurrentDate() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date();
  return `${date.getDate().toString().padStart(2, '0')}-${months[date.getMonth()]}-${date.getFullYear()}`;
}

/**
 * Format calculation data for Excel export
 * @param {Object} calculationData - Combined store calculator + pricing data
 * @param {Object} clientData - Client and store details
 * @returns {Object} Excel-compatible data structure
 */
export function formatForExcel(calculationData, clientData) {
  const { fixtureData, pricingData } = calculationData;
  const estimateId = generateEstimateId();
  const currentDate = getCurrentDate();
  const timestamp = Date.now();

  // Sheet 1: Estimate Summary
  const summaryData = [
    // Header section
    { 
      category: 'Header', 
      storeName: clientData.storeName, 
      date: currentDate, 
      estimateId: estimateId 
    },
    
    // Client details section
    { 
      category: 'Client Details', 
      name: clientData.clientName, 
      contact: clientData.contactNumber, 
      email: clientData.email,
      address: clientData.storeAddress,
      city: clientData.city,
      storeType: clientData.storeType
    },

    // Store specifications
    {
      category: 'Store Specifications',
      area: `${clientData.storeArea} sq. ft.`,
      perimeter: `${clientData.storePerimeter} linear ft.`,
      campaignType: clientData.campaignType
    },

    // Fixtures section
    ...Object.entries(pricingData.breakdown.fixtures)
      .filter(([key, item]) => item.qty > 0)
      .map(([key, item]) => ({
        category: 'Fixtures',
        item: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
        qty: item.qty,
        unitPrice: formatCurrency(item.unitPrice),
        total: formatCurrency(item.total)
      })),

    // Branding section
    {
      category: 'Branding',
      item: `Store Signage (${pricingData.breakdown.branding.signage.type})`,
      qty: 1,
      unitPrice: formatCurrency(pricingData.breakdown.branding.signage.total),
      total: formatCurrency(pricingData.breakdown.branding.signage.total)
    },
    {
      category: 'Branding',
      item: `Wall Graphics (${pricingData.breakdown.branding.wallGraphics.sqft} sq. ft.)`,
      qty: 1,
      unitPrice: formatCurrency(pricingData.breakdown.branding.wallGraphics.total),
      total: formatCurrency(pricingData.breakdown.branding.wallGraphics.total)
    },

    // Campaign section (if applicable)
    ...(pricingData.breakdown.campaign.total > 0 ? [{
      category: 'Campaign',
      item: `${pricingData.breakdown.campaign.type.charAt(0).toUpperCase() + pricingData.breakdown.campaign.type.slice(1)} Campaign Setup`,
      qty: 1,
      unitPrice: formatCurrency(pricingData.breakdown.campaign.total),
      total: formatCurrency(pricingData.breakdown.campaign.total)
    }] : []),

    // Summary section
    {
      category: 'Summary',
      item: 'Subtotal',
      total: formatCurrency(pricingData.summary.subtotal)
    },
    {
      category: 'Summary',
      item: 'GST @ 18%',
      total: formatCurrency(pricingData.summary.gst)
    },
    {
      category: 'Summary',
      item: 'Grand Total',
      total: formatCurrency(pricingData.summary.grandTotal)
    },

    // Payment schedule
    {
      category: 'Payment Schedule',
      item: 'Advance Payment (25%)',
      total: formatCurrency(pricingData.paymentSchedule.advance25)
    },
    {
      category: 'Payment Schedule',
      item: 'Before Installation (50%)',
      total: formatCurrency(pricingData.paymentSchedule.beforeInstallation50)
    },
    {
      category: 'Payment Schedule',
      item: 'After Completion (25%)',
      total: formatCurrency(pricingData.paymentSchedule.afterCompletion25)
    }
  ];

  // Sheet 2: Store Layout Specifications
  const layoutData = [
    {
      fixture: 'Gondola Units',
      dimensions: '4 x 2 x 5.5 ft',
      qty: fixtureData.calculations.gondolaUnits,
      location: 'Center Floor Area',
      notes: 'Double-sided display units with adjustable shelves'
    },
    {
      fixture: 'Wall Rack Sections',
      dimensions: '3 x 1.5 x 8 ft',
      qty: fixtureData.calculations.wallRackSections,
      location: 'Perimeter Walls',
      notes: 'Wall-mounted display systems'
    },
    {
      fixture: 'Product Podiums',
      dimensions: '2 x 2 x 3.5 ft',
      qty: fixtureData.calculations.productPodiums,
      location: 'Strategic Display Points',
      notes: 'Featured product showcase units'
    },
    {
      fixture: 'Cash Counter',
      dimensions: '6 x 4 x 3.5 ft',
      qty: fixtureData.calculations.cashCounter,
      location: 'Store Entrance/Exit',
      notes: 'POS system integration ready'
    },
    {
      fixture: 'Basket Stands',
      dimensions: '2 x 2 x 4 ft',
      qty: fixtureData.calculations.basketStands,
      location: 'Store Entrance',
      notes: 'Customer convenience stations'
    },
    ...(fixtureData.calculations.pillarWraps > 0 ? [{
      fixture: 'Pillar Wraps',
      dimensions: 'Custom Size',
      qty: fixtureData.calculations.pillarWraps,
      location: 'Structural Pillars',
      notes: 'Branding and aesthetic enhancement'
    }] : [])
  ];

  // Sheet 3: Terms & Conditions
  const termsData = [
    {
      section: 'Payment Terms',
      content: '25% advance payment required to initiate project. 50% payment before installation begins. 25% final payment after project completion and handover.'
    },
    {
      section: 'Installation Timeline',
      content: 'Project completion within 15-20 working days from advance payment receipt. Timeline may vary based on store size and complexity.'
    },
    {
      section: 'Warranty Details',
      content: '12 months warranty on all fixtures and installations. 6 months warranty on branding materials against manufacturing defects.'
    },
    {
      section: 'Maintenance Clause',
      content: 'Free maintenance visit after 6 months. Annual maintenance contract available at additional cost. Emergency repair services available.'
    },
    {
      section: 'Scope of Work',
      content: 'Includes design, manufacturing, transportation, installation, and basic training. Excludes electrical work, civil modifications, and permits.'
    },
    {
      section: 'Validity',
      content: 'This estimate is valid for 30 days from the date of issue. Prices subject to change based on material cost fluctuations.'
    }
  ];

  return {
    fileName: `estimate_${clientData.storeName.replace(/\s+/g, '_')}_${timestamp}.xlsx`,
    sheets: [
      {
        name: 'Estimate Summary',
        data: summaryData
      },
      {
        name: 'Store Layout Specifications',
        data: layoutData
      },
      {
        name: 'Terms & Conditions',
        data: termsData
      }
    ],
    metadata: {
      createdAt: timestamp,
      estimateId: estimateId,
      status: 'pending_approval',
      clientName: clientData.clientName,
      storeName: clientData.storeName,
      grandTotal: pricingData.summary.grandTotal
    }
  };
}