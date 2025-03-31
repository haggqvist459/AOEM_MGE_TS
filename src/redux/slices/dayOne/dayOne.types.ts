import { PreviousEventData } from '@/types';

export type ScoreData = {
    tribe: number
}

export type StateData = {
    stamina: string, 
    tribeLevelMultiplier: string,
    tribesHunted: number
    previousEvent: PreviousEventData,
    score: ScoreData
}