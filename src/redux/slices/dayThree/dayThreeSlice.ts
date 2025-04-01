import { createSlice } from "@reduxjs/toolkit";
import { DayThreeStateData, GatherMarchData } from './dayThree.types'
import { DAY_KEYS, saveData, loadData, updateFieldDelegated } from "@/utils";

const initialState: DayThreeStateData = loadData<DayThreeStateData>(DAY_KEYS.DAY_THREE) ?? {
  marches: [
    {
      id: '1',
      name: 'March 1',
      fullAtReset: false,
      loadBonus: '',
      loadCapacity: '',
      completedTurns: '',
      score: 0
    }
  ],
  nextMarchId: '2',
  allianceCenterId: '0',
  richFieldId: '0',
  empireCoins: '',
  score: {
    gathering: 0,
    spins:  0 
  },
  totalDailyScore: 0,
  previousEvent: {
    first: '',
    tenth: '',
  }
}

const dayThreeSlice = createSlice({
  name: DAY_KEYS.DAY_THREE,
  initialState, 
  reducers: {

  }
})