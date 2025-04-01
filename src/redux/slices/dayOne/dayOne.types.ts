import { PreviousEventData } from '@/types';

export type DayOneStateData = {
    stamina: string, 
    tribeLevelMultiplier: string,
    tribesHunted: number
    previousEvent: PreviousEventData,
    score: {
      tribe: number
    }
}