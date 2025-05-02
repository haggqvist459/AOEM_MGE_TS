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
  days: DayData[]
}

export type PreviousEventScoreData = {
  name: string
  id: string
  days: DayData[]
}

export type PreviousEventAverageData = {
  day: DayKey,
  score: {
    first: string,
    tenth: string
  }
}

export type PreviousEventStateData = {
  previousEvents: PreviousEventScoreData[]
}