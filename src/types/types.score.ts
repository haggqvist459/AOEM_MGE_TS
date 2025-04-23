import { DAY_KEYS } from "@/utils";


export type PreviousEventData = { 
    first: string,
    tenth: string
}

type DayKey = (typeof DAY_KEYS)[keyof typeof DAY_KEYS];

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