import { TimeData } from '@/types';

export type DayTwoStateData = {
  epicMedals: string
  legendaryMedals: string
  epicScrolls: string
  legendaryScrolls: string
  legendaryBlueprints: string
  preforgedBlueprints: string
  completedBlueprints: number
  forgingTime: TimeData
  forgingSpeedup: TimeData
  score: {
    medals: number
    scrolls: number
    forging: number
  },
  totalDailyScore: number
}