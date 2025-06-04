import { DayKey } from "@/types"

export type DayData = {
  day: DayKey
  score: {
    first: string,
    tenth: string
  }
}

export type DayDataPayload = {
  id: string
  day: DayKey,
  field: 'first' | 'tenth'
  value: string
}

export type CreateEventPayload = {
  name: string
  days: DayData[],
  totalScore: {
    first: string,
    tenth: string
  }
}

export type PreviousEventScoreData = {
  name: string
  id: string
  days: DayData[]
  totalScore: {
    first: string,
    tenth: string
  } 
}

export type PreviousEventStateData = {
  previousEvents: PreviousEventScoreData[]
}

export type DayAverageData = {
  day: DayKey
  score: {
    first: number,
    tenth: number
  }
}

export type PreviousEventAverageData = {
  id: string
  days: DayAverageData[]
}

export type PreviousEventNumericData = {
  first: number
  tenth: number
}
