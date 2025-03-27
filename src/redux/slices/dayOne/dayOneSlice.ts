import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ScoreData, TribeLevelMultiplierData, StateData } from './dayOne.types'
import { DAY_KEYS, TRIBE_LEVEL_MULTIPLIERS, updateFieldDelegated } from '@/utils'


const initialState: StateData = {
    tribeLevelMultiplier: Object.values(TRIBE_LEVEL_MULTIPLIERS)[0], 
    stamina: '',
    tribesHunted: 0,
    score: {
       tribe: 0 
    },
    previousEvent: {
        first: '',
        tenth: ''
    }
}

const dayOneSlice = createSlice({
    name: DAY_KEYS.DAY_ONE,
    initialState,
    reducers: {
        updateField: (state, action) => updateFieldDelegated(state, action),

    }
})