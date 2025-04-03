import { useState } from 'react'
import { useDailyCalculator } from '@/hooks/useDailyCalculator';
import { resetStateDayOne, updateFieldDayOne, calculateDailyScoreDayOne } from '@/redux'
import { TRIBE_LEVEL_MULTIPLIERS } from '@/utils';
import { CalculatorContainer, CalculatorHeader, SubHeader, Input, Output, RowWrapper, Modal } from '@/components'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown';

const dropdownOptions: DropdownOption[] = Object.entries(TRIBE_LEVEL_MULTIPLIERS).map(
  ([key, value]) => ({
    label: key,
    value
  })
)

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
    updateField: updateFieldDayOne,
    calculateScore: () => calculateDailyScoreDayOne(),
    resetState: resetStateDayOne,
    useInstantDispatch: true
  });

  const [showModal, setShowModal] = useState(false)

  const resetCalculator = () => {
    reset()
    setShowModal(false)
  }
  
  return (
    <CalculatorContainer>
      <CalculatorHeader title='Day One' handleClick={() => setShowModal(true)} />
      <div className='flex flex-col md:flex-row'>
        <div className='calculator-input'>
          <div className='mb-2'>
            <SubHeader title='Tribe Hunting' />
            <Input
              id='stamina'
              placeholder='Include all daily boosts'
              label='Stamina:'
              value={localState.stamina}
              onChange={(e) => handleLocalChange('stamina', e.target.value)}
              onBlur={() => handleBlur('stamina')}
            />
            <Dropdown
              id='tribeLevelMultiplier'
              label='Select tribe level:'
              options={dropdownOptions}
              value={localState.tribeLevelMultiplier}
              onChange={(e) => handleInstantDispatch?.('tribeLevelMultiplier', e.target.value)}
            />
          </div>
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
          <RowWrapper>
            <Output label='Daily score:' value={localState.score.tribe} />
            <Output label='Tribes hunted:' value={localState.tribesHunted} />
          </RowWrapper>
          <SubHeader title='Previous Event Score' />
          <RowWrapper>
            <Output label='First' value={localState.previousEvent.first} />
            <Output label='Tenth' value={localState.previousEvent.tenth} />
          </RowWrapper>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        title="Reset Calculator"
        description="Reset all values back to 0? This action can not be undone."
        onCancel={() => setShowModal(false)}
        onConfirm={resetCalculator} />
    </CalculatorContainer>
  )
}

export default DayOneCalc;