import { useState } from 'react' 
import { CalculatorContainer } from '@/components'

type Props = {}

const DayOneCalc = (props: Props) => {

 const [state, setState] = useState(null)

  return (
    <CalculatorContainer>
        <div>DayOneCalc</div>
    </CalculatorContainer>
  )
}

export default DayOneCalc;