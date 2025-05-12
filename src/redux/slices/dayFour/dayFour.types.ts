import { TimeData } from "@/types";

export type DayFourStateData = {
  hammers: string
  copperSand: string
  silverSand: string
  fineGold: string
  universalSpeedup: TimeData
  buildingSpeedup: TimeData
  researchSpeedup: TimeData
  score: {
    rings: number
    universal: number
    building: number
    research: number
  }
  totalDailyScore: number
}