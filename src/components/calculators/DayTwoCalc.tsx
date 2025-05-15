import { useState } from 'react'
import { useDailyCalculator, usePreviousEventScores } from "@/hooks";
import { resetStateDayTwo, updateFieldDayTwo, calculateDailyScoreDayTwo, DayTwoStateData } from '@/redux'
import { DAY_KEYS } from '@/utils'
import { DayKey } from '@/types';
import {
  SectionContainer, SectionHeader, Header, Input, Output,
  RowWrapper, InfoButton, TimeSelector, Modal, CalculatorButtons,
  PreviousEventScore
} from '@/components'
import { Dropdown, mapToDropdownOptions } from '@/components/ui/dropdown';


type Props = {
  activeDay: DayKey;
  setActiveDay: React.Dispatch<React.SetStateAction<DayKey>>;
}

const DayTwoCalc = ({ activeDay, setActiveDay }: Props) => {

  const {
    localState,
    handleLocalChange,
    handleBlur,
    reset,
  } = useDailyCalculator<DayTwoStateData>({
    selector: (state) => state.dayTwo,
    updateField: updateFieldDayTwo,
    calculateScore: (field) => calculateDailyScoreDayTwo(field),
    resetState: resetStateDayTwo,
  })

  const {
    eventList,
    selectedEvent,
    setSelectedEvent,
    selectedScore,
  } = usePreviousEventScores(DAY_KEYS.DAY_TWO)

  const [showModal, setShowModal] = useState(false)
  const previousEventDropdownOptions = [
    { label: 'Daily average', value: 'daily-average' },
    ...mapToDropdownOptions(eventList)
  ]
  const resetCalculator = () => {
    reset()
    setShowModal(false)
  }
  return (
    <SectionContainer>
        <SectionHeader title="Day Two" handleClick={() => setShowModal(true)} />
        <div className='flex flex-col md:flex-row'>
          <div className="calculator-input">
            <div className="flex space-x-1">
              <Header title="Medals" />
              <InfoButton message={'As medals are consumed in batches based on individual hero ranks, these scores are rough estimates.'} />
            </div>
            <RowWrapper>
              <Input
                id="legendaryMedals"
                placeholder="0"
                label="Legendary"
                value={localState.legendaryMedals}
                onChange={(e) => handleLocalChange('legendaryMedals', e.target.value)}
                onBlur={() => handleBlur('legendaryMedals')}
              />
              <Input
                id="epicMedals"
                placeholder="0"
                label="Epic"
                value={localState.epicMedals}
                onChange={(e) => handleLocalChange('epicMedals', e.target.value)}
                onBlur={() => handleBlur('epicMedals')}
              />
            </RowWrapper>
            <div className="flex space-x-1">
              <Header title="Scrolls" />
              <InfoButton message={'As scrolls are consumed in batches based on individual skill ranks, these scores are rough estimates.'} />
            </div>
            <RowWrapper>
              <Input
                id="legendaryScrolls"
                placeholder="0"
                label="Legendary"
                value={localState.legendaryScrolls}
                onChange={(e) => handleLocalChange('legendaryScrolls', e.target.value)}
                onBlur={() => handleBlur('legendaryScrolls')}
              />
              <Input
                id="epicScrolls"
                placeholder="0"
                label="Epic"
                value={localState.epicScrolls}
                onChange={(e) => handleLocalChange('epicScrolls', e.target.value)}
                onBlur={() => handleBlur('epicScrolls')}
              />
            </RowWrapper>
            <div className="flex space-x-1">
              <Header title="Blueprints" />
              <InfoButton message={'For pre-forged, input the number of completed but not claimed blueprints before the day starts.'} />
            </div>
            <RowWrapper>
              <Input
                id="legendaryBlueprints"
                placeholder="0"
                label="Legendary"
                value={localState.legendaryBlueprints}
                onChange={(e) => handleLocalChange('legendaryBlueprints', e.target.value)}
                onBlur={() => handleBlur('legendaryBlueprints')}
              />
              <Input
                id="preforgedBlueprints"
                placeholder="0"
                label="Pre-forged"
                value={localState.preforgedBlueprints}
                onChange={(e) => handleLocalChange('preforgedBlueprints', e.target.value)}
                onBlur={() => handleBlur('preforgedBlueprints')}
              />
            </RowWrapper>
            <Header title="Forging" />
            <TimeSelector
              id='forgingTime'
              title="Time to complete"
              field="forgingTime"
              showSeconds={true}
              timeValue={localState.forgingTime}
              onChange={handleLocalChange}
              onBlur={handleBlur}
            />
            <TimeSelector
              id='forgingSpeedup'
              title="Forging speed-up"
              field="forgingSpeedup"
              timeValue={localState.forgingSpeedup}
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
          <div className="calculator-output">
            <Header title="Score" />
            <Output label="Total daily score" value={localState.totalDailyScore} />
            <RowWrapper>
              <Output label="Forging" value={localState.score.forging} />
              <Output label="Scrolls" value={localState.score.scrolls} />
              <Output label="Medals" value={localState.score.medals} />
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
  );
}

export default DayTwoCalc;