import { useDailyCalculator } from '@/hooks/useDailyCalculator';
import { resetState, updateField, calculateDailyScore } from '@/redux/slices/dayOne'
import { CalculatorContainer, CalculatorHeader, SubHeader, Input, Output, RowWrapper } from '@/components'

// Props needed for day switching later
type Props = {}

const DayOneCalc = (props: Props) => {

  const {
    localState,
    handleLocalChange,
    handleBlur,
    reset,
    handleInstantDispatch,
  } = useDailyCalculator({
    selector: (state) => state.dayOne,
    updateField: updateField,
    calculateScore: calculateDailyScore,
    resetState: resetState,
    useInstantDispatch: true
  });



  const resetCalculator = () => {

    // include modal toggle here later
    reset()
  }

  return (
    <CalculatorContainer>
      <CalculatorHeader title='Day One' handleClick={() => resetCalculator()} />
      <div className='flex flex-col md:flex-row'>
        <div className='calculator-input'>
          <SubHeader title='Tribe Hunting' />
          <Input
            id='stamina'
            placeholder='Include all daily boosts'
            label='Stamina:'
            value={localState.stamina}
            onChange={(e) => handleLocalChange('stamina', e.target.value)}
            onBlur={() => handleBlur('stamina')}
          />

          <SubHeader title='Previous Event Score' />
          <RowWrapper>
            <Input
              id='previous.first'
              label='First'
              placeholder='0'
              value={localState.previousEvent.first}
              onChange={(e) => handleLocalChange('previousEvent', e.target.value, 'first')}
              onBlur={() => handleBlur('previousEvent', 'first')}
            />
            <Input
              id='previous.tenth'
              label='Tenth'
              placeholder='0'
              value={localState.previousEvent.tenth}
              onChange={(e) => handleLocalChange('previousEvent', e.target.value, 'tenth')}
              onBlur={() => handleBlur('previousEvent', 'tenth')}
            />
          </RowWrapper>
        </div>
        <div className='calculator-output'>
          <SubHeader title='Score' />
          <Output label='Test' value={localState.stamina} />
          <RowWrapper>
            <Output label='First' value={localState.previousEvent.first} />
            <Output label='Tenth' value={localState.previousEvent.tenth} />
          </RowWrapper>
        </div>
      </div>
    </CalculatorContainer>
  )
}

export default DayOneCalc;