import { TimeData } from "@/types";
import { TROOP_TIER_MULTIPLIERS, TROOP_TYPES } from "@/utils";

export type TierValue = typeof TROOP_TIER_MULTIPLIERS[keyof typeof TROOP_TIER_MULTIPLIERS]
export type TroopType = keyof typeof TROOP_TYPES

export type UpdateTroopTypePayload = {
  troopType: TroopType
  field: keyof TroopTypeData
  value: string | TimeData
  unit?: keyof TimeData
}

export type TroopTypeData = {
  baseTier: TierValue
  targetTier: TierValue
  availableTroops: string
  troopsPerBatch: string
  promotionTime: TimeData
  troopTotalScore: number
  maxPromotableBatches: number
}

export type DayFiveStateData = {
  troops: Record<TroopType, TroopTypeData>
  trainedTroopsTrainingTime: TimeData
  trainedTroopsPerBatch: string
  trainedTroopTier: TierValue
  initialTrainingSpeedup: TimeData
  remainingTrainingSpeedup: TimeData
  score: {
    promotion: number
    training: number
  }
  totalDailyScore: number
}