import { useState } from 'react'
import { DayOneCalc, DayThreeCalc, DayTwoCalc, DayFourCalc, DayFiveCalc, DaySixCalc, DaySevenCalc } from '@/components/calculators';

type Props = {}

const HomePage = (props: Props) => {

  const [state, setState] = useState(null)

  return (
    <div>
      <DaySevenCalc />
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