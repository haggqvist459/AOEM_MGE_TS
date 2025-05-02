import { PreviousEventScoreData } from '@/redux'
import { DAY_TITLES, toNumber } from '@/utils'
import { SubHeader, Output, Trashcan, GridWrapper, RowWrapper } from '@/components'

type Props = {
  previousEvent: PreviousEventScoreData
  onDelete: (id: string) => void
}

const PreviousEvent = ({
  previousEvent,
  onDelete
}: Props) => {

  const { id, days, name } = previousEvent;
  const totalScoreFirst = days.reduce((total, day) => total + toNumber(day.score.first), 0)
  const totalScoreTenth = days.reduce((total, day) => total + toNumber(day.score.tenth), 0)

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
        <div>
          <h3 className="text-[17px] font-semibold text-primary">{'Total Score'}</h3>
          <RowWrapper>
            <Output label='First' value={totalScoreFirst} />
            <Output label='Tenth' value={totalScoreTenth} />
          </RowWrapper>
        </div>
        {days.map((dayData, index) => (
          <div key={index}>
            <h3 className="text-[17px] font-semibold text-primary">{DAY_TITLES[dayData.day]}</h3>
            <RowWrapper>
              <Output key={index} label="First" value={toNumber(dayData.score.first)} />
              <Output key={index} label="Tenth" value={toNumber(dayData.score.tenth)} />
            </RowWrapper>
          </div>
        ))}
      </GridWrapper>
    </div>
  )
}

export default PreviousEvent;