import { useState } from 'react' 
import { DayOneCalc } from '@/components/calculators';

type Props = {}

const HomePage = (props: Props) => {

 const [state, setState] = useState(null)

  return (
    <div>
        <DayOneCalc />
    </div>
  )
}

export default HomePage;