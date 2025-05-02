import { PreviousEventScoreData } from '@/redux'
import { DAY_TITLES, toNumber } from '@/utils'
import { Header, Output, Trashcan, GridWrapper, RowWrapper } from '@/components'

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
        <Header title={name} />
        <button onClick={() => onDelete(id)}>
          <Trashcan />
        </button>
      </div>
      <GridWrapper>
        <div className='border-b border-secondary md:border-r'>
          <Header title='Total Score' headerType='sub-header'/>
          <RowWrapper>
            <Output label='First' value={totalScoreFirst} />
            <Output label='Tenth' value={totalScoreTenth} />
          </RowWrapper>
        </div>
        {days.map((dayData, index) => (
          <div key={index}
            className={`border-secondary border-b 
              ${index % 2 === 0 ? 'md:border-l' : 'md:border-r'}`}>
            <Header title={DAY_TITLES[dayData.day]} headerType='sub-header'/>
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

/*
${index < days.length - 1 ? 'border-b' : ''} 
              ${index < days.length - 2 ? 'md:border-b' : ''} 
              ${index > days.length - 3 ? 'md:border-b-0' : ''} 

*/