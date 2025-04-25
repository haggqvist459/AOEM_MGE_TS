

export const ROUTES = {
    HOME: '/',
    TOTAL_SCORE: '/totalScore',
    PREVIOUS_SCORE: '/previousScore',
    ADMIN: '/admin',
    ABOUT: '/about',
    ERROR: '/*',
} as const

export const NAVBAR_OPTIONS = {
    HOME: {
        route: ROUTES.HOME,
        id: 1,
        text: 'Calculators'
    },
    TOTAL_SCORE: {
        route: ROUTES.TOTAL_SCORE,
        id: 2,
        text: 'Total Score'
    },
    PREVIOUS_SCORE: {
        route: ROUTES.PREVIOUS_SCORE,
        id: 3,
        text: 'Previous Event Score'
    },
    ADMIN: {
        route: ROUTES.ADMIN,
        id: 4,
        text: 'Admin'
    },
    ABOUT: {
        route: ROUTES.ABOUT,
        id: 5,
        text: 'About'
    },
} as const

export const SCORE_KEYS = {
  TOTAL_SCORE: 'totalScore',
  PREVIOUS_EVENT_SCORE: 'previousEventScore'
} as const 

export const DAY_KEYS = {
    DAY_ONE: 'dayOne',
    DAY_TWO: 'dayTwo',
    DAY_THREE: 'dayThree',
    DAY_FOUR: 'dayFour',
    DAY_FIVE: 'dayFive',
    DAY_SIX: 'daySix',
    DAY_SEVEN: 'daySeven'
} as const

export const DAY_TITLES = {
    [DAY_KEYS.DAY_ONE]: 'Day One',
    [DAY_KEYS.DAY_TWO]: 'Day Two',
    [DAY_KEYS.DAY_THREE]: 'Day Three',
    [DAY_KEYS.DAY_FOUR]: 'Day Four',
    [DAY_KEYS.DAY_FIVE]: 'Day Five',
    [DAY_KEYS.DAY_SIX]: 'Day Six',
    [DAY_KEYS.DAY_SEVEN]: 'Day Seven',
} as const


export const TROOP_POWER_MULTIPLIER = {
    'Tier 7': "6",
    'Tier 6': "4.2",
    'Tier 5': "2.9",
    'Tier 4': "2.2",
    'Tier 3': "1.7",
    'Tier 2': "1.3",
    'Tier 1': "1",
} as const 

export const TRIBE_LEVEL_MULTIPLIERS = {
    'Level 29-30': "300",
    'Level 25-28': "260",
    'Level 21-24': "220",
    'Level 17-20': "180",
    'Level 13-16': "150",
    'Level 9-12': "100",
    'Level 5-8': "80",
    'Level 1-4': "50",
} as const


export const TROOP_TIER_MULTIPLIERS = {
    'Tier 7': "100",
    'Tier 6': "50",
    'Tier 5': "20",
    'Tier 4': "10",
    'Tier 3': "5",
    'Tier 2': "3",
    'Tier 1': "2",
} as const


export const TROOP_TYPES = {
  Archers: null,
  Cavalry: null,
  Swordsmen: null,
  Pikemen: null,
} as const

export const RESOURCE_MULTIPLIERS = {
    REGULAR: 3780000,
    RICH: 12600000,
} as const

export const RESOURCE_FIELD_MAP = {
    REGULAR: 'Regular field',
    RICH: 'Rich field',
    ALLIANCE: 'Alliance center'
} as const


export const POINTS_AND_MULTIPLIERS = {
    STAMINA_PER_TRIBE: 5,
    STAMINA_DAILY_BOOST: 50,
    STAMINA_DAILY_PREV: 45,
    LEGENDARY_BLUEPRINT: 30000,
    EPIC_MEDAL: 500,
    LEGENDARY_MEDAL: 2500,
    EPIC_SCROLL: 350,
    LEGENDARY_SCROLL: 2500,
    RESOURCE_DIVIDER: 100,
    FIVE_SPIN_COST: 4200,
    SINGLE_SPIN_COST: 900,
    ADVENT_SCORE: 1000,
    SPEEDUP_BUILDING: 30,
    SPEEDUP_UNIVERSAL: 30,
    SPEEDUP_RESEARCH: 30,
    FINE_CRAFT: 2000,
    COPPER_SAND: 400,
    SILVER_SAND: 1000,
    FINE_GOLD: 3000,
    METEOR_STEEL: 20000,
    POWER_BUILDING: 3,
    POWER_RESEARCH: 6,
    POWER_TRAINING: 3
} as const


