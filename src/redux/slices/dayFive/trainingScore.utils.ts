import { resetValues, updateTimeData, getTrainingReductionMultiplier } from "./dayFive.utils";
import { TrainedTroopEntry } from "./dayFive.types";
import { toSeconds, toNumber, fromSeconds } from "@/utils";
import { TimeData } from "@/types";


export const calculateTrainingScore = (
  troops: TrainedTroopEntry[],
  hasCityTitle: boolean,
  hasImperialTitle: boolean,
  remainingTrainingSpeedup: TimeData
): void => {

  // console.log("calculateTrainingScore start")
  let remainingSpeedup = toSeconds(remainingTrainingSpeedup)

  // reset the values to enable recalculation 
  troops.forEach(resetValues)

  // console.log("calculateTrainingScore troops: ", JSON.parse(JSON.stringify(troops)))
  // validate the troops, ensure only troops with existing data for calculation is accounted for
  let validTroops = troops.filter(troop => {
    const trainingTimeSeconds = toSeconds(troop.trainingTime)
    const troopsPerBatch = toNumber(troop.troopsPerBatch)
    return troopsPerBatch > 0 && trainingTimeSeconds > 0
  });

  // console.log("calculateTrainingScore validTroops: ", JSON.parse(JSON.stringify(validTroops)))

  let remainingTrainingSpeedupSeconds = calculateTrainableBatches(validTroops, remainingSpeedup, hasCityTitle, hasImperialTitle)
  updateTimeData(remainingTrainingSpeedup, fromSeconds(remainingTrainingSpeedupSeconds))

  validTroops.forEach(troop => {
    troop.troopTotalScore = troop.maxBatches * toNumber(troop.targetTier) * toNumber(troop.troopsPerBatch)
  })
}

const calculateTrainableBatches = (
  troops: TrainedTroopEntry[],
  availableTrainingSpeedup: number,
  hasCityTitle: boolean,
  hasImperialTitle: boolean
): number => {

  // console.log("calculateTrainableBatches start")
  const maxTier = troops.reduce(
    (max, troop) => toNumber(troop.targetTier) > toNumber(max) ? troop.targetTier : max,
    troops[0].targetTier
  );

  // console.log("calculateTrainableBatches maxTier: ", maxTier)
  // Filter out any lower tier training troops
  const filteredTroops = troops.filter(t => t.targetTier === maxTier);
  const reductionMultiplier = getTrainingReductionMultiplier(hasCityTitle, hasImperialTitle);

  // console.log("calculateTrainableBatches filteredTroops: ", JSON.parse(JSON.stringify(filteredTroops)));
  let remainingSpeedup = availableTrainingSpeedup;
  let addedBatch = true;

  while (addedBatch) {
    addedBatch = false;
    for (const troop of filteredTroops) {
      const batchSize = toNumber(troop.troopsPerBatch);
      const trainingTime = toSeconds(troop.trainingTime) * reductionMultiplier;
      // console.log("calculateTrainableBatches, values inside while loop, batchSize: ", batchSize, ', trainingTime: ', trainingTime, ', remainingSpeedup: ', remainingSpeedup)
      if (batchSize > 0 && trainingTime > 0 && remainingSpeedup >= trainingTime) {
        troop.maxBatches += 1;
        remainingSpeedup -= trainingTime;
        addedBatch = true;
      }
    }
  }

  // console.log("calculateTrainableBatches filteredTroops after batch allocation: ", JSON.parse(JSON.stringify(filteredTroops)))
  return remainingSpeedup;
}