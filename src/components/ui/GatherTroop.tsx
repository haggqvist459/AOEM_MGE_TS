import { useState } from "react"
import { Input, ExpandableHeader, ExpandableSection, ToggleButton } from '@/components'
import { Trashcan } from '@/components/icons'
import { GatherTroopData } from '@/redux'

type Props = {
  troopData: GatherTroopData,
  onBlur: (id: string, field: string) => void
  onChange: (id: string, field: string, value: string) => void
  onDelete: (id: string) => void
  onInstantDispatch: (id: string, field: string, value: boolean) => void
}

const GatherTroop = ({
  troopData,
  onBlur,
  onChange,
  onDelete,
  onInstantDispatch
}: Props) => {

  const [isExpanded, setIsExpanded] = useState(false);

  return (
      <ExpandableSection title={troopData.name} isExpanded={isExpanded} toggleExpansion={() => setIsExpanded(prev => !prev)} >
        <Input
          id={`${troopData.id}-name`}
          placeholder="Harald III"
          inputType="text"
          label="Change name"
          value={troopData.name}
          onChange={(e) => onChange(troopData.id, 'name', e.target.value)}
          onBlur={() => onBlur(troopData.id, 'name')}
        />
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-1">
          <Input
            id={`${troopData.id}-loadBonus`}
            label="Load bonus"
            placeholder="0"
            infoMessage="Add all skill and talent based load bonuses from each hero together"
            allowDecimals={true}
            value={troopData.loadBonus}
            onChange={(e) => onChange(troopData.id, 'loadBonus', e.target.value)}
            onBlur={() => onBlur(troopData.id, 'loadBonus')}
          />
          <Input
            id={`${troopData.id}-loadCapacity`}
            label="Load capacity"
            placeholder="0"
            value={troopData.loadCapacity}
            onChange={(e) => onChange(troopData.id, 'loadCapacity', e.target.value)}
            onBlur={() => onBlur(troopData.id, 'loadCapacity')}
          />
          <Input
            id={`${troopData.id}-completedTurns`}
            label="Completed turns"
            placeholder="0"
            value={troopData.completedTurns}
            onChange={(e) => onChange(troopData.id, 'completedTurns', e.target.value)}
            onBlur={() => onBlur(troopData.id, 'completedTurns')}
          />
          <div className="flex justify-between">
            <div className="flex flex-col justify-between">
              <span className="input-label ">Full at day start</span>
              <ToggleButton isToggled={troopData.fullAtReset} onToggle={() => onInstantDispatch(troopData.id, 'fullAtReset', !troopData.fullAtReset)} />
            </div>
            <button className="self-end mb-0.5" onClick={() => onDelete(troopData.id)}>
              <Trashcan />
            </button>
          </div>
        </div>
      </ExpandableSection>
  )
}

export default GatherTroop;