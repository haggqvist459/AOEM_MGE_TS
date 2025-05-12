import { TROOP_POWER_MULTIPLIER } from "@/utils";

export type DaySixStateData = {
  troopsTotal: string
  troopTier: typeof TROOP_POWER_MULTIPLIER[keyof typeof TROOP_POWER_MULTIPLIER]
  researchPower: string
  buildingPower: {
    firstQueue: string
    secondQueue: string
    thirdQueue: string
  }
  score: {
    troop: number
    building: number
    research: number
  }
  totalDailyScore: number
}