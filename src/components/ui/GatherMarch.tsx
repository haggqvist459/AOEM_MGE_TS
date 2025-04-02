import { useState } from "react"
import { SubHeader, Input, InfoButton, ExpandableHeader, ExpandableSection } from '@/components'
import { Trashcan } from '@/components/icons'
import { GatherMarchData } from '@/redux'

type Props = {
  marchData: GatherMarchData,
  onBlur: (id: string, field: string) => void
  onChange: (id: string, field: string, value: string) => void
  onDelete: (id: string) => void
  onInstantDispatch: (id: string, field: string, value: boolean) => void
}

const GatherMarch = ({
  marchData,
  onBlur,
  onChange,
  onDelete,
  onInstantDispatch
}: Props) => {

  const [isExpanded, setIsExpanded] = useState(false);
  // const [pendingName, setPendingName] = useState(marchData.name);

  return (
    <div className="pb-1 mb-1 border-b border-neutral-400">
      <ExpandableHeader title={marchData.name} isExpanded={isExpanded} toggleExpansion={() => setIsExpanded(prev => !prev)} />
      <ExpandableSection isExpanded={isExpanded}>
        <Input
          id="name"
          placeholder="Harald III"
          inputType="text"
          label="Change name"
          value={marchData.name}
          onChange={(e) => onChange(marchData.id, 'name', e.target.value)}
          onBlur={() => onBlur(marchData.id, 'name')}
        />
      </ExpandableSection>
    </div>
  )
}

export default GatherMarch;