import { useState } from 'react'
import { useDailyCalculator } from '@/hooks'
import { toNumber } from '@/utils'
import { ResetStateDaysix, updateFieldDaySix, calculateDailyScoreDaySix, DaySixStateData } from '@/redux'
import { CalculatorHeader, CalculatorContainer, RowWrapper, SubHeader, InfoButton, Input, Output, Modal } from '@/components'

type Props = {}

const DaySixCalc = (props: Props) => {

  const {
    localState,
    handleLocalChange,
    handleBlur,
    reset,
  } = useDailyCalculator<DaySixStateData>({
    selector: state => state.daySix,
    updateField: updateFieldDaySix,
    calculateScore: (field) => calculateDailyScoreDaySix(field),
    resetState: ResetStateDaysix,
  })

  const [showModal, setShowModal] = useState(false)

  const resetCalculator = () => {
    reset()
    setShowModal(false);
  }

  return (
    <CalculatorContainer>
      <CalculatorHeader title='Day Six' handleClick={() => setShowModal(prev => !prev)} />
      <div className='flex flex-col md:flex-row'>
        <div className='calculator-input'>
          <div className='flex space-x-1'>
            <SubHeader title='Research' />
            <InfoButton message='Input the power gain based on the research you estimate to complete' />
          </div>
          <Input
            id='researchPower'
            placeholder='0'
            value={localState.researchPower}
            onChange={(e) => handleLocalChange('researchPower', e.target.value)}
            onBlur={() => handleBlur('researchPower')}
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
          <SubHeader title="Score" />
          <Output label="Total daily score" value={localState.totalDailyScore} />
          <RowWrapper>
            <Output label="Research" value={localState.score.research} />
            <Output label="Building" value={localState.score.building} />
            <Output label="Troops" value={localState.score.troop} />
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
  )
}

export default DaySixCalc;