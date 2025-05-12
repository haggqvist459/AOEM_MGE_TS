import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DayFiveStateData, TroopType, TroopTypeData, UpdateTroopTypePayload, calculatePromotionScore, calculateTrainingScore } from "../dayFive";
import { saveData, loadData, toNumber, updateFieldDelegated, toSeconds, TROOP_TIER_MULTIPLIERS } from "@/utils";
import { DAY_KEYS, TROOP_TYPES } from "@/utils";
import { TimeData } from "@/types";

const targetTierDefault = TROOP_TIER_MULTIPLIERS['Tier 7'];
const baseTierDefault = TROOP_TIER_MULTIPLIERS['Tier 6'];

const initialState: DayFiveStateData = loadData<DayFiveStateData>(DAY_KEYS.DAY_FIVE) ?? {
  troops: Object.keys(TROOP_TYPES).reduce((acc, troop) => {
    acc[troop as TroopType] = {
      targetTier: targetTierDefault,
      baseTier: baseTierDefault,
      availableTroops: '',
      troopsPerBatch: '',
      promotionTime: {
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
      },
      troopTotalScore: 0,
      maxPromotableBatches: 0,
    };
    return acc;
  }, {} as Record<TroopType, TroopTypeData>),
  trainedTroopsPerBatch: '',
  trainedTroopsTrainingTime: {
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  },
  trainedTroopTier: targetTierDefault,
  hasCityTitle: false,
  hasImperialTitle: false,
  initialTrainingSpeedup: {
    days: '',
    hours: '',
    minutes: ''
  },
  remainingTrainingSpeedup: {
    days: '',
    hours: '',
    minutes: ''
  },
  score: {
    promotion: 0,
    training: 0
  },
  totalDailyScore: 0
}

const dayFiveSlice = createSlice({
  name: DAY_KEYS.DAY_FIVE,
  initialState,
  reducers: {
    updateField: (state, action) => updateFieldDelegated(state, action),
    updateTroopTypeField: (state, action: PayloadAction<UpdateTroopTypePayload>) => {
      const { troopType, field, value, unit } = action.payload

      if (unit) {
        (state.troops[troopType][field] as TimeData)[unit] = value as string
      } else {
        (state.troops[troopType][field] as any) = value
      }
    },
    calculateDailyScore: (state) => {
      let trainingSpeedupSeconds = toSeconds(state.initialTrainingSpeedup)
      let remainingTrainingSpeedup = 0
      // Only calculate the score if there is speed up
      if (trainingSpeedupSeconds >= 0) {
        remainingTrainingSpeedup = calculatePromotionScore(Object.values(state.troops), trainingSpeedupSeconds, state.hasCityTitle, state.hasImperialTitle)
      }

      state.score.promotion = 0;
      Object.values(state.troops).forEach(troop => {
        state.score.promotion += troop.troopTotalScore
      })


      // If there's remaining training speedup after promotion, calculate training score
      state.score.training = 0
      const trainingTimeSeconds = toSeconds(state.trainedTroopsTrainingTime)
      if (trainingTimeSeconds > 0 && remainingTrainingSpeedup > trainingTimeSeconds) {
        state.score.training = calculateTrainingScore(trainingTimeSeconds, remainingTrainingSpeedup, toNumber(state.trainedTroopsPerBatch), toNumber(state.trainedTroopTier), state.hasCityTitle, state.hasImperialTitle)
      }

      state.totalDailyScore = Object.values(state.score)
        .reduce((total, score) => total + (score || 0), 0);
    },
    resetState: () => {
      const reset: DayFiveStateData = {
        troops: Object.keys(TROOP_TYPES).reduce((acc, troop) => {
          acc[troop as TroopType] = {
            targetTier: targetTierDefault,
            baseTier: baseTierDefault,
            availableTroops: '',
            troopsPerBatch: '',
            promotionTime: {
              days: '',
              hours: '',
              minutes: '',
              seconds: '',
            },
            troopTotalScore: 0,
            maxPromotableBatches: 0,
          };
          return acc;
        }, {} as Record<TroopType, TroopTypeData>),
        trainedTroopsPerBatch: '',
        trainedTroopsTrainingTime: {
          days: '',
          hours: '',
          minutes: '',
          seconds: '',
        },
        trainedTroopTier: targetTierDefault,
        hasCityTitle: false,
        hasImperialTitle: false,
        initialTrainingSpeedup: {
          days: '',
          hours: '',
          minutes: ''
        },
        remainingTrainingSpeedup: {
          days: '',
          hours: '',
          minutes: ''
        },
        score: {
          promotion: 0,
          training: 0
        },
        totalDailyScore: 0
      }

      saveData(DAY_KEYS.DAY_FIVE, reset)
      return reset
    }
  }
})

export const { updateField, calculateDailyScore, resetState, updateTroopTypeField } = dayFiveSlice.actions;
export default dayFiveSlice.reducer;