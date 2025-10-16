export const products = [
  {
    id: 1,
    name: "Hanging Unit Header",
    description: "Premium quality hanging unit header for retail displays with vibrant print quality",
    pricePerSqft: 500,
    category: "display",
    minSize: { length: 2, width: 1 },
    maxSize: { length: 20, width: 8 },
    unit: "sqft",
    features: ["High-resolution printing", "Weather resistant", "Easy installation"],
    image: "https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    artworkRequired: true
  },
  {
    id: 2,
    name: "Door Branding",
    description: "Full door branding solution with premium vinyl wrap for lasting impression",
    pricePerSqft: 700,
    category: "branding",
    minSize: { length: 3, width: 6 },
    maxSize: { length: 6, width: 10 },
    unit: "sqft",
    features: ["Scratch resistant", "Easy to clean", "3-year warranty"],
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    artworkRequired: true
  },
  {
    id: 3,
    name: "Header Board",
    description: "Eye-catching header board for store entrance with backlit options",
    pricePerSqft: 750,
    category: "signage",
    minSize: { length: 3, width: 1 },
    maxSize: { length: 15, width: 4 },
    unit: "sqft",
    features: ["LED backlight optional", "Weatherproof", "Premium finish"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    artworkRequired: true
  },
  {
    id: 4,
    name: "Window Graphics",
    description: "Frosted or full-color window graphics for privacy and branding",
    pricePerSqft: 450,
    category: "branding",
    minSize: { length: 2, width: 2 },
    maxSize: { length: 10, width: 8 },
    unit: "sqft",
    features: ["UV protected", "Removable", "No residue"],
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    artworkRequired: true
  },
  {
    id: 5,
    name: "Wall Wrap Graphics",
    description: "Large format wall graphics for impactful brand presence",
    pricePerSqft: 350,
    category: "wall-graphics",
    minSize: { length: 5, width: 5 },
    maxSize: { length: 30, width: 15 },
    unit: "sqft",
    features: ["Matte or gloss finish", "Fire resistant", "Quick installation"],
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    artworkRequired: true
  },
  {
    id: 6,
    name: "Floor Graphics",
    description: "Durable floor graphics for promotions and wayfinding",
    pricePerSqft: 600,
    category: "floor-graphics",
    minSize: { length: 2, width: 2 },
    maxSize: { length: 15, width: 10 },
    unit: "sqft",
    features: ["Anti-slip coating", "Heavy-duty lamination", "Indoor/Outdoor"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    artworkRequired: true
  }
];

export const categories = [
  { id: "all", name: "All Products" },
  { id: "display", name: "Display Systems" },
  { id: "branding", name: "Door & Window Branding" },
  { id: "signage", name: "Signage & Headers" },
  { id: "wall-graphics", name: "Wall Graphics" },
  { id: "floor-graphics", name: "Floor Graphics" }
];