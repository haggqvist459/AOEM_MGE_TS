import { PreviousEventData } from "@/types";


export type UpdateTroopPayload = {
  id: string
  field: string
  value: string | boolean
}

export type GatherTroopData = {
  id: string
  name: string
  loadBonus: string
  loadCapacity: string
  completedTurns: string
  fullAtReset: boolean
  score: number
}

export type DayThreeStateData = {
  troops: GatherTroopData[]
  richFieldId: string
  allianceCenterId: string
  nextTroopId: number
  empireCoins: string
  score: {
    gathering: number
    spins: number
  }
  totalDailyScore: number
  previousEvent: PreviousEventData
}