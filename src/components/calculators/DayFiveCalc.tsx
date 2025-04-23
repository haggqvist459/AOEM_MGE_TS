import { useState } from 'react'
import { useDailyCalculator } from "@/hooks";
import { TROOP_TIER_MULTIPLIERS, toNumber } from '@/utils';
import { TimeData, DayKey } from '@/types';

import {
  updateFieldDayFive, calculateDailyScoreDayFive, resetStateDayFive,
  DayFiveStateData, TroopType, TroopTypeData, useAppDispatch, updateTroopTypeField,
} from '@/redux'
import {
  CalculatorHeader, CalculatorContainer, CalculatorButtons, ExpandableSection,
  Modal, Input, Output, SubHeader, TimeSelector, InfoButton, RowWrapper, Troop,
} from '@/components';
import { Dropdown, mapToDropdownOptions } from '@/components/ui/dropdown'

const trainingDropdownOptions = mapToDropdownOptions(TROOP_TIER_MULTIPLIERS)

type Props = {
  activeDay: DayKey;
  setActiveDay: React.Dispatch<React.SetStateAction<DayKey>>;
}

const DayFiveCalc = ({ activeDay, setActiveDay}: Props) => {

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
    calculateScore: () => calculateDailyScoreDayFive(),
    resetState: resetStateDayFive,
    useInstantDispatch: true,
    exposeSetLocalState: true
  })


  const [showModal, setShowModal] = useState(false)
  const [trainingExpanded, setTrainingExpanded] = useState(false)

  const dispatch = useAppDispatch();

  const resetCalculator = () => {
    reset()
    setShowModal(false);
  }

  const handleTroopLocalChange = (troopType: TroopType, field: keyof TroopTypeData, value: string, unit?: keyof TimeData) => {
    setLocalState?.((prev: typeof localState) => ({
      ...prev,
      troops: {
        ...prev.troops,
        [troopType]: {
          ...prev.troops[troopType],
          [field]: unit
            ? {
              ...(prev.troops[troopType][field] as TimeData),
              [unit]: value,
            }
            : value,
        },
      },
    }))
  }

  const handleTroopBlur = (troopType: TroopType, field: keyof TroopTypeData, unit?: keyof TimeData) => {
    const value = unit
      ? (localState.troops[troopType][field] as TimeData)[unit]
      : localState.troops[troopType][field]


    dispatch(updateTroopTypeField({ troopType, field, value: value as string | TimeData, unit }))
    dispatch(calculateDailyScoreDayFive())
  }

  const handleTroopInstantDispatch = (troopType: TroopType, field: keyof TroopTypeData, value: string) => {
    dispatch(updateTroopTypeField({ troopType, field, value }))
    dispatch(calculateDailyScoreDayFive())
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
          <ExpandableSection title='Training' isExpanded={trainingExpanded}  toggleExpansion={() => setTrainingExpanded(prev => !prev)}>
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
          </ExpandableSection>
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
            <Output label="Promotion" value={localState.score.promotion} />
            <Output label="Training" value={localState.score.training} />
          </RowWrapper>
          <SubHeader title='Troop data' />
          <RowWrapper>
            <Output label='Archer' value={localState.troops['Archers'].troopTotalScore} />
            <Output label='Cavalry' value={localState.troops['Cavalry'].troopTotalScore} />
          </RowWrapper>
          <RowWrapper>
            <Output label='Archer Batches' value={localState.troops['Archers'].maxPromotableBatches} />
            <Output label='Cavalry Batches' value={localState.troops['Cavalry'].maxPromotableBatches} />
          </RowWrapper>
          <RowWrapper>
            <Output label='Pikemen' value={localState.troops['Pikemen'].troopTotalScore} />
            <Output label='Swordsmen' value={localState.troops['Swordsmen'].troopTotalScore} />
          </RowWrapper>
          <RowWrapper>
            <Output label='Pikemen Batches' value={localState.troops['Pikemen'].maxPromotableBatches} />
            <Output label='Swordsmen Batches' value={localState.troops['Swordsmen'].maxPromotableBatches} />
          </RowWrapper>
          <SubHeader title='Previous Event Score' />
          <RowWrapper>
            <Output label='First' value={toNumber(localState.previousEvent.first)} />
            <Output label='Tenth' value={toNumber(localState.previousEvent.tenth)} />
          </RowWrapper>
        </div>
      </div>
      <CalculatorButtons activeDay={activeDay} setActiveDay={setActiveDay} />
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
