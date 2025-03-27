import { PreviousEventData } from '@/types';
import { TRIBE_LEVEL_MULTIPLIERS } from '@/utils';

export type TribeLevelMultiplierData = typeof TRIBE_LEVEL_MULTIPLIERS[keyof typeof TRIBE_LEVEL_MULTIPLIERS];

export type ScoreData = {
    tribe: number
}

export type StateData = {
    stamina: string, 
    tribeLevelMultiplier: TribeLevelMultiplierData,
    tribesHunted: number
    previousEvent: PreviousEventData,
    score: ScoreData
}