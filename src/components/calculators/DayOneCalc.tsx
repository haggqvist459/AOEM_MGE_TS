import { useState } from 'react'
// import { useAppDispatch, useAppSelector } from '@/redux'
// import { resetState, updateField, calculateDailyScore } from '@/redux/slices/dayOne'
import { CalculatorContainer, CalculatorHeader } from '@/components'
type Props = {}

const DayOneCalc = (props: Props) => {

  const [state, setState] = useState(null)
  // const dispatch = useAppDispatch();

  const resetCalculator = () => {

    // include modal toggle here later
    // dispatch(resetState());
  }

  return (
    <CalculatorContainer>
      <CalculatorHeader title='Day One' handleClick={() => resetCalculator()} />
    </CalculatorContainer>
  )
}

export default DayOneCalc;