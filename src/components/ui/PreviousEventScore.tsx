import { Header, Output, RowWrapper} from '@/components';
import { PreviousEventNumericData } from '@/redux'
type Props = {
  score: PreviousEventNumericData
}

const PreviousEventScore = ({
  score
}: Props) => {


  return (
    <div className='w-full'>
      <Header title='Previous Event Score'/>
      <RowWrapper>
        <Output label='First' value={score.first}/>
        <Output label='Tenth' value={score.tenth}/>
      </RowWrapper>
    </div>
  )
}

export default PreviousEventScore;