import { PreviousEventData } from "@/types";
import { TROOP_TIER_MULTIPLIERS } from "@/utils";


export type TroopPowerData = {
  troopsTotal: string
  troopTier: typeof TROOP_TIER_MULTIPLIERS[keyof typeof TROOP_TIER_MULTIPLIERS]
}

export type DaySixStateData = {
  troopPower: TroopPowerData,
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
  previousEvent: PreviousEventData
}