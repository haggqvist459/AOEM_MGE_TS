import { TimeData } from "@/types";
import { TROOP_TIER_MULTIPLIERS } from "@/utils";

export const TROOP_TYPE_LABELS = ['Archers', 'Cavalry', 'Pikemen', 'Swordsmen'] as const;
export type TierValue = typeof TROOP_TIER_MULTIPLIERS[keyof typeof TROOP_TIER_MULTIPLIERS]
export type TroopTypeLabel = typeof TROOP_TYPE_LABELS[number];
export type TroopEntry = PromotedTroopEntry | TrainedTroopEntry;
export type TroopKind = 'Promotion' | 'Training'

export interface PromotedTroopEntry {
  kind: 'Promotion';
  id: string
  type: TroopTypeLabel
  baseTier: TierValue;
  targetTier: TierValue;
  availableTroops: string;
  troopsPerBatch: string;
  promotionTime: TimeData;
  troopTotalScore: number;
  maxBatches: number;
}

export interface TrainedTroopEntry {
  kind: 'Training';
  id: string
  type: TroopTypeLabel
  targetTier: TierValue;
  troopsPerBatch: string;
  trainingTime: TimeData;
  troopTotalScore: number;
  maxBatches: number;
}


export type UpdateTroopTypePayload = {
  id: string
  field: keyof TroopEntry
  unit?: keyof TimeData
  value: string | TimeData | number
}


export type DayFiveStateData = {
  troops: TroopEntry[]
  nextTroopTypeId: number
  initialTrainingSpeedup: TimeData
  remainingTrainingSpeedup: TimeData
  hasImperialTitle: boolean,
  hasCityTitle: boolean
  score: {
    promotion: number
    training: number
  }
  totalDailyScore: number
}