export const buildings = [
  {
    id: "block-1",
  slug: "block-1",
  name: "Block 1 (Fashion)",
  shortName: "Block 1 - Fashion",
  type: "academic",
  description: "Academic facilities related to fashion studies.",
    floors: 4,
    coordinates: { x: 91.5, y: 3.5 },
    accessibility: {
      score: 85,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: true
    },
    barriers: ["Heavy manual double doors at rear entrance"],
    image: null
  },
  {
    id: "block-2",
  slug: "block-2",
  name: "Block 2 (Baldev Raj Auditorium)",
  shortName: "Block 2 - Baldev Raj Auditorium",
  type: "recreation",
  description: "Auditorium facility used for university events and programs.",
    floors: 4,
    coordinates: { x: 85, y: 8.5 },
    accessibility: {
      score: 80,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: false,
      brailleSignage: false
    },
    barriers: ["Threshold ramp slope exceeds 1:10 at west annex"],
    image: null
  },
  {
    id: "block-3",
  slug: "block-3",
  name: "Block 3 (Uni-Hospital & Medical Emergency Wing)",
  shortName: "Block 3 (Hospital)",
  type: "medical",
  description: "24/7 University Health Centre, emergency medical triage, clinical pharmacy, diagnostic laboratories, and dedicated ramp ambulance entrance.",
    floors: 4,
    coordinates: { x: 64, y: 18 },
    accessibility: {
      score: 88,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: true
    },
    barriers: ["Ramp handrail undergoing routine inspection"],
    image: null
  },
  {
    id: "block-4",
  slug: "block-4",
  name: "Block 4 (Pharmacy)",
  shortName: "Block 4 - Pharmacy",
  type: "academic",
  description: "Academic facilities related to pharmacy studies.",
    floors: 5,
    coordinates: { x: 65, y: 22 },
    accessibility: {
      score: 58,
      ramp: true,
      elevator: true,
      elevatorWorking: false,
      accessibleEntrance: true,
      accessibleWashroom: false,
      tactilePath: false,
      brailleSignage: false
    },
    image: null
  },
  {
     id: "block-13",
  slug: "block-13",
  name: "Block 13 (Student Welfare Wing and DSW)",
  shortName: "Block 13 - Student Welfare",
  type: "administrative",
  description: "Student Welfare Wing and Division of Student Welfare (DSW) facilities.",
    floors: 3,
    coordinates: { x: 69, y: 43 },
    accessibility: {
      score: 48,
      ramp: true,
      elevator: false,
      elevatorWorking: false,
      accessibleEntrance: false,
      accessibleWashroom: false,
      tactilePath: false,
      brailleSignage: false
    },
    barriers: ["Crushed gravel pathway at heavy equipment delivery bay", "High 4-inch metal kerb at lathe workshop"],
    image: null
  },
  {
    id: "block-14",
  slug: "block-14",
  name: "Block 14 (MSB - Mittal School of Business)",
  shortName: "Block 14 - MSB",
  type: "academic",
  description: "Academic facilities of Mittal School of Business.",
    floors: 3,
    coordinates: { x: 67, y: 48 },
    accessibility: {
      score: 52,
      ramp: true,
      elevator: false,
      elevatorWorking: false,
      accessibleEntrance: true,
      accessibleWashroom: false,
      tactilePath: false,
      brailleSignage: false
    },
      barriers: ["Steep approach slope from vehicle testing track"],
    image: null
  },
  {
    id: "block-25",
  slug: "block-25",
  name: "Block 25 (School of Computer Science and Engineering)",
  shortName: "Block 25 - Computer Science",
  type: "academic",
  description: "Academic facilities of the School of Computer Science and Engineering.",
    floors: 5,
    coordinates: { x: 20, y: 58 },
    accessibility: {
      score: 82,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: false,
      brailleSignage: true
    },
        barriers: ["Fire safety doors between corridors require high opening force"],
    image: null
  },
  {
     id: "block-26",
  slug: "block-26",
  name: "Block 26 (School of Computer Science and Engineering)",
  shortName: "Block 26 - Computer Science",
  type: "academic",
  description: "Academic facilities of the School of Computer Science and Engineering.",
    floors: 5,
    coordinates: { x: 28, y: 58 },
    accessibility: {
      score: 79,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: false,
      brailleSignage: false
    },
    barriers: ["Basement autoclave room lacks ramp access"],
    image: null
  },
  {
    id: "block-27",
  slug: "block-27",
  name: "Block 27 (School of Computer Science and Engineering)",
  shortName: "Block 27 - Computer Science",
  type: "academic",
  description: "Academic facilities of the School of Computer Science and Engineering.",
    floors: 2,
    coordinates: { x: 35, y: 58 },
    accessibility: {
      score: 42,
      ramp: false,
      elevator: false,
      elevatorWorking: false,
      accessibleEntrance: false,
      accessibleWashroom: false,
      tactilePath: false,
      brailleSignage: false
    },
    barriers: ["Unpaved earthen pathways between polyhouses", "High mud kerbs around sprinkler perimeter"],
    image: null
  },
  {
     id: "block-28",
  slug: "block-28",
  name: "Block 28 (School of Computer Science and Engineering)",
  shortName: "Block 28 - Computer Science",
  type: "academic",
  description: "Academic facilities of the School of Computer Science and Engineering.",
    floors: 4,
    coordinates: { x: 40, y: 58 },
    accessibility: {
      score: 68,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: false,
      tactilePath: false,
      brailleSignage: false
    },
    barriers: ["South entrance ramp has uneven stone tiles"],
    image: null
  },
  {
   id: "block-29",
  slug: "block-29",
  name: "Block 29 (Chancellory Building)",
  shortName: "Block 29 - Chancellory",
  type: "administrative",
  description: "Administrative facilities of the Chancellory.",
    floors: 5,
    coordinates: { x: 46, y: 58 },
    accessibility: {
      score: 74,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: false,
      brailleSignage: false
    },
    barriers: ["Lab benches fixed at 36-inch height without adjustable stations"],
    image: null
  },
  {
    id: "block-30",
  slug: "block-30",
  name: "Block 30 (Chancellory Building)",
  shortName: "Block 30 - Chancellory",
  type: "administrative",
  description: "Administrative facilities of the Chancellory.",
    floors: 4,
    coordinates: { x: 52, y: 58 },
    accessibility: {
      score: 76,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: false,
      brailleSignage: false
    },
    barriers: ["Threshold step at north annex entrance"],
    image: null
  },
  {
    id: "block-31",
  slug: "block-31",
  name: "Block 31 (Admission Block)",
  shortName: "Block 31 - Admission",
  type: "administrative",
  description: "University admission and student enquiry facilities.",
    floors: 4,
    coordinates: { x: 60, y: 57 },
    accessibility: {
      score: 70,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: false,
      tactilePath: false,
      brailleSignage: false
    },
    barriers: ["Staircase handrail loose on third floor flight"],
    image: null
  },
  {
    id: "block-32",
  slug: "block-32",
  name: "Block 32 (Division of Student Relationship - DSR)",
  shortName: "Block 32 - DSR",
  type: "administrative",
  description: "Facilities of the Division of Student Relationship (DSR).",
    floors: 5,
    coordinates: { x: 67, y: 59 },
    accessibility: {
      score: 88,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: true
    },
    barriers: ["Heavy foot traffic near elevator bank during lunch hours"],
    image: null
  },
  {
     id: "block-33",
  slug: "block-33",
  name: "Block 33 (Computer Application)",
  shortName: "Block 33 - Computer Application",
  type: "academic",
  description: "Academic facilities related to computer applications.",
    floors: 4,
    coordinates: { x: 67, y: 65 },
    accessibility: {
      score: 76,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: false,
      brailleSignage: false
    },
    barriers: ["Commercial training kitchen doors have raised floor sills"],
    image: null
  },
  {
     id: "block-34",
  slug: "block-34",
  name: "Block 34 (Computer Science)",
  shortName: "Block 34 - Computer Science",
  type: "academic",
  description: "Academic facilities related to computer science.",
    floors: 8,
    coordinates: { x: 67, y: 72 },
    accessibility: {
      score: 84,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: true
    },
    barriers: ["Elevators experience heavy crowding during 10-minute class transitions"],
    image: null
  },
  {
    id: "block-35",
    slug: "block-35",
    name: "Block 35 (School of Architecture & Planning)",
    shortName: "Block 35 (Arch)",
    type: "academic",
    floors: 4,
    coordinates: { x: 58, y: 34 },
    accessibility: {
      score: 80,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: false,
      brailleSignage: false
    },
    barriers: ["Exhibition mezzanine level accessible only via spiral steps"],
    image: null
  },
  {
     id: "block-36",
  slug: "block-36",
  name: "Block 36 (Electronic Telecom)",
  shortName: "Block 36 - Electronic Telecom",
  type: "academic",
  description: "Academic facilities related to electronics and telecommunications.",
    floors: 5,
    coordinates: { x: 55, y: 69 },
    accessibility: {
      score: 82,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: false
    },
    barriers: ["Moot court judge podium is elevated by 2 steps without ramp"],
    image: null
  },
  {
    id: "block-37",
  slug: "block-37",
  name: "Block 37 (Central Library)",
  shortName: "Block 37 - Central Library",
  type: "library",
  description: "Central library facilities for students and staff.",
    floors: 5,
    coordinates: { x: 46, y: 64 },
    accessibility: {
      score: 92,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: true
    },
    barriers: ["Side ramp near garden has 1:8 steep gradient"],
    image: null
  },
  {
    id: "block-38",
  slug: "block-38",
  name: "Block 38 (Computer Applications & Research Labs)",
  shortName: "Block 38",
  type: "academic",
  description: "Computer applications and research laboratory facilities.",
    floors: 4,
    coordinates: { x: 39, y: 63 },
    accessibility: {
      score: 82,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: false
    },
    barriers: ["Heavy security turnstiles at ground floor lobby"],
    image: null
  },
  {
    id: "block-55",
    slug: "block-55",
    name: "Block 55 (Artificial Intelligence & Computing Wing)",
    shortName: "Block 55 (AI Wing)",
    type: "academic",
    floors: 6,
    coordinates: { x: 40, y: 78 },
    accessibility: {
      score: 94,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: true
    },
    barriers: [],
    image: null
  },
  {
      id: "block-56",
  slug: "block-56",
  name: "Block 56 (Mechanical)",
  shortName: "Block 56 - Mechanical",
  type: "academic",
  description: "Academic and laboratory facilities related to mechanical engineering."
,
    floors: 5,
    coordinates: { x: 48, y: 78 },
    accessibility: {
      score: 88,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: false
    },
    barriers: ["Soundproofing heavy double doors at recording studio"],
    image: null
  },
  {
    id: "unimall",
    slug: "unimall",
    name: "UniMall (Central Student Utility & Retail Complex)",
    shortName: "UniMall",
    type: "dining",
    floors: 4,
    coordinates: { x: 57, y: 45 },
    accessibility: {
      score: 86,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: true
    },
    description: "4-story commercial hub featuring food chains, grocery mart, stationery printers, banking, and apparel outlets.",
    barriers: ["Basement parking ramp frequently blocked by delivery cages"],
    image: null
  },
  {
    id: "unipolis",
    slug: "unipolis",
    name: "Baldev Raj Mittal Unipolis",
    shortName: "Unipolis",
    type: "recreation",
    floors: 1,
    coordinates: { x: 35, y: 53 },
    accessibility: {
      score: 88,
      ramp: true,
      elevator: false,
      elevatorWorking: false,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: false
    },
    description: "Massive covered open-air event arena with 10,000+ seating capacity for youth festivals, tech conclaves, and convocations.",
    barriers: ["Temporary cables crossing pathway during major concerts"],
    image: null
  },
  {
    id: "shanti-devi-auditorium",
    slug: "shanti-devi-auditorium",
    name: "Shanti Devi Mittal Auditorium",
    shortName: "Auditorium",
    type: "recreation",
    floors: 3,
    coordinates: { x: 53, y: 62 },
    accessibility: {
      score: 80,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: false,
      brailleSignage: false
    },
    description: "2,500-seat state-of-the-art air-conditioned auditorium hosting international conventions and performing arts.",
    barriers: ["Stage area lacks dedicated wheelchair lift from auditorium floor"],
    image: null
  },
  {
    id: "indoor-stadium",
    slug: "indoor-stadium",
    name: "Indoor Sports Complex & Olympic Pool",
    shortName: "Indoor Sports",
    type: "recreation",
    floors: 2,
    coordinates: { x: 13, y: 64 },
    accessibility: {
      score: 72,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: false,
      brailleSignage: false
    },
    description: "Multi-court badminton halls, squash courts, gymnasium, table tennis arenas, and all-weather swimming pool.",
    barriers: ["Swimming pool lacks mechanical hydraulic hoist for wheelchair entry"],
    image: null
  },
  {
    id: "outdoor-stadium",
    slug: "outdoor-stadium",
    name: "Multi-Purpose Athletics Stadium",
    shortName: "Athletics Stadium",
    type: "recreation",
    floors: 1,
    coordinates: { x: 9, y: 69 },
    accessibility: {
      score: 55,
      ramp: true,
      elevator: false,
      elevatorWorking: false,
      accessibleEntrance: true,
      accessibleWashroom: false,
      tactilePath: false,
      brailleSignage: false
    },
    description: "400m synthetic running track, football turf, cricket nets, and spectators pavilion.",
    barriers: ["Paved track ends abruptly at muddy bleacher entrance"],
    image: null
  },
  {
    id: "sunken-garden",
    slug: "sunken-garden",
    name: "Sunken Garden & Central Lawn",
    shortName: "Sunken Garden",
    type: "recreation",
    floors: 1,
    coordinates: { x: 42, y: 40 },
    accessibility: {
      score: 62,
      ramp: true,
      elevator: false,
      elevatorWorking: false,
      accessibleEntrance: false,
      accessibleWashroom: false,
      tactilePath: false,
      brailleSignage: false
    },
    description: "Tiered landscaping, water fountains, and open grass gathering zone between Blocks 32 and 34.",
    barriers: ["Stepped amphitheater seating with steep ramp on north side only"],
    image: null
  },
  {
    id: "open-air-theatre",
    slug: "open-air-theatre",
    name: "Open Air Theatre (OAT)",
    shortName: "OAT",
    type: "recreation",
    floors: 1,
    coordinates: { x: 72, y: 46 },
    accessibility: {
      score: 50,
      ramp: false,
      elevator: false,
      elevatorWorking: false,
      accessibleEntrance: false,
      accessibleWashroom: false,
      tactilePath: false,
      brailleSignage: false
    },
    description: "Outdoor stepped arena for street theater, club flash-mobs, and student music sessions.",
    barriers: ["Completely stepped stone amphitheater, zero wheelchair ramp"],
    image: null
  },
  {
    id: "student-food-court",
    slug: "student-food-court",
    name: "Student Food Court (Block 34 Plaza)",
    shortName: "Food Court 34",
    type: "dining",
    floors: 2,
    coordinates: { x: 75, y: 67 },
    accessibility: {
      score: 82,
      ramp: true,
      elevator: false,
      elevatorWorking: false,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: false,
      brailleSignage: false
    },
    description: "Outdoor and indoor dining plaza housing multiple food kiosks, juice counters, and bakery points.",
    barriers: ["Mezzanine seating floor has spiral stairs without elevator"],
    image: null
  },
  {
    id: "robopark",
    slug: "robopark",
    name: "Robopark & Innovation Pavilion",
    shortName: "Robopark",
    type: "academic",
    floors: 2,
    coordinates: { x: 36.8, y: 47.7 },
    accessibility: {
      score: 85,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: false
    },
    description: "Autonomous drone flight cages, student robotic competition arena, and technology display pavilion.",
    barriers: [],
    image: null
  },
  {
    id: "gate-1",
    slug: "gate-1",
    name: "Main Gate 1 (GT Road National Highway Entrance)",
    shortName: "Main Gate 1",
    type: "administrative",
    floors: 1,
    coordinates: { x: 66, y: 3 },
    accessibility: {
      score: 90,
      ramp: true,
      elevator: false,
      elevatorWorking: false,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: true
    },
    description: "Primary official entrance facing NH-1 / GT Road with security checkpoints, visitor pass desks, and shuttle pickup stands.",
    barriers: ["Traffic boom barriers require manual pedestrian clearance"],
    image: null
  },
  {
    id: "gate-2",
    slug: "gate-2",
    name: "Gate 2 (Law Gate Commercial Hub)",
    shortName: "Gate 2 (Law Gate)",
    type: "administrative",
    floors: 1,
    coordinates: { x: 4, y: 37 },
    accessibility: {
      score: 60,
      ramp: true,
      elevator: false,
      elevatorWorking: false,
      accessibleEntrance: true,
      accessibleWashroom: false,
      tactilePath: false,
      brailleSignage: false
    },
    description: "High-density student gate connecting to off-campus food joints, student housing, and local transport.",
    barriers: ["Broken asphalt and high kerb at pedestrian turnstile"],
    image: null
  },
  {
    id: "gate-3",
    slug: "gate-3",
    name: "Gate 3 (Hostel & Sports Zone Gate)",
    shortName: "Gate 3",
    type: "administrative",
    floors: 1,
    coordinates: { x: 16, y: 47 },
    accessibility: {
      score: 70,
      ramp: true,
      elevator: false,
      elevatorWorking: false,
      accessibleEntrance: true,
      accessibleWashroom: false,
      tactilePath: false,
      brailleSignage: false
    },
    description: "West perimeter gate used by student logistics, sports teams, and hostel shuttle services.",
    barriers: ["Speed breakers are steep and lack painted contrast markings"],
    image: null
  },
  {
    id: "gate-4",
    slug: "gate-4",
    name: "Gate 4 (East Agricultural Perimeter Gate)",
    shortName: "Gate 4",
    type: "administrative",
    floors: 1,
    coordinates: { x: 92, y: 40 },
    accessibility: {
      score: 52,
      ramp: false,
      elevator: false,
      elevatorWorking: false,
      accessibleEntrance: true,
      accessibleWashroom: false,
      tactilePath: false,
      brailleSignage: false
    },
    description: "Rear access gate for agricultural machinery, farm supplies, and staff residential access.",
    barriers: ["Unpaved roadside shoulder with drainage trench"],
    image: null
  },
  {
    id: "shuttle-terminal",
    slug: "shuttle-terminal",
    name: "Central E-Rickshaw & Shuttle Terminal",
    shortName: "Shuttle Terminal",
    type: "administrative",
    floors: 1,
    coordinates: { x: 73, y: 20 },
    accessibility: {
      score: 88,
      ramp: true,
      elevator: false,
      elevatorWorking: false,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: false
    },
    description: "Central fleet depot for university electric rickshaws and wheelchair-accessible intra-campus shuttles.",
    barriers: ["Boarding platforms lack raised tactile curb edge warnings"],
    image: null
  },
  {
    id: "bh-1",
    slug: "bh-1",
    name: "Boys Hostel 1 (BH-1)",
    shortName: "BH-1",
    type: "residential",
    floors: 6,
    coordinates: { x: 12, y: 74 },
    accessibility: {
      score: 55,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: false,
      tactilePath: false,
      brailleSignage: false
    },
    description: "Student residential facility with in-house mess, study room, gym, and laundry services.",
    barriers: ["Doorways to individual dorm rooms are 28 inches (narrow for standard wheelchairs)", "Bathroom threshold has 2-inch kerb"],
    image: null
  },
  {
    id: "bh-2",
    slug: "bh-2",
    name: "Boys Hostel 2 (BH-2)",
    shortName: "BH-2",
    type: "residential",
    floors: 6,
    coordinates: { x: 20, y: 74 },
    accessibility: {
      score: 58,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: false,
      tactilePath: false,
      brailleSignage: false
    },
    description: "Senior undergraduate residence block with recreational courts and indoor dining hall.",
    barriers: ["Mess hall counter height is high without lowered tray slides"],
    image: null
  },
  {
    id: "bh-3",
    slug: "bh-3",
    name: "Boys Hostel 3 (BH-3)",
    shortName: "BH-3",
    type: "residential",
    floors: 7,
    coordinates: { x: 28, y: 74 },
    accessibility: {
      score: 62,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: false,
      brailleSignage: false
    },
    description: "Multi-story residential hall with ground floor accessible rooms reserved for students with physical disabilities.",
    barriers: ["Elevator car is compact, tight turning radius for electric wheelchairs"],
    image: null
  },
  {
    id: "bh-4",
    slug: "bh-4",
    name: "Boys Hostel 4 (BH-4)",
    shortName: "BH-4",
    type: "residential",
    floors: 7,
    coordinates: { x: 36, y: 74 },
    accessibility: {
      score: 60,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: false,
      brailleSignage: false
    },
    description: "Residential block with badminton court and night canteen facility.",
    barriers: ["Main ramp surface is slippery during rainy season"],
    image: null
  },
  {
    id: "bh-5",
    slug: "bh-5",
    name: "Boys Hostel 5 (BH-5)",
    shortName: "BH-5",
    type: "residential",
    floors: 8,
    coordinates: { x: 12, y: 80 },
    accessibility: {
      score: 74,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: false,
      brailleSignage: true
    },
    description: "Modern student hostel with dual wide elevators, ground floor medical isolation room, and wide corridor clearance.",
    barriers: ["Heavy door closer on mess entrance"],
    image: null
  },
  {
    id: "bh-6",
    slug: "bh-6",
    name: "Boys Hostel 6 (BH-6)",
    shortName: "BH-6",
    type: "residential",
    floors: 8,
    coordinates: { x: 20, y: 80 },
    accessibility: {
      score: 72,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: false,
      brailleSignage: false
    },
    description: "Eight-story residential tower with attached convenience store and gym.",
    barriers: ["Rear garden access has 3 steps without ramp"],
    image: null
  },
  {
    id: "bh-7",
    slug: "bh-7",
    name: "Boys Hostel 7 (BH-7)",
    shortName: "BH-7",
    type: "residential",
    floors: 9,
    coordinates: { x: 28, y: 80 },
    accessibility: {
      score: 75,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: false
    },
    description: "High-capacity residential complex with central open quadrangle and step-free dining halls.",
    barriers: [],
    image: null
  },
  {
    id: "bh-8",
    slug: "bh-8",
    name: "Boys Hostel 8 (BH-8)",
    shortName: "BH-8",
    type: "residential",
    floors: 9,
    coordinates: { x: 36, y: 80 },
    accessibility: {
      score: 76,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: false
    },
    description: "Tower residence equipped with backup generators for continuous elevator uptime.",
    barriers: [],
    image: null
  },
  {
    id: "gh-1",
    slug: "gh-1",
    name: "Girls Hostel 1 (GH-1)",
    shortName: "GH-1",
    type: "residential",
    floors: 6,
    coordinates: { x: 55, y: 29 },
    accessibility: {
      score: 68,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: false,
      brailleSignage: false
    },
    description: "Secure residential complex for female students with internal laundry, reading room, and medical post.",
    barriers: ["Biometric turnstile gate is narrow for wheelchairs; security key-card gate must be manually unlocked"],
    image: null
  },
  {
    id: "gh-2",
    slug: "gh-2",
    name: "Girls Hostel 2 (GH-2)",
    shortName: "GH-2",
    type: "residential",
    floors: 6,
    coordinates: { x: 46, y: 29 },
    accessibility: {
      score: 70,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: false,
      brailleSignage: false
    },
    description: "Hostel block with attached convenience tuck shop, reading salon, and courtyard.",
    barriers: ["Ramp handrail missing on left side"],
    image: null
  },
  {
    id: "gh-3",
    slug: "gh-3",
    name: "Girls Hostel 3 (GH-3)",
    shortName: "GH-3",
    type: "residential",
    floors: 7,
    coordinates: { x: 47, y: 34 },
    accessibility: {
      score: 78,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: true
    },
    description: "Multi-story residence featuring ground floor barrier-free rooms with grab-rails in washrooms.",
    barriers: [],
    image: null
  },
  {
    id: "gh-4",
    slug: "gh-4",
    name: "Girls Hostel 4 (GH-4)",
    shortName: "GH-4",
    type: "residential",
    floors: 7,
    coordinates: { x: 55, y: 34 },
    accessibility: {
      score: 77,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: false,
      brailleSignage: false
    },
    description: "Residential facility with in-house beauty salon, pharmacy counter, and gym.",
    barriers: ["Gym entrance has 1-step kerb"],
    image: null
  },
  {
    id: "gh-5",
    slug: "gh-5",
    name: "Girls Hostel 5 (GH-5)",
    shortName: "GH-5",
    type: "residential",
    floors: 8,
    coordinates: { x: 9, y: 55 },
    accessibility: {
      score: 82,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: false
    },
    description: "Modern high-rise hostel with spacious lifts and wide automated doors in central lobby.",
    barriers: [],
    image: null
  },
  {
    id: "gh-6",
    slug: "gh-6",
    name: "Girls Hostel 6 (GH-6)",
    shortName: "GH-6",
    type: "residential",
    floors: 8,
    coordinates: { x: 9, y: 62 },
    accessibility: {
      score: 80,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: false
    },
    description: "Hostel tower with step-free dining hall access and shaded covered walkways connecting to GH-5.",
    barriers: [],
    image: null
  },
  {
    id: "faculty-apt-a",
    slug: "faculty-apt-a",
    name: "Faculty & Staff Apartments Tower A",
    shortName: "Faculty Tower A",
    type: "residential",
    floors: 10,
    coordinates: { x: 88, y: 64 },
    accessibility: {
      score: 84,
      ramp: true,
      elevator: true,
      elevatorWorking: true,
      accessibleEntrance: true,
      accessibleWashroom: true,
      tactilePath: true,
      brailleSignage: false
    },
    description: "Residential housing for university professors, international fellows, and staff families.",
    barriers: ["Visitor parking has gravel surface"],
    image: null
  }
]

export const routes = [
  { from: "gate-1", to: "shuttle-terminal", distance: 120, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-1", to: "block-2", distance: 110, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-3", to: "block-4", distance: 120, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-4", to: "block-13", distance: 180, accessible: false, terrain: "gravel", barriers: ["Gravel machinery track","High metal kerb"] },
  { from: "block-13", to: "block-14", distance: 110, accessible: false, terrain: "mixed", barriers: ["Steep slope from testing track"] },
  { from: "block-25", to: "block-26", distance: 120, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-26", to: "block-27", distance: 170, accessible: false, terrain: "gravel", barriers: ["Unpaved farm mud track"] },
  { from: "block-27", to: "block-28", distance: 100, accessible: false, terrain: "gravel", barriers: ["Unpaved agricultural path"] },
  { from: "block-30", to: "block-29", distance: 150, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-30", to: "block-31", distance: 140, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-31", to: "block-32", distance: 160, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-32", to: "block-33", distance: 120, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-34", to: "sunken-garden", distance: 100, accessible: false, terrain: "mixed", barriers: ["Steep stepped terrace"] },
  { from: "block-32", to: "sunken-garden", distance: 90, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-34", to: "student-food-court", distance: 70, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-34", to: "block-35", distance: 130, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-35", to: "block-36", distance: 120, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-36", to: "block-37", distance: 110, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-37", to: "block-38", distance: 120, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-38", to: "gate-4", distance: 200, accessible: false, terrain: "gravel", barriers: ["Unpaved roadside shoulder"] },
  { from: "block-55", to: "block-56", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-35", to: "block-56", distance: 120, accessible: true, terrain: "paved", barriers: [] },
  { from: "unimall", to: "unipolis", distance: 140, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-36", to: "open-air-theatre", distance: 140, accessible: false, terrain: "mixed", barriers: ["Completely stepped stone amphitheater"] },
  { from: "block-3", to: "open-air-theatre", distance: 150, accessible: false, terrain: "mixed", barriers: ["Stepped pathway without ramp"] },
  { from: "indoor-stadium", to: "gate-3", distance: 180, accessible: true, terrain: "paved", barriers: [] },
  { from: "gh-1", to: "gh-2", distance: 80, accessible: true, terrain: "paved", barriers: [] },
  { from: "gh-3", to: "gh-4", distance: 80, accessible: true, terrain: "paved", barriers: [] },
  { from: "gh-5", to: "gh-6", distance: 80, accessible: true, terrain: "paved", barriers: [] },
  { from: "gh-2", to: "faculty-apt-a", distance: 200, accessible: true, terrain: "paved", barriers: [] },
  { from: "faculty-apt-a", to: "gate-4", distance: 240, accessible: true, terrain: "paved", barriers: [] },
  { from: "robopark", to: "block-30", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-29", to: "block-28", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-3", to: "shuttle-terminal", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "gh-4", to: "gh-1", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "robopark", to: "block-27", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "gate-1", to: "block-3", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-14", to: "block-31", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "robopark", to: "block-28", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "robopark", to: "block-25", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "gh-2", to: "gh-3", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-2", to: "shuttle-terminal", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "robopark", to: "unimall", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-25", to: "block-38", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-30", to: "unimall", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-25", to: "gh-5", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-13", to: "unimall", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "gh-4", to: "unimall", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-33", to: "block-34", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-37", to: "shanti-devi-auditorium", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "robopark", to: "block-26", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-36", to: "shanti-devi-auditorium", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "robopark", to: "block-29", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-36", to: "block-33", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "unipolis", to: "block-25", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "unipolis", to: "block-26", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "unipolis", to: "block-27", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "unipolis", to: "block-28", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "unipolis", to: "block-29", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "unipolis", to: "block-30", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-25", to: "bh-2", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "bh-2", to: "bh-3", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "bh-2", to: "bh-4", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "bh-4", to: "bh-3", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "bh-2", to: "bh-5", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "bh-5", to: "bh-6", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "bh-6", to: "block-55", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "gate-2", to: "gh-5", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-25", to: "bh-1", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "bh-1", to: "bh-2", distance: 100, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-3", to: "gh-1", distance: 180, accessible: true, terrain: "paved", barriers: [] },
  { from: "block-14", to: "unimall", distance: 100, accessible: true, terrain: "paved", barriers: [] },
]

export const barrierTypes = [
  { id: "kerb", label: "Kerb / Step", icon: "🚧" },
  { id: "broken-ramp", label: "Broken Ramp", icon: "⚠️" },
  { id: "locked-lift", label: "Locked / Broken Lift", icon: "🔒" },
  { id: "narrow-path", label: "Narrow Pathway", icon: "📏" },
  { id: "uneven-surface", label: "Uneven Surface", icon: "🔶" },
  { id: "no-handrail", label: "Missing Handrail", icon: "🛑" },
  { id: "heavy-door", label: "Heavy Door", icon: "🚪" },
  { id: "steep-slope", label: "Steep Slope", icon: "⛰️" },
  { id: "poor-lighting", label: "Poor Lighting", icon: "💡" },
  { id: "other", label: "Other", icon: "📝" }
]

export const severityLevels = [
  { id: "low", label: "Minor Inconvenience", color: "#F59E0B" },
  { id: "medium", label: "Significant Barrier", color: "#F97316" },
  { id: "high", label: "Complete Blocker", color: "#EF4444" }
]

export const accessibilityFeatures = [
  { id: "ramp", label: "Ramp Available", icon: "♿" },
  { id: "elevator", label: "Elevator", icon: "🛗" },
  { id: "accessibleEntrance", label: "Accessible Entrance", icon: "🚪" },
  { id: "accessibleWashroom", label: "Accessible Washroom", icon: "🚻" },
  { id: "tactilePath", label: "Tactile Path", icon: "🦯" },
  { id: "brailleSignage", label: "Braille Signage", icon: "📋" }
]

export function getBuildingById(id) {
  return buildings.find(b => b.id === id)
}

export function getBuildingBySlug(slug) {
  return buildings.find(b => b.slug === slug)
}

export function getRoutesBetween(fromId, toId) {
  return routes.filter(r =>
    (r.from === fromId && r.to === toId) ||
    (r.from === toId && r.to === fromId)
  )
}

export function getAccessibleRoutes() {
  return routes.filter(r => r.accessible)
}

export function getBuildingsByType(type) {
  return buildings.filter(b => b.type === type)
}

export function getAverageAccessibilityScore() {
  const total = buildings.reduce((sum, b) => sum + b.accessibility.score, 0)
  return Math.round(total / buildings.length)
}
