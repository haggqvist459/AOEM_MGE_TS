import { useState } from 'react'
import { DayOneCalc, DayThreeCalc, DayTwoCalc, DayFourCalc, DayFiveCalc, DaySixCalc } from '@/components/calculators';

type Props = {}

const HomePage = (props: Props) => {

  const [state, setState] = useState(null)

  return (
    <div>
      <DaySixCalc />
      <DayFiveCalc />
      <DayFourCalc />
      <DayThreeCalc />
      <DayTwoCalc />
      <DayOneCalc />
    </div>
  )
}

export default HomePage;