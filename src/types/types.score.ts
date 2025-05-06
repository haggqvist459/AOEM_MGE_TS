import { DayKey } from "./types.day";


export type PreviousEventData = { 
    first: string,
    tenth: string
}

export type DailyScoreData = {
  day: DayKey;
  score: number;
};