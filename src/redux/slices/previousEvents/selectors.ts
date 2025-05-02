import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/redux/store"
import { DayData, PreviousEventAverageData, DayAverageData, PreviousEventScoreData } from './previousEvents.types'
import { toNumber, DAY_KEYS, SCORE_KEYS} from "@/utils"


export const selectPreviousScoreAverages = createSelector(
  [(state: RootState) => state[SCORE_KEYS.PREVIOUS_EVENT_SCORE].previousEvents],
  (events) => {

    const dailyAverages: PreviousEventAverageData = {
      id: 'previousEventAverageData',
      days: Object.values(DAY_KEYS).map(dayKey => ({
        day: dayKey,
        score: {
          first: 0,
          tenth: 0
        }
      }))
    }

    const accumulators = Array.from({ length: 7 }, () => ({
      firstTotal: 0,
      firstCount: 0,
      tenthTotal: 0,
      tenthCount: 0,
    }))
    
    // loop through each event and 
    events.forEach((event: PreviousEventScoreData) => {
      event.days.forEach((day: DayData, index) => {
        if (toNumber(day.score.first) > 0) {
          accumulators[index].firstTotal += toNumber(day.score.first)
          accumulators[index].firstCount++
        }
        if (toNumber(day.score.tenth) > 0) {
          accumulators[index].tenthTotal += toNumber(day.score.tenth)
          accumulators[index].tenthCount++
        }
      })
    })

    dailyAverages.days.forEach((day, index) => {
      if (accumulators[index].firstCount > 0){
        day.score.first = accumulators[index].firstTotal / accumulators[index].firstCount
      }
      if (accumulators[index].tenthCount > 0){
        day.score.tenth = accumulators[index].tenthTotal / accumulators[index].tenthCount
      }
    })

    return dailyAverages;
  }
)



export const selectTotalScoreAverages = createSelector(
  [(state: RootState) => state[SCORE_KEYS.PREVIOUS_EVENT_SCORE].previousEvents],
  (events) => {
    

    events.forEach((event:PreviousEventScoreData) => {
      let eventFirstTotal = 0;
      let eventTenthTotal = 0;
      event.days.forEach((day: DayData, ) => {
        if(toNumber(day.score.first) > 0) {
          // accumulate each 
        }
      })
    })

  }
)


// /*


// */