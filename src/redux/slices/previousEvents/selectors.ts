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
    const firstTotals: number[] = []
    const tenthTotals: number[] = []

    for (const event of events) {
      let firstSum = 0
      let tenthSum = 0

      for (const day of event.days) {
        const first = toNumber(day.score.first)
        const tenth = toNumber(day.score.tenth)

        if (first > 0) firstSum += first
        if (tenth > 0) tenthSum += tenth
      }

      if (firstSum > 0) firstTotals.push(firstSum)
      if (tenthSum > 0) tenthTotals.push(tenthSum)
    }

    const avg = (values: number[]) =>
      values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0

    return {
      first: avg(firstTotals),
      tenth: avg(tenthTotals),
    }
  }
)


// /*


// */