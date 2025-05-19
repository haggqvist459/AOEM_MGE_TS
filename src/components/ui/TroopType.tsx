import { useState } from 'react'
import { TroopEntry, TroopTypeLabel, TROOP_TYPE_LABELS } from '@/redux'
import { TROOP_TIER_MULTIPLIERS } from '@/utils'
import { TimeData } from '@/types'
import { ExpandableSection, RowWrapper, Input, TimeSelector } from '@/components'
import { Dropdown, mapToDropdownOptions } from '@/components/ui/dropdown'



type Props = {
  troopTypeData: TroopEntry,
  onChange: (troopType: TroopTypeLabel, field: keyof TroopEntry, value: string, unit?: keyof TimeData | undefined) => void
  onBlur: (troopType: TroopTypeLabel, field: keyof TroopEntry, unit?: keyof TimeData | undefined) => void
  onInstantDispatch: (troopType: TroopTypeLabel, field: keyof TroopEntry, value: string) => void
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
    <ExpandableSection title={troopTypeData.type} isExpanded={isExpanded} toggleExpansion={() => setIsExpanded(prev => !prev)} >
      <RowWrapper>
        <Dropdown
          id={`${troopTypeData.id}-troopKindDropdown`}
          label='Action'
          options={troopKindOptions}
          value={troopTypeData.kind}
          onChange={() => { }}
        />
        <Dropdown
          id={`${troopTypeData.id}-troopTypeDropdown`}
          label='Troop type'
          options={troopTypeOptions}
          value={troopTypeData.type}
          onChange={() => { }}
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
              onChange={() => { }}
            />
            <Dropdown
              id={`${troopTypeData.id}-promotionTargetTier`}
              label='Target tier'
              options={troopTierOptions}
              value={troopTypeData.targetTier}
              onChange={() => { }}
            />
          </RowWrapper>
          <RowWrapper>
            <Input
              id={`${troopTypeData.id}-troopsPerBatch`}
              placeholder='0'
              label='Troops per batch'
              value={troopTypeData.troopsPerBatch}
              onChange={() => { }}
              onBlur={() => { }}
            />
            <Input
              id={`${troopTypeData.id}-availableTroops`}
              placeholder='0'
              label='Available troops'
              value={troopTypeData.availableTroops}
              onChange={() => { }}
              onBlur={() => { }}
            />
          </RowWrapper>
          <TimeSelector 
            id={`${troopTypeData.id}-promotionTime`}
            title='Promotion Time'
            showSeconds={true}
            timeValue={troopTypeData.promotionTime}
            field='promotionTime'
            onChange={() => {}}
            onBlur={() => {}}
          />
        </div>}
      {troopTypeData.kind === 'Training' &&
        <div>
          {/* targetTier */}
          {/* troopsPerBatch */}

          {/* trainingTime */}
        </div>}



    </ExpandableSection>
  )
}

export default TroopType;

/*
      <ExpandableSection title={troopType} isExpanded={isExpanded} toggleExpansion={() => setIsExpanded(prev => !prev)} >
        <RowWrapper>
          <Dropdown
            id={`${troopType}-baseTier`}
            label='Base tier'
            value={troopTypeData.baseTier}
            options={dropdownOptions}
            onChange={(e) => onInstantDispatch(troopType, 'baseTier', e.target.value)}
          />
          <Dropdown
            id={`${troopType}-targetTier`}
            label='Target tier'
            value={troopTypeData.targetTier}
            options={dropdownOptions}
            onChange={(e) => onInstantDispatch(troopType, 'targetTier', e.target.value)}
          />
        </RowWrapper>
        <RowWrapper>
          <Input
            id={`${troopType}-troopsPerBatch`}
            label='Troops per batch'
            placeholder='0'
            value={troopTypeData.troopsPerBatch}
            onChange={(e) => onChange(troopType, 'troopsPerBatch', e.target.value)}
            onBlur={() => onBlur(troopType, 'troopsPerBatch')}
          />
          <Input
            id={`${troopType}-availableTroops`}
            label='Available troops'
            placeholder='0'
            value={troopTypeData.availableTroops}
            onChange={(e) => onChange(troopType, 'availableTroops', e.target.value)}
            onBlur={() => onBlur(troopType, 'availableTroops')}
          />
        </RowWrapper>
        <TimeSelector
          id={`${troopType}-promotionTime`}
          title='Promotion time'
          timeValue={troopTypeData.promotionTime}
          field='promotionTime'
          onChange={(field, value, unit) => onChange(troopType, field as keyof TroopTypeData, value, unit)}
          onBlur={(field, unit) => onBlur(troopType, field as keyof TroopTypeData, unit)}
          showSeconds={true}
        />
      </ExpandableSection>

*/