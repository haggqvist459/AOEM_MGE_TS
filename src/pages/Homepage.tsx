import { useState } from 'react' 
import { DayOneCalc, DayThreeCalc, DayTwoCalc } from '@/components/calculators';

type Props = {}

const HomePage = (props: Props) => {

 const [state, setState] = useState(null)

  return (
    <div>
        <DayThreeCalc />
        <DayTwoCalc />
        <DayOneCalc />
    </div>
  )
}

export default HomePage;