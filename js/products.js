// products.js — single source of truth for the Rubadub in Bytchyns Tub catalog.
// To add/edit products or prices, edit the PRODUCTS and BUNDLES arrays below.
// Each product's `image` field points at a placeholder SVG illustration —
// swap in a real photo by replacing that file, or by changing the path to a
// new image (e.g. 'images/products/my-real-photo.jpg') and dropping the file in.

const CATEGORIES = [
  { slug: 'grooming-tools', label: 'Grooming Tools', icon: 'images/icons/grooming-tools.svg' },
  { slug: 'bath-spa', label: 'Bath & Spa', icon: 'images/icons/bath-spa.svg' },
  { slug: 'collars-leashes-id', label: 'Collars, Leashes & ID', icon: 'images/icons/collars-leashes-id.svg' },
  { slug: 'comfort-home', label: 'Comfort & Home', icon: 'images/icons/comfort-home.svg' },
  { slug: 'feeding-essentials', label: 'Feeding Essentials', icon: 'images/icons/feeding-essentials.svg' },
  { slug: 'apparel-accessories', label: 'Apparel & Accessories', icon: 'images/icons/apparel-accessories.svg' },
  { slug: 'toys-enrichment', label: 'Toys & Enrichment', icon: 'images/icons/toys-enrichment.svg' },
  { slug: 'on-the-go-travel', label: 'On-The-Go / Travel', icon: 'images/icons/on-the-go-travel.svg' },
];

const PRODUCTS = [
  {
    id: 'gt-01',
    name: 'Slicker Brush Deluxe',
    category: 'grooming-tools',
    price: 14.50,
    description: 'Fine bent-wire bristles lift loose fur and gentle mats without tugging on skin.',
    image: 'images/products/gt-01.svg', // swap-in point for a real product photo
  },
  {
    id: 'gt-02',
    name: 'Self-Cleaning Undercoat Rake',
    category: 'grooming-tools',
    price: 18.00,
    description: 'One-click retractable teeth pull out fluffy undercoat fast, then release it in a clean pull.',
    image: 'images/products/gt-02.svg', // swap-in point for a real product photo
  },
  {
    id: 'gt-03',
    name: 'Stainless Steel Nail Clippers',
    category: 'grooming-tools',
    price: 11.00,
    description: 'Non-slip grip and a built-in safety stop for confident, even trims.',
    image: 'images/products/gt-03.svg', // swap-in point for a real product photo
  },
  {
    id: 'gt-04',
    name: 'Grooming Comb Duo Set',
    category: 'grooming-tools',
    price: 9.50,
    description: 'Wide- and fine-tooth combs in one set for everyday touch-ups between baths.',
    image: 'images/products/gt-04.svg', // swap-in point for a real product photo
  },
  {
    id: 'bs-01',
    name: 'Oatmeal Bubble Bath Wash',
    category: 'bath-spa',
    price: 13.00,
    description: 'A soap-free, oatmeal-based wash that sudses up big for a proper rub-a-dub soak.',
    image: 'images/products/bs-01.svg', // swap-in point for a real product photo
  },
  {
    id: 'bs-02',
    name: 'Tearless Puppy Shampoo',
    category: 'bath-spa',
    price: 12.50,
    description: 'Extra-gentle formula made for first baths and sensitive little eyes.',
    image: 'images/products/bs-02.svg', // swap-in point for a real product photo
  },
  {
    id: 'bs-03',
    name: 'Microfiber Quick-Dry Towel',
    category: 'bath-spa',
    price: 16.00,
    description: 'Oversized and super-absorbent, it cuts drying time way down after tub time.',
    image: 'images/products/bs-03.svg', // swap-in point for a real product photo
  },
  {
    id: 'bs-04',
    name: 'Rubber Bath Tub Mat',
    category: 'bath-spa',
    price: 10.00,
    description: 'Suction-grip mat keeps paws steady in the tub or sink during wash time.',
    image: 'images/products/bs-04.svg', // swap-in point for a real product photo
  },
  {
    id: 'bs-05',
    name: 'Detangling Spray Mist',
    category: 'bath-spa',
    price: 9.75,
    description: 'A quick leave-in mist that smooths out knots before they become a whole ordeal.',
    image: 'images/products/bs-05.svg', // swap-in point for a real product photo
  },
  {
    id: 'cl-01',
    name: 'Classic Nylon Collar',
    category: 'collars-leashes-id',
    price: 9.00,
    description: 'A sturdy everyday collar in adjustable sizing with a quick-snap buckle.',
    image: 'images/products/cl-01.svg', // swap-in point for a real product photo
  },
  {
    id: 'cl-02',
    name: 'Padded Comfort Harness',
    category: 'collars-leashes-id',
    price: 22.00,
    description: 'Soft-padded straps distribute pressure evenly for pullers and small dogs alike.',
    image: 'images/products/cl-02.svg', // swap-in point for a real product photo
  },
  {
    id: 'cl-03',
    name: 'Reflective Leash 6ft',
    category: 'collars-leashes-id',
    price: 15.00,
    description: 'Reflective stitching keeps evening walks visible; comfort-grip handle included.',
    image: 'images/products/cl-03.svg', // swap-in point for a real product photo
  },
  {
    id: 'cl-04',
    name: 'Engraved ID Tag',
    category: 'collars-leashes-id',
    price: 7.50,
    description: 'A durable aluminum tag, custom-engraved with your pet\'s name and your phone number.',
    image: 'images/products/cl-04.svg', // swap-in point for a real product photo
  },
  {
    id: 'ch-01',
    name: 'Plush Cloud Pet Bed',
    category: 'comfort-home',
    price: 38.00,
    description: 'Deep-pile bolster bed with a machine-washable cover for nap-all-day comfort.',
    image: 'images/products/ch-01.svg', // swap-in point for a real product photo
  },
  {
    id: 'ch-02',
    name: 'Cooling Gel Mat',
    category: 'comfort-home',
    price: 24.00,
    description: 'Pressure-activated cooling gel keeps warm-weather naps comfortable, no power needed.',
    image: 'images/products/ch-02.svg', // swap-in point for a real product photo
  },
  {
    id: 'ch-03',
    name: 'Cable-Knit Pet Blanket',
    category: 'comfort-home',
    price: 19.50,
    description: 'A cozy knit throw sized for crates, couches, or a favorite corner of the floor.',
    image: 'images/products/ch-03.svg', // swap-in point for a real product photo
  },
  {
    id: 'ch-04',
    name: 'Calming Donut Cushion',
    category: 'comfort-home',
    price: 34.00,
    description: 'Raised rim and ultra-soft fill give anxious sleepers a snug place to curl up.',
    image: 'images/products/ch-04.svg', // swap-in point for a real product photo
  },
  {
    id: 'fe-01',
    name: 'Ceramic Bowl Set (2pc)',
    category: 'feeding-essentials',
    price: 17.00,
    description: 'Weighted ceramic bowls that won\'t slide or tip during an enthusiastic dinner.',
    image: 'images/products/fe-01.svg', // swap-in point for a real product photo
  },
  {
    id: 'fe-02',
    name: 'Elevated Feeding Stand',
    category: 'feeding-essentials',
    price: 28.00,
    description: 'Raised stand supports better posture at mealtime; height-adjustable for growing pups.',
    image: 'images/products/fe-02.svg', // swap-in point for a real product photo
  },
  {
    id: 'fe-03',
    name: 'Slow-Feed Bowl',
    category: 'feeding-essentials',
    price: 13.50,
    description: 'Ridged interior slows down fast eaters for calmer, healthier mealtimes.',
    image: 'images/products/fe-03.svg', // swap-in point for a real product photo
  },
  {
    id: 'fe-04',
    name: 'Collapsible Travel Bowl',
    category: 'feeding-essentials',
    price: 8.00,
    description: 'Folds flat for the diaper bag or glovebox; pops open for water on the go.',
    image: 'images/products/fe-04.svg', // swap-in point for a real product photo
  },
  {
    id: 'aa-01',
    name: 'Rain Slicker Jacket',
    category: 'apparel-accessories',
    price: 21.00,
    description: 'A lightweight waterproof shell with leash-hole and adjustable belly strap.',
    image: 'images/products/aa-01.svg', // swap-in point for a real product photo
  },
  {
    id: 'aa-02',
    name: 'Cozy Knit Sweater',
    category: 'apparel-accessories',
    price: 18.50,
    description: 'Soft ribbed-knit sweater for chilly walks, machine washable.',
    image: 'images/products/aa-02.svg', // swap-in point for a real product photo
  },
  {
    id: 'aa-03',
    name: 'Bandana 3-Pack',
    category: 'apparel-accessories',
    price: 9.00,
    description: 'Snap-on bandanas in three seasonal prints for easy everyday flair.',
    image: 'images/products/aa-03.svg', // swap-in point for a real product photo
  },
  {
    id: 'aa-04',
    name: 'Bow Tie Collar Attachment',
    category: 'apparel-accessories',
    price: 6.50,
    description: 'A quick clip-on bow tie that dresses up any collar for photos or parties.',
    image: 'images/products/aa-04.svg', // swap-in point for a real product photo
  },
  {
    id: 'te-01',
    name: 'Rubber Duck Squeaky Toy',
    category: 'toys-enrichment',
    price: 7.00,
    description: 'Our signature squeaky duck — the perfect bath-time (or anytime) companion.',
    image: 'images/products/te-01.svg', // swap-in point for a real product photo
  },
  {
    id: 'te-02',
    name: 'Snuffle Mat Puzzle',
    category: 'toys-enrichment',
    price: 19.00,
    description: 'Hide treats in the fleece fronds for a calming, nose-powered brain game.',
    image: 'images/products/te-02.svg', // swap-in point for a real product photo
  },
  {
    id: 'te-03',
    name: 'Rope Tug Toy',
    category: 'toys-enrichment',
    price: 8.50,
    description: 'Tightly woven cotton rope stands up to enthusiastic tug-of-war sessions.',
    image: 'images/products/te-03.svg', // swap-in point for a real product photo
  },
  {
    id: 'te-04',
    name: 'Treat-Dispensing Ball',
    category: 'toys-enrichment',
    price: 11.50,
    description: 'Adjustable difficulty dispenses kibble as it rolls, for playtime with a payoff.',
    image: 'images/products/te-04.svg', // swap-in point for a real product photo
  },
  {
    id: 'ot-01',
    name: 'Car Seat Booster',
    category: 'on-the-go-travel',
    price: 32.00,
    description: 'Padded booster clips to seatbelts and gives small dogs a safe window view.',
    image: 'images/products/ot-01.svg', // swap-in point for a real product photo
  },
  {
    id: 'ot-02',
    name: 'Foldable Travel Carrier',
    category: 'on-the-go-travel',
    price: 27.00,
    description: 'Collapses flat for storage, pops up in seconds for vet visits and road trips.',
    image: 'images/products/ot-02.svg', // swap-in point for a real product photo
  },
  {
    id: 'ot-03',
    name: 'Collapsible Water Bottle',
    category: 'on-the-go-travel',
    price: 12.00,
    description: 'Built-in trough lid turns any walk into an easy water break.',
    image: 'images/products/ot-03.svg', // swap-in point for a real product photo
  },
  {
    id: 'ot-04',
    name: 'Waste Bag Dispenser + Bags',
    category: 'on-the-go-travel',
    price: 6.00,
    description: 'Clip-on dispenser with an unscented starter roll of leak-proof bags.',
    image: 'images/products/ot-04.svg', // swap-in point for a real product photo
  },
];

const BUNDLES = [
  {
    id: 'bd-01',
    name: 'Rub-A-Dub Spa Day Bundle',
    category: 'bundles',
    price: 44.99,
    items: ['bs-01', 'bs-03', 'gt-01', 'bs-05'],
    description: 'Everything for a full spa day: bubble wash, quick-dry towel, slicker brush, and detangling mist.',
    image: 'images/products/bd-01.svg', // swap-in point for a real bundle photo
  },
  {
    id: 'bd-02',
    name: 'New Puppy Starter Kit',
    category: 'bundles',
    price: 38.99,
    items: ['bs-02', 'cl-01', 'fe-01', 'te-01'],
    description: 'A gentle first-bath shampoo, an adjustable collar, a ceramic bowl set, and our signature rubber duck.',
    image: 'images/products/bd-02.svg', // swap-in point for a real bundle photo
  },
  {
    id: 'bd-03',
    name: 'Snug as a Bug Comfort Bundle',
    category: 'bundles',
    price: 79.99,
    items: ['ch-01', 'ch-03', 'ch-04'],
    description: 'A plush bed, a cable-knit blanket, and a calming donut cushion for the ultimate nap nest.',
    image: 'images/products/bd-03.svg', // swap-in point for a real bundle photo
  },
  {
    id: 'bd-04',
    name: 'On-The-Go Duckling Travel Kit',
    category: 'bundles',
    price: 44.99,
    items: ['ot-02', 'fe-04', 'ot-03', 'ot-04'],
    description: 'A foldable carrier, collapsible bowl and bottle, and a waste bag dispenser for easy travel days.',
    image: 'images/products/bd-04.svg', // swap-in point for a real bundle photo
  },
  {
    id: 'bd-05',
    name: 'Squeaky Clean Playtime Pack',
    category: 'bundles',
    price: 38.99,
    items: ['te-01', 'te-03', 'te-02', 'te-04'],
    description: 'Four favorite enrichment toys bundled up for a whole lot of squeak and snuffle.',
    image: 'images/products/bd-05.svg', // swap-in point for a real bundle photo
  },
  {
    id: 'bd-06',
    name: 'First Class Feline Fresh-Up Kit',
    category: 'bundles',
    price: 39.99,
    items: ['bs-01', 'bs-03', 'gt-04', 'aa-03'],
    description: 'A gentle bubble wash, quick-dry towel, grooming comb duo, and bandanas — tub time made easy.',
    image: 'images/products/bd-06.svg', // swap-in point for a real bundle photo
  },
];

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || BUNDLES.find((b) => b.id === id) || null;
}

function getBundleSavings(bundle) {
  const sum = bundle.items.reduce((total, id) => {
    const item = PRODUCTS.find((p) => p.id === id);
    return total + (item ? item.price : 0);
  }, 0);
  return Math.max(0, sum - bundle.price);
}
