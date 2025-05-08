import { Header, Output, RowWrapper} from '@/components';

type Props = {
  
}

const PreviousEventScore = (props: Props) => {


  return (
    <div className='w-full'>
      <Header title='Previous Event Score'/>
      <RowWrapper>
        <Output label='First' value={0}/>
        <Output label='Tenth' value={0}/>
      </RowWrapper>
    </div>
  )
}

export default PreviousEventScore;