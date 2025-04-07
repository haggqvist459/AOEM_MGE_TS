import { useState } from 'react'
import { TroopTypeData, TroopType } from '@/redux'
import { TROOP_TIER_MULTIPLIERS } from '@/utils'
import { ExpandableHeader, ExpandableSection, Input, RowWrapper } from '@/components'
import { Dropdown, mapToDropdownOptions } from '@/components/ui/dropdown'

const dropdownOptions = mapToDropdownOptions(TROOP_TIER_MULTIPLIERS)

type Props = {
  troopType: TroopType
  troopTypeData: TroopTypeData,
  onChange: (troopType: TroopType, field: keyof TroopTypeData, value: string) => void
  onBlur: (troopType: TroopType, field: keyof TroopTypeData) => void
  onInstantDispatch: (troopType: TroopType, field: string, value: string) => void
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
    <div className="pb-1 mb-1 border-b border-neutral-400">
      <ExpandableHeader title={troopType} isExpanded={isExpanded} toggleExpansion={() => setIsExpanded(prev => !prev)} />
      <ExpandableSection isExpanded={isExpanded}>
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
      </ExpandableSection>
    </div>
  )
}

export default Troop;