import { toNumber, toSeconds } from "@/utils";
import { TroopEntry } from "@/redux";


export const calculateTrainingScore = (
  trainingTime: number,
  remainingSpeedup: number,
  troopsPerBatch: number,
  troopTier: number,
  hasCityTitle: boolean,
  hasImperialTitle: boolean
): number => {

  // console.log("calculateTrainingScore values, trainingTime: ", trainingTime, ', remainingSpeedup: ', remainingSpeedup, ', troopsPerBatch: ', troopsPerBatch, ', troopTier: ', troopTier)
  // Calculate the number of batches given the remaining speedup available
  let adjustedTrainingTime = trainingTime
  const reductionMultiplier = getTrainingReductionMultiplier(hasCityTitle, hasImperialTitle);
  adjustedTrainingTime *= reductionMultiplier;
  let totalBatches = Math.floor(remainingSpeedup / adjustedTrainingTime)
  // Multiply troops per batch with the number of batches, and the score multiplier 

  return totalBatches * troopsPerBatch * troopTier
}


export const calculatePromotionScore = (
  troops: TroopEntry[],
  availableTrainingSpeedup: number,
  hasCityTitle: boolean,
  hasImperialTitle: boolean
): number => {

  // Reset the values for batch numbers and score to prevent accidantally counting stale values
  troops.forEach(resetValues);



  // Remove troops with empty values 
  let validTroops = troops.filter(troop => {
    const troopsPerBatch = toNumber(troop.troopsPerBatch)
    const availableTroops = toNumber(troop.availableTroops)
    const promotionTimeSeconds = toSeconds(troop.promotionTime)
    return troopsPerBatch > 0 && availableTroops > 0 && promotionTimeSeconds > 0
  });

  // Remove all the troops with lower tier targets. 
  validTroops = removeLowTierTroops(validTroops)

  // console.log("calculatePromotionScore; validTroops: ", JSON.parse(JSON.stringify(validTroops)))
  // calculate the promotable batches and return the remaining speedup
  let remainingTrainingSpeedup = calculatePromotableBatches(validTroops, availableTrainingSpeedup, hasCityTitle, hasImperialTitle);

  // Calculate the score
  validTroops.forEach(troop => {
    const scorePerTroop = toNumber(troop.targetTier) - toNumber(troop.baseTier)
    const totalTroopsPromoted = troop.maxPromotableBatches * toNumber(troop.troopsPerBatch)
    troop.troopTotalScore = scorePerTroop * totalTroopsPromoted
  })

  return remainingTrainingSpeedup

}

// Reset the relevant values for each troop type before any calculation
const resetValues = (troop: TroopEntry) => {
  troop.maxPromotableBatches = 0,
    troop.troopTotalScore = 0
}

// Only calculate score for the highest target tier 
const removeLowTierTroops = (troops: TroopEntry[]): TroopEntry[] => {
  const highestTier = Math.max(...troops.map(troop => toNumber(troop.targetTier)))
  return troops.filter(troop => toNumber(troop.targetTier) === highestTier)
}


// Calculate the maximum promotable batches for each troop given the available speedup, return any remaining speedup
const calculatePromotableBatches = (
  troops: TroopEntry[],
  availableTrainingSpeedup: number,
  hasCityTitle: boolean,
  hasImperialTitle: boolean
): number => {
  let remainingSpeedup = availableTrainingSpeedup
  let promotableTroops = troops.slice()

  // Distribute the speedup across the troops in a round-robin manner, want evenly promoted troops
  while (promotableTroops.length > 0) {
    promotableTroops = promotableTroops.filter(troop => {
      let promotionTime = toSeconds(troop.promotionTime)
      promotionTime *= getTrainingReductionMultiplier(hasCityTitle, hasImperialTitle)
      const troopsPerBatch = toNumber(troop.troopsPerBatch)
      const availableTroops = toNumber(troop.availableTroops)

      const hasTroopsLeft = troop.maxPromotableBatches < Math.floor(availableTroops / troopsPerBatch)
      const hasSpeedupLeft = promotionTime > 0 && remainingSpeedup >= promotionTime

      if (hasTroopsLeft && hasSpeedupLeft) {
        troop.maxPromotableBatches++
        remainingSpeedup -= promotionTime
        return true
      }

      return hasTroopsLeft && hasSpeedupLeft
    })
  }

  return remainingSpeedup
}

export const getTrainingReductionMultiplier = (
  hasCityTitle: boolean,
  hasImperialTitle: boolean
): number => {
  let reduction = 0;
  if (hasCityTitle) reduction += 0.05;
  if (hasImperialTitle) reduction += 0.10;
  return 1 - reduction;
};