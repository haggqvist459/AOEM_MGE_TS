import { TroopEntry } from "@/redux";
import { TimeData } from "@/types";

export const getTrainingReductionMultiplier = (
  hasCityTitle: boolean,
  hasImperialTitle: boolean
): number => {
  let reduction = 0;
  if (hasCityTitle) reduction += 0.05;
  if (hasImperialTitle) reduction += 0.10;
  return 1 - reduction;
};


// Reset the relevant values for each troop type before any calculation
export const resetValues = (troop: TroopEntry) => {
  troop.maxBatches = 0;
  troop.troopTotalScore = 0;
}

export const updateTimeData = (target: TimeData, source: TimeData): void => {
  target.days = source.days;
  target.hours = source.hours;
  target.minutes = source.minutes;
  target.seconds = source.seconds;
}
