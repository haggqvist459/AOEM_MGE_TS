import { useState } from 'react'
import { useDailyCalculator, usePreviousEventScores } from '@/hooks';
import { resetStateDayOne, updateFieldDayOne, calculateDailyScoreDayOne, DayOneStateData } from '@/redux'
import { DAY_KEYS, TRIBE_LEVEL_MULTIPLIERS } from '@/utils';
import { DayKey } from '@/types';
import { SectionContainer, SectionHeader, Header, Input, Output, RowWrapper, Modal, CalculatorButtons, PreviousEventScore } from '@/components'
import { Dropdown, mapToDropdownOptions } from '@/components/ui/dropdown';

type Props = {
  activeDay: DayKey;
  setActiveDay: React.Dispatch<React.SetStateAction<DayKey>>;
}

const DayOneCalc = ({ activeDay, setActiveDay }: Props) => {

  const {
    localState,
    handleLocalChange,
    handleBlur,
    reset,
    handleInstantDispatch,
  } = useDailyCalculator<DayOneStateData>({
    selector: (state) => state.dayOne,
    updateField: updateFieldDayOne,
    calculateScore: () => calculateDailyScoreDayOne(),
    resetState: resetStateDayOne,
    useInstantDispatch: true
  });

  const {
    eventList,
    selectedEvent,
    setSelectedEvent,
    selectedScore,
  } = usePreviousEventScores(DAY_KEYS.DAY_ONE)

  const tribeDropdownOptions = mapToDropdownOptions(TRIBE_LEVEL_MULTIPLIERS)
  const previousEventDropdownOptions = [
    { label: 'Daily average', value: 'daily-average' },
    ...mapToDropdownOptions(eventList)
  ]

  const [showModal, setShowModal] = useState(false)

  const resetCalculator = () => {
    reset()
    setShowModal(false)
  }

  return (
    <SectionContainer>
        <SectionHeader title='Day One' handleClick={() => setShowModal(true)} />
        <div className='flex flex-col md:flex-row'>
          <div className='calculator-input'>
            <Header title='Tribe Hunting' />
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
              options={tribeDropdownOptions}
              value={localState.tribeLevelMultiplier}
              onChange={(e) => handleInstantDispatch?.('tribeLevelMultiplier', e.target.value)}
            />
            <Dropdown
              id='previousEventDropdown'
              label='Previous event score'
              value={selectedEvent}
              options={previousEventDropdownOptions}
              onChange={(e) => setSelectedEvent(e.target.value)}
            />
          </div>
          <div className='calculator-output'>
            <Header title='Score' />
            <RowWrapper>
              <Output label='Daily score' value={localState.totalDailyScore} />
              <Output label='Tribes hunted' value={localState.tribesHunted} />
            </RowWrapper>
            <PreviousEventScore score={selectedScore} />
          </div>
        </div>
        <CalculatorButtons activeDay={activeDay} setActiveDay={setActiveDay} />
        <Modal
          isOpen={showModal}
          title="Reset Calculator"
          description="Reset all values back to 0? This action can not be undone."
          onCancel={() => setShowModal(false)}
          onConfirm={resetCalculator} />
    </SectionContainer>
  )
}

export default DayOneCalc;