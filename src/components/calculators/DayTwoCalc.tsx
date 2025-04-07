import { useState } from 'react'
import { useDailyCalculator } from "@/hooks";
import { resetStateDayTwo, updateFieldDayTwo, calculateDailyScoreDayTwo, DayTwoStateData } from '@/redux'
import { toNumber } from '@/utils'
import {
  CalculatorContainer, CalculatorHeader, SubHeader, Input, Output,
  RowWrapper, InfoButton, TimeSelector, Modal
} from '@/components'

// Props needed for day switching later
type Props = {}

const DayTwoCalc = (props: Props) => {

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

  const [showModal, setShowModal] = useState(false)

  const resetCalculator = () => {
    reset()
    setShowModal(false)
  }
  return (
    <CalculatorContainer>
      <CalculatorHeader title="Day Two" handleClick={() => setShowModal(true)} />
      <div className='flex flex-col md:flex-row'>
        <div className="calculator-input">
          <div className="flex space-x-1">
            <SubHeader title="Medals" />
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
            <SubHeader title="Scrolls" />
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
            <SubHeader title="Blueprints" />
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
          <SubHeader title="Forging" />
          <TimeSelector
            title="Time to complete"
            field="forgingTime"
            showSeconds={true}
            timeValue={localState.forgingTime}
            onChange={handleLocalChange}
            onBlur={handleBlur}
          />
          <TimeSelector
            title="Forging speed-up"
            field="forgingSpeedup"
            timeValue={localState.forgingSpeedup}
            onChange={handleLocalChange}
            onBlur={handleBlur}
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
        <div className="calculator-output">
          <SubHeader title="Score" />
          <Output label="Total daily score: " value={localState.totalDailyScore} />
          <RowWrapper>
            <Output label="Forging: " value={localState.score.forging} />
            <Output label="Scrolls: " value={localState.score.scrolls} />
            <Output label="Medals: " value={localState.score.medals} />
          </RowWrapper>
          <SubHeader title='Previous Event Score' />
          <RowWrapper>
            <Output label='First' value={toNumber(localState.previousEvent.first)} />
            <Output label='Tenth' value={toNumber(localState.previousEvent.tenth)} />
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
  );
}

export default DayTwoCalc;