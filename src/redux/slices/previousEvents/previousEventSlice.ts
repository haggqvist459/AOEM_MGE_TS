import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'
import { DayData, PreviousEventScoreData, PreviousEventStateData, DayDataPayload, CreateEventPayload } from "./previousEvents.types";
import { loadData, saveData, toNumber, SCORE_KEYS, DAY_KEYS } from "@/utils";

const initialState: PreviousEventStateData = loadData<PreviousEventStateData>(SCORE_KEYS.PREVIOUS_EVENT_SCORE) ?? {
  previousEvents: []
}

const previousEventSlice = createSlice({
  name: SCORE_KEYS.PREVIOUS_EVENT_SCORE,
  initialState,
  reducers: {
    updateEvent: (state, action: PayloadAction<DayDataPayload>) => {
      const { id, day, field, value } = action.payload
      console.log("updateEvent payload values, id: ", id, ', day: ', day, ', field: ', field, ', value: ', value)
      console.log(state)
      const eventIndex = state.previousEvents.findIndex(e => e.id === id)
      if (eventIndex === -1) return // some error, event not found 

      const event = state.previousEvents[eventIndex]
      const dayIndex = event.days.findIndex(d => d.day === day)
      if (field === 'first') {
        event.days[dayIndex].score.first = value
      } else if (field === 'tenth') {
        event.days[dayIndex].score.tenth = value
      }
      
    },
    createEvent: (state, action: PayloadAction<CreateEventPayload>) => {
      const { name, days } = action.payload
      state.previousEvents.push({
        id: uuidv4(),
        name,
        days
      })
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

export const { updateEvent, createEvent, deleteEvent, resetState } = previousEventSlice.actions
export default previousEventSlice.reducer