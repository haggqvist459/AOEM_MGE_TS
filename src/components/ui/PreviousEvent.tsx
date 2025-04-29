import { PreviousEventScoreData } from '@/redux'
import { DAY_TITLES, toNumber } from '@/utils'
import { SubHeader, Output, Trashcan, GridWrapper } from '@/components'

type Props = {
  previousEvent: PreviousEventScoreData
  onDelete: (id: string) => void
}

const PreviousEvent = ({
  previousEvent,
  onDelete
}: Props) => {

  const { id, days, name } = previousEvent;
  const totalScore = days.reduce((total, day) => total + toNumber(day.score), 0)

  return (
    <div className='w-full'>
      <div className='w-full flex justify-between'>
        <SubHeader title={name} />
        <button onClick={() => onDelete(id)}>
          <Trashcan />
        </button>
      </div>

      {/* Input for name  */}
      <GridWrapper>
        {days.map((dayData, index) => (
          <Output key={index} label={DAY_TITLES[dayData.day]} value={toNumber(dayData.score)} />
        ))}
        <Output label='Total score' value={totalScore} />
      </GridWrapper>
    </div>
  )
}

export default PreviousEvent;