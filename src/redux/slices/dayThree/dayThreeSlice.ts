import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DayThreeStateData, UpdateTroopPayload } from './dayThree.types';
import { calculateGatheringScore } from './dayThree.utils';
import { saveData, loadData, updateFieldDelegated, toNumber, } from "@/utils";
import { DAY_KEYS, POINTS_AND_MULTIPLIERS } from '@/utils';

const initialState: DayThreeStateData = loadData<DayThreeStateData>(DAY_KEYS.DAY_THREE) ?? {
  troops: [
    {
      id: '1',
      name: 'Troop 1',
      fullAtReset: false,
      loadBonus: '',
      loadCapacity: '',
      completedTurns: '',
      score: 0
    }
  ],
  nextTroopId: 2,
  allianceCenterId: '0',
  richFieldId: '0',
  empireCoins: '',
  score: {
    gathering: 0,
    spins: 0
  },
  totalDailyScore: 0,
}

const dayThreeSlice = createSlice({
  name: DAY_KEYS.DAY_THREE,
  initialState,
  reducers: {
    updateField: (state, action) => updateFieldDelegated(state, action),
    updateTroopField(state, action: PayloadAction<UpdateTroopPayload>) {
      const { id, field, value } = action.payload;
      const troopIndex = state.troops.findIndex(t => t.id === id);
      if (troopIndex === -1) return;

      const troop = state.troops[troopIndex];
      if (!(field in troop)) return;

      (troop as any)[field] = value;
    },
    calculateDailyScore: (state, action: PayloadAction<string | undefined>) => {
      const id = action.payload;

      // console.log("calculateDailyScore triggerd with id: ", id)

      // default dropdown value, no calculation should be performed. 
      if (id === '0') return
      if (id === 'previousEvent') return;
      if (id === 'empireCoins') {
        // console.log("empireCoins calculation ")
        state.score.spins = 0;
        const empireCoins = toNumber(state.empireCoins);
        const fiveSpinCount = Math.floor(empireCoins / POINTS_AND_MULTIPLIERS.FIVE_SPIN_COST);
        const remainingCoins = empireCoins % POINTS_AND_MULTIPLIERS.FIVE_SPIN_COST;
        const singleSpinCount = Math.floor(remainingCoins / POINTS_AND_MULTIPLIERS.SINGLE_SPIN_COST);
        // console.log("empireCoins calculation values, empireCoins: ", empireCoins, ' fiveSpinCount: ', fiveSpinCount, ' remainingCoins: ', remainingCoins, ' singleSpinCount: ', singleSpinCount)
        state.score.spins = (fiveSpinCount * POINTS_AND_MULTIPLIERS.ADVENT_SCORE * 5) + (singleSpinCount * POINTS_AND_MULTIPLIERS.ADVENT_SCORE);
        state.totalDailyScore = state.score.spins + state.score.gathering
        return;
      }
      if (id === 'dropdownSelection') {
        state.troops.forEach(troop => (
          troop.score = calculateGatheringScore(troop, state.allianceCenterId, state.richFieldId)
        ))
        state.score.gathering = state.troops.reduce((total, troop) => total + troop.score, 0);
        state.totalDailyScore = state.score.gathering + state.score.spins;
        return;
      }

      // find the index of the troop to calculate
      const troopIndex = state.troops.findIndex(troop => troop.id === id);
      const troop = state.troops[troopIndex];

      troop.score = calculateGatheringScore(troop, state.allianceCenterId, state.richFieldId)
      // Accumulate the scores from each troop
      state.score.gathering = state.troops.reduce((total, troop) => total + troop.score, 0);
      // Update totalDailyScore to reflect both gathering and spins scores
      state.totalDailyScore = state.score.gathering + state.score.spins;

    },
    addTroop: (state) => {
      if (state.troops.length >= 5) return

      const newtroop = {
        id: state.nextTroopId.toString(),
        name: `Troop ${state.nextTroopId}`,
        fullAtReset: false,
        loadBonus: '',
        loadCapacity: '',
        completedTurns: '',
        score: 0
      }

      state.troops.push(newtroop);
      state.nextTroopId += 1;

    },
    removeTroop: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.troops = state.troops.filter(troop => troop.id !== id);
    },
    resetState: () => {
      const reset: DayThreeStateData = {
        troops: [
          {
            id: '1',
            name: 'Troop 1',
            fullAtReset: false,
            loadBonus: '',
            loadCapacity: '',
            completedTurns: '',
            score: 0
          }
        ],
        nextTroopId: 2,
        allianceCenterId: '0',
        richFieldId: '0',
        empireCoins: '',
        score: {
          gathering: 0,
          spins: 0
        },
        totalDailyScore: 0,
      }

      saveData(DAY_KEYS.DAY_THREE, reset);
      return reset;
    }
  }
})


export const { updateField, calculateDailyScore, resetState, addTroop, removeTroop, updateTroopField } = dayThreeSlice.actions;
export default dayThreeSlice.reducer;