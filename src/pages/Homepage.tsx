import { useState } from 'react' 
import { DayOneCalc, DayTwoCalc } from '@/components/calculators';

type Props = {}

const HomePage = (props: Props) => {

 const [state, setState] = useState(null)

  return (
    <div>
        <DayTwoCalc />
        <DayOneCalc />
    </div>
  )
}

export default HomePage;