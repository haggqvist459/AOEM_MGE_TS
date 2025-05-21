import { useState } from 'react'
import { TroopEntry, TROOP_TYPE_LABELS } from '@/redux'
import { TROOP_TIER_MULTIPLIERS } from '@/utils'
import { TimeData } from '@/types'
import { ExpandableSection, RowWrapper, Input, TimeSelector } from '@/components'
import { Dropdown, mapToDropdownOptions } from '@/components/ui/dropdown'



type Props = {
  troopTypeData: TroopEntry,
  onChange: (id: string, field: keyof TroopEntry, value: string, unit?: keyof TimeData | undefined) => void
  onBlur: (id: string, field: keyof TroopEntry, unit?: keyof TimeData | undefined) => void
  onInstantDispatch: (id: string, field: keyof TroopEntry, value: string) => void
  onDelete: (id: string) => void
}
const TroopType = ({
  troopTypeData,
  onBlur,
  onChange,
  onInstantDispatch,
  onDelete
}: Props) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const troopTierOptions = mapToDropdownOptions(TROOP_TIER_MULTIPLIERS)
  const troopKindOptions = [
    { label: 'Promotion', value: 'Promotion' },
    { label: 'Training', value: 'Training' },
  ];
  const troopTypeOptions = TROOP_TYPE_LABELS.map(label => ({ label, value: label }));

  return (
    <ExpandableSection title={`${troopTypeData.type}, ${troopTypeData.kind}`} isExpanded={isExpanded} toggleExpansion={() => setIsExpanded(prev => !prev)} >
      <RowWrapper>
        <Dropdown
          id={`${troopTypeData.id}-troopKindDropdown`}
          label='Action'
          options={troopKindOptions}
          value={troopTypeData.kind}
          onChange={(e) => onInstantDispatch(troopTypeData.id, 'kind', e.target.value)}
        />
        <Dropdown
          id={`${troopTypeData.id}-troopTypeDropdown`}
          label='Troop type'
          options={troopTypeOptions}
          value={troopTypeData.type}
          onChange={(e) => onInstantDispatch(troopTypeData.id, 'type', e.target.value)}
        />
      </RowWrapper>
      {troopTypeData.kind === 'Promotion' &&
        <div>
          <RowWrapper>
            <Dropdown
              id={`${troopTypeData.id}-promotionBaseTier`}
              label='Base tier'
              options={troopTierOptions}
              value={troopTypeData.baseTier}
              onChange={(e) => onInstantDispatch(troopTypeData.id, 'baseTier' as keyof TroopEntry, e.target.value)}
            />
            <Dropdown
              id={`${troopTypeData.id}-promotionTargetTier`}
              label='Target tier'
              options={troopTierOptions}
              value={troopTypeData.targetTier}
              onChange={(e) => onInstantDispatch(troopTypeData.id, 'targetTier', e.target.value)}
            />
          </RowWrapper>
          <RowWrapper>
            <Input
              id={`${troopTypeData.id}-PromotionTroopsPerBatch`}
              placeholder='0'
              label='Troops per batch'
              value={troopTypeData.troopsPerBatch}
              onChange={(e) => onChange(troopTypeData.id, 'troopsPerBatch', e.target.value)}
              onBlur={() => onBlur(troopTypeData.id, 'troopsPerBatch')}
            />
            <Input
              id={`${troopTypeData.id}-availableTroops`}
              placeholder='0'
              label='Available troops'
              value={troopTypeData.availableTroops}
              onChange={(e) => onChange(troopTypeData.id, 'availableTroops' as keyof TroopEntry, e.target.value)}
              onBlur={() => onBlur(troopTypeData.id, 'availableTroops' as keyof TroopEntry)}
            />
          </RowWrapper>
          <TimeSelector
            id={`${troopTypeData.id}-promotionTime`}
            title='Promotion Time'
            showSeconds={true}
            timeValue={troopTypeData.promotionTime}
            field='promotionTime'
            onChange={(field, value, unit) => onChange(troopTypeData.id, field as keyof TroopEntry, value, unit)}
            onBlur={(field, unit) => onBlur(troopTypeData.id, field as keyof TroopEntry, unit)}
          />
        </div>
      }
      {troopTypeData.kind === 'Training' &&
        <div>
          <RowWrapper>
            <Dropdown
              id={`${troopTypeData.id}-trainingTargetTier`}
              label='Target tier'
              options={troopTierOptions}
              value={troopTypeData.targetTier}
              onChange={(e) => onInstantDispatch(troopTypeData.id, 'targetTier', e.target.value)}
            />
            <Input
              id={`${troopTypeData.id}-trainingTroopsPerBatch`}
              placeholder='0'
              label='Troops per batch'
              value={troopTypeData.troopsPerBatch}
              onChange={(e) => onChange(troopTypeData.id, 'troopsPerBatch', e.target.value)}
              onBlur={() => onBlur(troopTypeData.id, 'troopsPerBatch')}
            />
          </RowWrapper>
          <TimeSelector
            id={`${troopTypeData.id}-Training Time`}
            title='Training Time'
            showSeconds={true}
            timeValue={troopTypeData.trainingTime}
            field='trainingTime'
            onChange={(field, value, unit) => onChange(troopTypeData.id, field as keyof TroopEntry, value, unit)}
            onBlur={(field, unit) => onBlur(troopTypeData.id, field as keyof TroopEntry, unit)}
          />
        </div>}



    </ExpandableSection>
  )
}

export default TroopType;

/*


*/