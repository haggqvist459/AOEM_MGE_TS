import { PreviousEventData } from "@/types";
import { TROOP_POWER_MULTIPLIER, TRIBE_LEVEL_MULTIPLIERS } from "@/utils";

export type TribeLevelValue = typeof TRIBE_LEVEL_MULTIPLIERS[keyof typeof TRIBE_LEVEL_MULTIPLIERS] 
export type TroopTierValue = typeof TROOP_POWER_MULTIPLIER[keyof typeof TROOP_POWER_MULTIPLIER]

export type DaySevenStateData = {
  hammers: string
  copperSand: string
  silverSand: string
  fineGold: string
  epicMedals: string
  legendaryMedals: string
  epicScrolls: string
  legendaryScrolls: string
  stamina: string, 
  tribeLevelMultiplier: TribeLevelValue,
  troopsTotal: string
  troopTier: TroopTierValue
  researchPower: string
  buildingPower: {
    firstQueue: string
    secondQueue: string
    thirdQueue: string
  }
  score: {
    tribes: number,
    medals: number,
    scrolls: number,
    rings: number,
    troops: number,
    building: number,
    research: number,
  }
  totalDailyScore: number
  previousEvent: PreviousEventData
}