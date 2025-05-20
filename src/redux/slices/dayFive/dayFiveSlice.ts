import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculatePromotionScore, calculateTrainingScore } from "../dayFive";
import { DayFiveStateData, TroopTypeLabel, UpdateTroopTypePayload, PromotedTroopEntry, TrainedTroopEntry, TroopEntry, TroopKind } from '../dayFive'
import { saveData, loadData, toNumber, updateFieldDelegated, toSeconds, TROOP_TIER_MULTIPLIERS } from "@/utils";
import { DAY_KEYS } from "@/utils";
import { TimeData } from "@/types";

const targetTierDefault = TROOP_TIER_MULTIPLIERS['Tier 7'];
const baseTierDefault = TROOP_TIER_MULTIPLIERS['Tier 6'];

const initialState: DayFiveStateData = loadData<DayFiveStateData>(DAY_KEYS.DAY_FIVE) ?? {
  troops: [
    {
      id: '1',
      kind: 'Promotion',
      type: 'Cavalry',
      promotionTime: {
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
      },
      baseTier: baseTierDefault,
      targetTier: targetTierDefault,
      availableTroops: '',
      troopsPerBatch: '',
      maxBatches: 0,
      troopTotalScore: 0
    }
  ],
  nextTroopTypeId: 2,
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
      const { id, field, value, unit } = action.payload
      const troop = state.troops.find(t => t.id === id)
      if (!troop) return

      if (field === 'kind'){
        if (value === 'Promotion'){
          
        } else if (value === 'Training') {

        }
      }
      if (unit) {
        if (typeof troop[field] === 'object' && troop[field] !== null) {
          (troop[field] as TimeData)[unit] = value as string;
        }
      } else {
        if (typeof troop[field] === 'string') {
          (troop[field] as string) = value as string;
        }
      }
    },
    addTroopType: (state) => {
      if (state.troops.length >= 8) return

      console.log("addTroopType, triggered")

      const newTroopType: TroopEntry = {
        id: state.nextTroopTypeId.toString(),
        kind: 'Promotion',
        type: 'Cavalry',
        promotionTime: {
          days: '',
          hours: '',
          minutes: '',
          seconds: ''
        },
        baseTier: baseTierDefault,
        targetTier: targetTierDefault,
        availableTroops: '',
        troopsPerBatch: '',
        maxBatches: 0,
        troopTotalScore: 0
      };

      state.troops.push(newTroopType);
      state.nextTroopTypeId += 1;

    },
    removeTroopType: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      state.troops = state.troops.filter(troop => troop.id !== id);

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
        troops: [
          {
            id: '1',
            kind: 'Promotion',
            type: 'Cavalry',
            promotionTime: {
              days: '',
              hours: '',
              minutes: '',
              seconds: ''
            },
            baseTier: baseTierDefault,
            targetTier: targetTierDefault,
            availableTroops: '',
            troopsPerBatch: '',
            maxBatches: 0,
            troopTotalScore: 0
          }
        ],
        nextTroopTypeId: 2,
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

export const { updateField, calculateDailyScore, resetState, updateTroopTypeField, addTroopType, removeTroopType } = dayFiveSlice.actions;
export default dayFiveSlice.reducer;