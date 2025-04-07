import { useState } from 'react'
import { useDailyCalculator } from "@/hooks";
import { TROOP_TIER_MULTIPLIERS, toNumber } from '@/utils';
import {
  updateFieldDayFive, calculateDailyScoreDayFive, resetStateDayFive,
  DayFiveStateData, TroopType, TroopTypeData, useAppDispatch, updateTroopTypeField
} from '@/redux'
import {
  CalculatorHeader, CalculatorContainer, ExpandableHeader, ExpandableSection,
  Modal, Input, Output, SubHeader, TimeSelector, InfoButton, RowWrapper, Troop,
} from '@/components';
import { Dropdown, mapToDropdownOptions } from '@/components/ui/dropdown'

const trainingDropdownOptions = mapToDropdownOptions(TROOP_TIER_MULTIPLIERS)

type Props = {}

const DayFiveCalc = (props: Props) => {

  const {
    localState,
    handleLocalChange,
    handleBlur,
    reset,
    handleInstantDispatch,
    setLocalState
  } = useDailyCalculator<DayFiveStateData>({
    selector: state => state.dayFive,
    updateField: updateFieldDayFive,
    calculateScore: (field) => calculateDailyScoreDayFive(field),
    resetState: resetStateDayFive,
    useInstantDispatch: true,
    exposeSetLocalState: true
  })


  const [showModal, setShowModal] = useState(false)
  const dispatch = useAppDispatch();

  const resetCalculator = () => {
    reset()
    setShowModal(false);
  }

  const handleTroopLocalChange = (troopType: TroopType, field: string, value: string) => {
    setLocalState?.((prev: typeof localState) => ({
      ...prev,
      troops: {
        ...prev.troops,
        [troopType]: {
          ...prev.troops[troopType],
          [field]: value,
        }
      }
    }))
  }

  const handleTroopBlur = (troopType: TroopType, field: keyof TroopTypeData,) => {
    const value = localState.troops[troopType][field as keyof TroopTypeData]
    dispatch(updateTroopTypeField({troopType, field, value }))
    dispatch(calculateDailyScoreDayFive(troopType))
  }

  const handleTroopInstantDispatch = (troopType: TroopType, field: keyof TroopTypeData, value: string) => {
    dispatch(updateTroopTypeField({troopType, field, value }))
    dispatch(calculateDailyScoreDayFive(troopType))
  }


  return (
    <CalculatorContainer>
      <CalculatorHeader title='Day Five' handleClick={() => setShowModal(true)} />
      <div className='flex flex-col md:flex-row'>
        <div className='calculator-input'>
          <SubHeader title='Speed-up' />
          <TimeSelector
            timeValue={localState.initialTrainingSpeedup}
            title='Training'
            field='initialTrainingSpeedup'
            onChange={handleLocalChange}
            onBlur={handleBlur}
          />
          <div className='flex space-x-1'>
            <SubHeader title='Promotion' />
            <InfoButton message='Input numbers from your Stable, Archery Range etc. Speed-ups will be evenly split. Troop types with empty fields will be ignored, and leftover speed-ups will be allocated for training' />
          </div>
          {(Object.entries(localState.troops) as [TroopType, TroopTypeData][]).map(([troopType, troopData]) => (
            <Troop
              key={troopType}
              troopType={troopType}
              troopTypeData={troopData}
              onChange={handleTroopLocalChange}
              onBlur={handleTroopBlur}
              onInstantDispatch={handleTroopInstantDispatch}
            />
          ))}
          <SubHeader title='Training' />
          <RowWrapper>
            <Dropdown
              id='troopTraining'
              label='Target tier'
              value={localState.trainedTroopTier}
              options={trainingDropdownOptions}
              onChange={(e) => handleInstantDispatch('trainedTroopTier', e.target.value)}
            />
            <Input
              id='trainedTroopsPerBatch'
              placeholder='0'
              label='Troops per batch'
              value={localState.trainedTroopsPerBatch}
              onChange={(e) => handleLocalChange('trainedTroopsPerBatch', e.target.value)}
              onBlur={() => handleBlur('trainedTroopsPerBatch')}
            />
          </RowWrapper>
          <TimeSelector
            title='Training time'
            timeValue={localState.trainedTroopsTrainingTime}
            field='trainedTroopsTrainingTime'
            onChange={handleLocalChange}
            onBlur={handleBlur}
            showSeconds={true}
          />
        </div>
        <div className='calculator-output'>

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

export default DayFiveCalc;
