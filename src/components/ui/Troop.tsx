import { useState } from 'react'
import { TroopTypeData, TroopType } from '@/redux'
import { TROOP_TIER_MULTIPLIERS } from '@/utils'
import { TimeData } from '@/types'
import { ExpandableSection, RowWrapper, Input, TimeSelector } from '@/components'
import { Dropdown, mapToDropdownOptions } from '@/components/ui/dropdown'

const dropdownOptions = mapToDropdownOptions(TROOP_TIER_MULTIPLIERS)

type Props = {
  troopType: TroopType
  troopTypeData: TroopTypeData,
  onChange: (troopType: TroopType, field: keyof TroopTypeData, value: string, unit?: keyof TimeData | undefined) => void
  onBlur: (troopType: TroopType, field: keyof TroopTypeData, unit?: keyof TimeData | undefined) => void
  onInstantDispatch: (troopType: TroopType, field: keyof TroopTypeData, value: string) => void
}
const Troop = ({
  troopType,
  troopTypeData,
  onBlur,
  onChange,
  onInstantDispatch
}: Props) => {

  const [isExpanded, setIsExpanded] = useState(false);

  return (
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
          title='Promotion time'
          timeValue={troopTypeData.promotionTime}
          field='promotionTime'
          onChange={(field, value, unit) => onChange(troopType, field as keyof TroopTypeData, value, unit)}
          onBlur={(field, unit) => onBlur(troopType, field as keyof TroopTypeData, unit)}
          showSeconds={true}
        />
      </ExpandableSection>
  )
}

export default Troop;