import { useDailyCalculator } from "@/hooks";
import { resetState, updateField, calculateDailyScore } from '@/redux/slices/dayTwo'
import { CalculatorContainer, CalculatorHeader, SubHeader, Input, Output, RowWrapper } from '@/components'

const DayTwoCalc = () => {

  const {
    localState,
    handleLocalChange,
    handleBlur,
    reset,
  } = useDailyCalculator({
    selector: (state) => state.dayTwo,
    updateField: updateField,
    calculateScore: calculateDailyScore,
    resetState: resetState,
  })

  const resetCalculator = () => {

    // include modal toggle here later
    reset()
  }
  return (
    <CalculatorContainer>
      <CalculatorHeader title="Day Two" handleClick={() => resetCalculator()} />
      <div className='flex flex-col md:flex-row'>
        <div className="calculator-input">
          <div>
            <SubHeader title="Medals" />
          </div>

        </div>
        <div className="calculator-output">
          <SubHeader title="Score" />
        </div>
      </div>
    </CalculatorContainer>
  );
}

export default DayTwoCalc;