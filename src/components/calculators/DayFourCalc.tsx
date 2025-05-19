import { useState } from 'react'
import { calculateDailyScoreDayFour, updateFieldDayFour, resetStateDayFour, DayFourStateData } from "@/redux";
import { useDailyCalculator, usePreviousEventScores } from '@/hooks';
import { DAY_KEYS } from '@/utils';
import { DayKey } from '@/types';
import { SectionContainer, SectionHeader, CalculatorButtons, Header, RowWrapper, Input, Output, Modal, InfoButton, TimeSelector, PreviousEventScore } from "@/components";
import { Dropdown, mapToDropdownOptions } from '@/components/ui/dropdown';

type Props = {
  activeDay: DayKey;
  setActiveDay: React.Dispatch<React.SetStateAction<DayKey>>;
}


const DayFourCalc = ({ activeDay, setActiveDay }: Props) => {

  const {
    localState,
    handleLocalChange,
    handleBlur,
    reset,
  } = useDailyCalculator<DayFourStateData>({
    selector: state => state.dayFour,
    updateField: updateFieldDayFour,
    calculateScore: (field) => calculateDailyScoreDayFour(field),
    resetState: resetStateDayFour,
  })

  const {
    eventList,
    selectedEvent,
    setSelectedEvent,
    selectedScore,
  } = usePreviousEventScores(activeDay)

  const previousEventDropdownOptions = [
    { label: 'Daily average', value: 'daily-average' },
    ...mapToDropdownOptions(eventList)
  ]

  const [showModal, setShowModal] = useState(false)


  const resetCalculator = () => {
    reset()
    setShowModal(false);
  }


  return (
    <SectionContainer>
        <SectionHeader title="Day Four" handleClick={() => setShowModal(true)} />
        <div className='flex flex-col md:flex-row'>
          <div className='calculator-input'>
            <div className='flex space-x-1'>
              <Header title='Ring upgrades' />
              <InfoButton message='Ring materials are consumed in batches based on individual ring levels. These scores are rough estimates' />
            </div>
            <RowWrapper>
              <Input
                id='hammers'
                label='Hammers'
                placeholder='0'
                value={localState.hammers}
                onChange={(e) => handleLocalChange('hammers', e.target.value)}
                onBlur={() => handleBlur('hammers')}
              />
              <Input
                id='fineGold'
                label='Fine gold'
                placeholder='0'
                value={localState.fineGold}
                onChange={(e) => handleLocalChange('fineGold', e.target.value)}
                onBlur={() => handleBlur('fineGold')}
              />
            </RowWrapper>
            <RowWrapper>
              <Input
                id='silverSand'
                label='Silver sand'
                placeholder='0'
                value={localState.silverSand}
                onChange={(e) => handleLocalChange('silverSand', e.target.value)}
                onBlur={() => handleBlur('silverSand')}
              />
              <Input
                id='copperSand'
                label='Copper sand'
                placeholder='0'
                value={localState.copperSand}
                onChange={(e) => handleLocalChange('copperSand', e.target.value)}
                onBlur={() => handleBlur('copperSand')}
              />
            </RowWrapper>
            <Header title='Speed-ups' />
            <TimeSelector
              id='universalSpeedup'
              title='Universal'
              timeValue={localState.universalSpeedup}
              field='universalSpeedup'
              onChange={handleLocalChange}
              onBlur={handleBlur}
            />
            <TimeSelector
              id='buildingSpeedup'
              title='Building'
              timeValue={localState.buildingSpeedup}
              field='buildingSpeedup'
              onChange={handleLocalChange}
              onBlur={handleBlur}
            />
            <TimeSelector
              id='researchSpeedup'
              title='Research'
              timeValue={localState.researchSpeedup}
              field='researchSpeedup'
              onChange={handleLocalChange}
              onBlur={handleBlur}
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
            <Header title="Score" />
            <RowWrapper>
              <Output label="Total daily score" value={localState.totalDailyScore} />
              <Output label='Ring upgrades' value={localState.score.rings} />
            </RowWrapper>
            <Header title='Speed-up score' />
            <RowWrapper>
              <Output label='Universal' value={localState.score.universal} />
              <Output label='Building' value={localState.score.building} />
              <Output label='Research' value={localState.score.research} />
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

export default DayFourCalc;