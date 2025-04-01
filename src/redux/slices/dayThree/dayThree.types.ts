import { PreviousEventData } from "@/types";

export type GatherMarchData = {
  id: string
  name: string
  loadBonus: string
  loadCapacity: string
  completedTurns: string
  fullAtReset: boolean
  score: number
}

export type DayThreeStateData = {
  marches: GatherMarchData[]
  richFieldId: string
  allianceCenterId: string
  nextMarchId: string
  empireCoins: string
  score: {
    gathering: number
    spins: number
  }
  totalDailyScore: number
  previousEvent: PreviousEventData
}