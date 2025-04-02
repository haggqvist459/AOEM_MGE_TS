import { PreviousEventData } from "@/types";


export type UpdateMarchPayload = {
  id: string
  field: keyof GatherMarchData
  value: string | boolean
}

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
  nextMarchId: number
  empireCoins: string
  score: {
    gathering: number
    spins: number
  }
  totalDailyScore: number
  previousEvent: PreviousEventData
}