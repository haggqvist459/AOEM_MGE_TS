import { useState } from 'react'
import { useDailyCalculator } from '@/hooks'
import { toNumber, TROOP_POWER_MULTIPLIER } from '@/utils'
import { ResetStateDaysix, updateFieldDaySix, calculateDailyScoreDaySix, DaySixStateData } from '@/redux'
import { DayKey } from '@/types'
import { CalculatorHeader, CalculatorContainer, CalculatorButtons, RowWrapper, Header, InfoButton, Input, Output, Modal } from '@/components'
import { Dropdown, mapToDropdownOptions } from '@/components/ui/dropdown'

const dropdownOptions = mapToDropdownOptions(TROOP_POWER_MULTIPLIER)

type Props = {
  activeDay: DayKey;
  setActiveDay: React.Dispatch<React.SetStateAction<DayKey>>;
}

const DaySixCalc = ({ activeDay, setActiveDay}: Props) => {

  const {
    localState,
    handleLocalChange,
    handleBlur,
    reset,
    handleInstantDispatch
  } = useDailyCalculator<DaySixStateData>({
    selector: state => state.daySix,
    updateField: updateFieldDaySix,
    calculateScore: (field) => calculateDailyScoreDaySix(field),
    resetState: ResetStateDaysix,
    useInstantDispatch: true
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
            <Header title='Research' />
            <InfoButton message='Input the power gain based on the research you estimate to complete' />
          </div>
          <Input
            id='researchPower'
            placeholder='0'
            value={localState.researchPower}
            onChange={(e) => handleLocalChange('researchPower', e.target.value)}
            onBlur={() => handleBlur('researchPower')}
          />
          <div className='flex space-x-1'>
            <Header title='Building' />
            <InfoButton message='Input the power gains from the buildings you estimate to complete' />
          </div>
          <RowWrapper>
            <Input
              id='firstQueue'
              placeholder='0'
              value={localState.buildingPower.firstQueue}
              onChange={(e) => handleLocalChange('buildingPower', e.target.value, 'firstQueue')}
              onBlur={() => handleBlur('buildingPower', 'firstQueue')}
            />
            <Input
              id='secondQueue'
              placeholder='0'
              value={localState.buildingPower.secondQueue}
              onChange={(e) => handleLocalChange('buildingPower', e.target.value, 'secondQueue')}
              onBlur={() => handleBlur('buildingPower', 'secondQueue')}
            />
            <Input
              id='thirdQueue'
              placeholder='0'
              value={localState.buildingPower.thirdQueue}
              onChange={(e) => handleLocalChange('buildingPower', e.target.value, 'thirdQueue')}
              onBlur={() => handleBlur('buildingPower', 'thirdQueue')}
            />
          </RowWrapper>
          <div className='flex space-x-1'>
            <Header title='Troops' />
            <InfoButton message='Add the total number of troops together from all training queues' />
          </div>
          <RowWrapper>
            <Input
              id='troopsTotal'
              label='Expected total'
              placeholder='0'
              value={localState.troopsTotal}
              onChange={(e) => handleLocalChange('troopsTotal', e.target.value)}
              onBlur={() => handleBlur('troopsTotal')}
            />
            <Dropdown 
              label='Target tier'
              id='troopTier'
              options={dropdownOptions}
              value={localState.troopTier}
              onChange={(e) => handleInstantDispatch('troopTier', e.target.value)}
            />
          </RowWrapper>
          <Header title='Previous Event Score' />
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
          <Header title="Score" />
          <Output label="Total daily score" value={localState.totalDailyScore} />
          <RowWrapper>
            <Output label="Research" value={localState.score.research} />
            <Output label="Building" value={localState.score.building} />
            <Output label="Troops" value={localState.score.troop} />
          </RowWrapper>
          <Header title='Previous Event Score' />
          <RowWrapper>
            <Output label='First' value={toNumber(localState.previousEvent.first)} />
            <Output label='Tenth' value={toNumber(localState.previousEvent.tenth)} />
          </RowWrapper>
        </div>
      </div>
      <CalculatorButtons activeDay={activeDay} setActiveDay={setActiveDay}/>
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