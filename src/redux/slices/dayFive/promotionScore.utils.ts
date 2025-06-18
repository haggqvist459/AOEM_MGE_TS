import { resetValues, updateTimeData, getTrainingReductionMultiplier } from "./dayFive.utils";
import { PromotedTroopEntry } from "./dayFive.types";
import { toNumber, toSeconds, fromSeconds } from "@/utils";
import { TimeData } from "@/types";

export const calculatePromotionScore = (
  troops: PromotedTroopEntry[],
  initialTrainingSpeedup: TimeData,
  remainingTrainingSpeedup: TimeData,
  hasCityTitle: boolean,
  hasImperialTitle: boolean,
): void => {

  let availableTrainingSpeedup = toSeconds(initialTrainingSpeedup)

  // Reset the values for batch numbers and score to prevent accidantally counting stale values
  troops.forEach(resetValues);

  // Remove troops with empty values 
  let validTroops = troops.filter(troop => {
    const troopsPerBatch = toNumber(troop.troopsPerBatch)
    const availableTroops = toNumber(troop.availableTroops)
    const promotionTimeSeconds = toSeconds(troop.promotionTime)
    return troopsPerBatch > 0 && availableTroops > 0 && promotionTimeSeconds > 0
  });

  if (validTroops.length === 0) return;

  let remainingTrainingSpeedupSeconds = calculatePromotableBatches(validTroops, availableTrainingSpeedup, hasCityTitle, hasImperialTitle);
  updateTimeData(remainingTrainingSpeedup, fromSeconds(remainingTrainingSpeedupSeconds))

  // Calculate the score
  validTroops.forEach(troop => {
    const scorePerTroop = toNumber(troop.targetTier) - toNumber(troop.baseTier)
    const totalTroopsPromoted = troop.maxBatches * toNumber(troop.troopsPerBatch)
    troop.troopTotalScore = scorePerTroop * totalTroopsPromoted
    console.log("troop score: ", troop.troopTotalScore)
  })

}


// Calculate the maximum promotable batches for each troop given the available speedup, return any remaining speedup
const calculatePromotableBatches = (
  troops: PromotedTroopEntry[],
  availableTrainingSpeedup: number,
  hasCityTitle: boolean,
  hasImperialTitle: boolean,
): number => {
  let remainingSpeedup = availableTrainingSpeedup
  let promotableTroops = troops.slice()

  // Distribute the speedup across the troops in a round-robin manner, want evenly promoted troops
  while (promotableTroops.length > 0) { // As long as there are promotable troops left in the array
    promotableTroops = promotableTroops.filter(troop => {
      let promotionTime = toSeconds(troop.promotionTime)
      promotionTime *= getTrainingReductionMultiplier(hasCityTitle, hasImperialTitle)
      const troopsPerBatch = toNumber(troop.troopsPerBatch)
      const availableTroops = toNumber(troop.availableTroops)

      const hasTroopsLeft = troop.maxBatches < Math.floor(availableTroops / troopsPerBatch)
      const hasSpeedupLeft = promotionTime > 0 && remainingSpeedup >= promotionTime

      if (hasTroopsLeft && hasSpeedupLeft) {
        troop.maxBatches++
        remainingSpeedup -= promotionTime
        return true // ...keep this troop in the promotable array for the next round
      }

      // If not enough troops or speedup, remove this troop from the promotable array
      return hasTroopsLeft && hasSpeedupLeft
    })
  }

  return remainingSpeedup
}
