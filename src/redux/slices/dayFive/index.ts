export { default as dayFiveReducer } from './dayFiveSlice';
export { 
  updateField as updateFieldDayFive,
  calculateDailyScore as calculateDailyScoreDayFive,
  resetState as resetStateDayFive,
  updateTroopTypeField,
  addTroopType,
  removeTroopType
} from './dayFiveSlice';


export * from './dayFive.types';
export * from './dayFive.utils'
export * from './promotionScore.utils';
export * from './trainingScore.utils';