import { useState } from 'react'
import { DayData, } from '@/redux'
import { SubHeader, Input, ExpandableSection } from '@/components'

type Props = {
  id: string
  name: string
  days: DayData[]
  onChange: () => void
  onBlur: () => void
}

const PreviousEvent = ({
  id,
  name,
  days,
  onBlur,
  onChange
}: Props) => {

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <ExpandableSection title={name} isExpanded={isExpanded} toggleExpansion={() => setIsExpanded(prev => !prev)}>
      {/* Input for name  */}
      {days.map((day) => (
        <Input
          key={id + day.day}
          id={id + day.day}
          label='Day 1'
          placeholder='0'
          value={day.score}
          onBlur={onBlur}
          onChange={onChange}
        />
      ))}
    </ExpandableSection>
  )
}

export default PreviousEvent;