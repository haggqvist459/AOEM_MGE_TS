import { GatherTroopData } from './dayThree.types'
import { toNumber, RESOURCE_MULTIPLIERS, POINTS_AND_MULTIPLIERS } from '@/utils'

export const calculateGatheringScore = (
  troop: GatherTroopData,
  allianceCenterId: string,
  richFieldId: string
): number => {
      const completedTurns = toNumber(troop.completedTurns)
      const loadCapacity = toNumber(troop.loadCapacity)
      const loadBonus = toNumber(troop.loadBonus)
      let gatheredResources = 0

      if (completedTurns === 0 || loadCapacity === 0) {
        // console.warn(`Missing values for troop ${troop.name}. Skipping score calculation.`);
        return 0;
      }

      if (allianceCenterId === troop.id) {
        // Base score calculation on alliance center collection
        gatheredResources = completedTurns * loadCapacity
      } else if (richFieldId === troop.id) {
        // Base score calculation on rich field collection 
        const cappedYield = Math.min(loadCapacity, RESOURCE_MULTIPLIERS.RICH);
        gatheredResources = cappedYield * completedTurns;
      } else {
        // Troops are gathering at a regular field. 
        gatheredResources = completedTurns * RESOURCE_MULTIPLIERS.REGULAR
      }

      // full at reset? 
      if (troop.fullAtReset) {
        gatheredResources += loadCapacity
      }
      // load bonus multiplier
      if (loadBonus > 0) {
        const loadMultiplier = 1 + (loadBonus / 100);
        gatheredResources *= loadMultiplier;
      }
      return Math.floor(gatheredResources / POINTS_AND_MULTIPLIERS.RESOURCE_DIVIDER); 
}