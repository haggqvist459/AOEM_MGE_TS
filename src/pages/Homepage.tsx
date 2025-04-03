import { useState } from 'react'
import { DayOneCalc, DayThreeCalc, DayTwoCalc, DayFourCalc } from '@/components/calculators';

type Props = {}

const HomePage = (props: Props) => {

  const [state, setState] = useState(null)

  return (
    <div>
      <DayFourCalc />
      <DayThreeCalc />
      <DayTwoCalc />
      <DayOneCalc />
    </div>
  )
}

export default HomePage;