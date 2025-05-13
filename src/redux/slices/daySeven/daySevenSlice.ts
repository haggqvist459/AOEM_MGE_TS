import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveData, loadData, toNumber, updateFieldDelegated } from "@/utils";
import { DAY_KEYS, POINTS_AND_MULTIPLIERS, TROOP_POWER_MULTIPLIER, TRIBE_LEVEL_MULTIPLIERS } from "@/utils";
import { DaySevenStateData } from '../daySeven'

const tribeLevelDefault = TRIBE_LEVEL_MULTIPLIERS['Level 29-30'];
const targetTierDefault = TROOP_POWER_MULTIPLIER['Tier 7'];

const initialState: DaySevenStateData = loadData<DaySevenStateData>(DAY_KEYS.DAY_SEVEN) ?? {
  buildingPower: {
    firstQueue: '',
    secondQueue: '',
    thirdQueue: ''
  },
  researchPower: '',
  troopsTotal: '',
  troopTier: targetTierDefault,
  tribeLevelMultiplier: tribeLevelDefault,
  stamina: '',
  copperSand: '',
  silverSand: '',
  fineGold: '',
  hammers: '',
  epicMedals: '',
  legendaryMedals: '',
  epicScrolls: '',
  legendaryScrolls: '',
  score: {
    building: 0,
    medals: 0,
    research: 0,
    rings: 0,
    scrolls: 0,
    tribes: 0,
    troops: 0
  },
  totalDailyScore: 0
}

const daySevenSlice = createSlice({
  name: DAY_KEYS.DAY_SEVEN,
  initialState,
  reducers: {
    updateField: (state, action) => updateFieldDelegated(state, action),
    calculateDailyScore: (state, action: PayloadAction<string | undefined>) => {
      const field = action.payload

      switch (field) {
        case 'stamina':
        case 'tribeLevelMultiplier':
          const stamina = toNumber(state.stamina)
          const tribeLevelMultiplier = toNumber(state.tribeLevelMultiplier)
          let tribesHunted = 0;
          if (stamina <= 0) {
            return; // Skip score calculation for empty or negative stamina values
          }
          // Remove all the leftover stamina that can not be used to hunt tribes
          const validatedStamina = stamina - (stamina % POINTS_AND_MULTIPLIERS.STAMINA_PER_TRIBE);
          // Calculate the number of hunted tribes
          tribesHunted = validatedStamina / POINTS_AND_MULTIPLIERS.STAMINA_PER_TRIBE;
          // Calculate the score
          state.score.tribes = tribesHunted * tribeLevelMultiplier
          break;
        case 'legendaryMedals':
        case 'epicMedals':
          const legendaryMedals = toNumber(state.legendaryMedals);
          const epicMedals = toNumber(state.epicMedals);
          state.score.medals = 0;

          if (legendaryMedals > 0) {
            state.score.medals += legendaryMedals * POINTS_AND_MULTIPLIERS.LEGENDARY_MEDAL;
          }
          if (epicMedals > 0) {
            state.score.medals += epicMedals * POINTS_AND_MULTIPLIERS.EPIC_MEDAL;
          }
          break;
        case 'legendaryScrolls':
        case 'epicScrolls':
          const legendaryScrolls = toNumber(state.legendaryScrolls);
          const epicScrolls = toNumber(state.epicScrolls);
          state.score.scrolls = 0

          if (legendaryScrolls > 0) {
            state.score.scrolls += legendaryScrolls * POINTS_AND_MULTIPLIERS.LEGENDARY_SCROLL;
          }
          if (epicScrolls > 0) {
            state.score.scrolls += epicScrolls * POINTS_AND_MULTIPLIERS.EPIC_SCROLL;
          }
          break;
          break;
        case 'hammers':
        case 'fineGold':
        case 'copperSand':
        case 'silverSand':
          const hammers = toNumber(state.hammers);
          const fineGold = toNumber(state.fineGold);
          const copperSand = toNumber(state.copperSand);
          const silverSand = toNumber(state.silverSand);

          state.score.rings = 0
          if (hammers > 0) {
            state.score.rings += hammers * POINTS_AND_MULTIPLIERS.FINE_CRAFT;
          }
          if (copperSand > 0) {
            state.score.rings += copperSand * POINTS_AND_MULTIPLIERS.COPPER_SAND;
          }
          if (silverSand > 0) {
            state.score.rings += silverSand * POINTS_AND_MULTIPLIERS.SILVER_SAND;
          }
          if (fineGold > 0) {
            state.score.rings += fineGold * POINTS_AND_MULTIPLIERS.FINE_GOLD;
          }
          break;
        case 'researchPower':
          state.score.research = toNumber(state.researchPower) * POINTS_AND_MULTIPLIERS.POWER_RESEARCH
          break;
        case 'buildingPower':
          state.score.building = Object.values(state.buildingPower).reduce((total, power) => {
            return total + toNumber(power)
          }, 0) * POINTS_AND_MULTIPLIERS.POWER_BUILDING
          break;
        case 'troopsTotal':
        case 'troopTier':
          state.score.troops = toNumber(state.troopsTotal) * toNumber(state.troopTier) * POINTS_AND_MULTIPLIERS.POWER_TRAINING
          break;
        case 'previousEvent':
          break;
        default:
          console.error(`calculateDailyScore - field: ${field} does not exist for score calculation`)
          break;
      }

      state.totalDailyScore = Object.values(state.score)
        .reduce((total, score) => total + (score || 0), 0);
    },
    resetState: () => {
      const reset: DaySevenStateData = {
        buildingPower: {
          firstQueue: '',
          secondQueue: '',
          thirdQueue: ''
        },
        researchPower: '',
        troopsTotal: '',
        troopTier: targetTierDefault,
        tribeLevelMultiplier: tribeLevelDefault,
        stamina: '',
        copperSand: '',
        silverSand: '',
        fineGold: '',
        hammers: '',
        epicMedals: '',
        legendaryMedals: '',
        epicScrolls: '',
        legendaryScrolls: '',
        score: {
          building: 0,
          medals: 0,
          research: 0,
          rings: 0,
          scrolls: 0,
          tribes: 0,
          troops: 0
        },
        totalDailyScore: 0
      }

      saveData(DAY_KEYS.DAY_SEVEN, reset);
      return reset
    }
  }
})

export const { updateField, calculateDailyScore, resetState } = daySevenSlice.actions
export default daySevenSlice.reducer