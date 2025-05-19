import { useState } from 'react'
import { useDailyCalculator, usePreviousEventScores } from "@/hooks";
import { TROOP_TIER_MULTIPLIERS, DAY_KEYS } from '@/utils';
import { TimeData, DayKey } from '@/types';
import {
  updateFieldDayFive, calculateDailyScoreDayFive, resetStateDayFive,
  DayFiveStateData, useAppDispatch, updateTroopTypeField,
  TroopEntry, addTroopType, removeTroopType
} from '@/redux'
import {
  SectionHeader, SectionContainer, CalculatorButtons, ExpandableSection,
  Modal, Input, Output, Header, TimeSelector, InfoButton, RowWrapper, TroopType, PreviousEventScore, ToggleButton
} from '@/components';
import { Dropdown, mapToDropdownOptions } from '@/components/ui/dropdown'



type Props = {
  activeDay: DayKey;
  setActiveDay: React.Dispatch<React.SetStateAction<DayKey>>;
}

const DayFiveCalc = ({ activeDay, setActiveDay }: Props) => {

  const {
    localState,
    handleLocalChange,
    handleBlur,
    reset,
    handleInstantDispatch,
    setLocalState
  } = useDailyCalculator<DayFiveStateData>({
    selector: state => state[activeDay],
    updateField: updateFieldDayFive,
    calculateScore: () => calculateDailyScoreDayFive(),
    resetState: resetStateDayFive,
    useInstantDispatch: true,
    exposeSetLocalState: true
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

  const handleAddTroopType = () => {
    if (localState.troops.length >= 8) return;

    console.log("handleAddTroopType, dispatching")
    dispatch(addTroopType())
  }

  const handleRemoveTroopType = (id: string) => {
    dispatch(removeTroopType(id))
  }


  const dispatch = useAppDispatch();

  const resetCalculator = () => {
    reset()
    setShowModal(false);
  }

  const handleTroopLocalChange = (troopType: TroopTypeLabel, field: keyof TroopTypeData, value: string, unit?: keyof TimeData) => {
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
    <SectionContainer>
      <SectionHeader title='Day Five' handleClick={() => setShowModal(true)} />
      <div className='flex flex-col md:flex-row'>
        <div className='calculator-input'>
          <div className='flex space-x-1'>
            <Header title='Promotion' />
            <InfoButton message='Input numbers from your Stable, Archery Range. Set up as many troop types for score calculation as needed. Speed-ups will be evenly split. Troop types with empty fields will be ignored. Promotion is prioritised over training.' />
          </div>
          {localState.troops.map((troop: TroopEntry, index: number) => (
            <TroopType
              key={index}
              troopTypeData={troop}
              onBlur={() => { }}
              onChange={() => { }}
              onInstantDispatch={() => { }}
              onDelete={handleAddTroopType}
            />
          ))}
          <div className="w-full flex items-center">
            <button
              disabled={localState.troops.length >= 8}
              className="add-button"
              onClick={() => handleAddTroopType()}>Add Troop</button>
          </div>
          <Header title='Speed-up' />
          <TimeSelector
            id={'initialTrainingSpeedup'}
            timeValue={localState.initialTrainingSpeedup}
            title='Training'
            field='initialTrainingSpeedup'
            onChange={handleLocalChange}
            onBlur={handleBlur}
          />
          <RowWrapper>
            <div>
              <Header title='Imperial Title' headerType='sub-header' />
              <ToggleButton isToggled={localState.hasImperialTitle} onToggle={() => handleInstantDispatch('hasImperialTitle')} />
            </div>
            <div>
              <Header title='City Title' headerType='sub-header' />
              <ToggleButton isToggled={localState.hasCityTitle} onToggle={() => handleInstantDispatch('hasCityTitle')} />
            </div>
          </RowWrapper>
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
          <Output label="Total daily score" value={localState.totalDailyScore} />
          <RowWrapper>
            <Output label="Promotion" value={localState.score.promotion} />
            <Output label="Training" value={localState.score.training} />
          </RowWrapper>
          <Header title='Troop data' />

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

export default DayFiveCalc;
