import { DayKey } from "@/types"

export type DayData = {
  day: DayKey
  score: string
}

export type CreateEventPayload = {
  name: string
  days: DayData[]
}

export type DayDataPayload = {
  id: string
  day: DayKey
  value: string
}

export type PreviousEventScoreData = {
  name: string
  id: string
  days: DayData[]
}

export type PreviousEventStateData = {
  previousEvents: PreviousEventScoreData[]
}