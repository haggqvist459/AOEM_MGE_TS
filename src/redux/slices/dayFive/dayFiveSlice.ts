import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculatePromotionScore, calculateTrainingScore } from "../dayFive";
import { DayFiveStateData, UpdateTroopTypePayload, PromotedTroopEntry, TrainedTroopEntry, TroopEntry } from '../dayFive'
import { saveData, loadData, updateFieldDelegated, toSeconds, TROOP_TIER_MULTIPLIERS } from "@/utils";
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

      if (field === 'kind') {
        const troopIndex = state.troops.findIndex(t => t.id === id);
        if (troopIndex === -1) return;

        if (value === 'Promotion') {
          // Create new PromotedTroopEntry with same id/type/targetTier as before, others defaulted
          const newEntry: PromotedTroopEntry = {
            id: troop.id,
            kind: 'Promotion',
            type: troop.type,
            baseTier: baseTierDefault,
            targetTier: troop.targetTier,
            promotionTime: { days: '', hours: '', minutes: '', seconds: '' },
            availableTroops: '',
            troopsPerBatch: '',
            maxBatches: 0,
            troopTotalScore: 0,
          };
          state.troops[troopIndex] = newEntry;
        } else if (value === 'Training') {
          const newEntry: TrainedTroopEntry = {
            id: troop.id,
            kind: 'Training',
            type: troop.type,
            targetTier: troop.targetTier,
            trainingTime: { days: '', hours: '', minutes: '', seconds: '' },
            troopsPerBatch: '',
            maxBatches: 0,
            troopTotalScore: 0,
          };
          state.troops[troopIndex] = newEntry;
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
      // console.log("calculateDailyScore start")

      // Only calculate the score if there is speed up
      if (toSeconds(state.initialTrainingSpeedup) > 0) {
        const promotedTroops = state.troops.filter(troop => troop.kind === 'Promotion');
        calculatePromotionScore(promotedTroops, state.initialTrainingSpeedup, state.remainingTrainingSpeedup, state.hasCityTitle, state.hasImperialTitle)
      }

      state.score.promotion = state.troops
        .filter(troop => troop.kind === 'Promotion')
        .reduce((sum, troop) => sum + troop.troopTotalScore, 0)


      // If there's remaining training speedup after promotion, calculate training score
      if (toSeconds(state.remainingTrainingSpeedup) > 0) {
        const trainedTroops = state.troops.filter(troop => troop.kind === 'Training')
        calculateTrainingScore(trainedTroops, state.hasCityTitle, state.hasImperialTitle, state.remainingTrainingSpeedup )
      }

      state.score.training = state.troops
      .filter(troop => troop.kind === 'Training')
      .reduce((sum, troop) => sum + troop.troopTotalScore, 0)

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