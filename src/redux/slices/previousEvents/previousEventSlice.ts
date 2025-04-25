import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'
import { DayData, PreviousEventScoreData, PreviousEventStateData, DayDataPayload } from "./previousEvents.types";
import { loadData, saveData, toNumber, SCORE_KEYS, DAY_KEYS } from "@/utils";

const initialState: PreviousEventStateData = loadData<PreviousEventStateData>(SCORE_KEYS.PREVIOUS_EVENT_SCORE) ?? {
  previousEvents: []
}

const previousEventSlice = createSlice({
  name: SCORE_KEYS.PREVIOUS_EVENT_SCORE,
  initialState,
  reducers: {
    updateEvent: (state, action: PayloadAction<DayDataPayload>) => {
      // const {day, field, value} = action.payload
      // requires an event id, a day value and a score
    },
    createEvent: (state) => {
      const newEvent: PreviousEventScoreData = {
        id: uuidv4(),
        name: '',
        days: Object.values(DAY_KEYS).map((dayKey) => ({
          day: dayKey,
          score: ''
        }))
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.previousEvents = state.previousEvents.filter(event => event.id !== id)
    },
    resetState: () => {
      const reset = {
        previousEvents: []
      }

      saveData(SCORE_KEYS.PREVIOUS_EVENT_SCORE, reset)
      return reset
    }
  }
})