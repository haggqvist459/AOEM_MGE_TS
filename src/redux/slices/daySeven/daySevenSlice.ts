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
  totalDailyScore: 0,
  previousEvent: {
    first: '',
    tenth: ''
  }
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
          state.score.tribes = 0
          break;
        case 'legendaryMedals':
        case 'epicMedals':
          state.score.medals = 0
          break;
        case 'legendaryScrolls':
        case 'epicScrolls':
          state.score.scrolls = 0
          break;
        case 'hammers':
        case 'fineGold':
        case 'copperSand':
        case 'silverSand':
          state.score.rings = 0
          break;
        case 'researchPower':
          state.score.research = 0
          break;
        case 'buildingPower':
          state.score.building = 0
          break;
        case 'troopsTotal':
        case 'troopTier':
          state.score.troops = 0
          break;
        case 'previousEvent':
          break;
        default:
          console.error(`calculateDailyScore - field: ${field} does not exist for score calculation`)
          break;

      }
    },
    resetState: () => {
      const reset = {
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
        totalDailyScore: 0,
        previousEvent: {
          first: '',
          tenth: ''
        }
      }

      saveData(DAY_KEYS.DAY_SEVEN, reset);
      return reset
    }
  }
})

export const { updateField, calculateDailyScore, resetState } = daySevenSlice.actions
export default daySevenSlice.reducer