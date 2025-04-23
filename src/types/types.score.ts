import { DAY_KEYS } from "@/utils";
import { DayKey } from "./types.day";


export type PreviousEventData = { 
    first: string,
    tenth: string
}

export type DailyScoreData = {
  day: DayKey;
  score: number;
};

export type PreviousScoreData = {
  day: string;
  score: {
    first: number;
    tenth: number;
  };
};