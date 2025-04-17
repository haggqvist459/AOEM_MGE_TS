
export type PreviousEventData = { 
    first: string,
    tenth: string
}


export type DailyScoreData = {
  day: string;
  score: number;
};

export type PreviousScoreData = {
  day: string;
  score: {
    first: number;
    tenth: number;
  };
};