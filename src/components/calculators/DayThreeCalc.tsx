import { useState, useEffect } from 'react'
import { useDailyCalculator, usePreviousEventScores } from '@/hooks';
import { useAppDispatch, DayThreeStateData } from "@/redux";
import { DAY_KEYS } from '@/utils';
import { DayKey } from '@/types';
import { updateFieldDayThree, resetStateDayThree, calculateDailyScoreDayThree, updateTroopField, addTroop, removeTroop, GatherTroopData } from "@/redux"
import { SectionContainer, CalculatorButtons, SectionHeader, Header, RowWrapper, Input, Output, GatherTroop, Modal, PreviousEventScore, GridWrapper } from "@/components";
import { Dropdown, DropdownOption, mapToDropdownOptions } from '@/components/ui/dropdown'


type Props = {
  activeDay: DayKey;
  setActiveDay: React.Dispatch<React.SetStateAction<DayKey>>;
}

const DayThreeCalc = ({ activeDay, setActiveDay }: Props) => {

  const {
    localState,
    handleLocalChange,
    handleBlur,
    reset,
    setLocalState,
  } = useDailyCalculator<DayThreeStateData>({
    selector: state => state.dayThree,
    updateField: updateFieldDayThree,
    calculateScore: (field) => calculateDailyScoreDayThree(field),
    resetState: resetStateDayThree,
    exposeSetLocalState: true,
  })

  const {
    eventList,
    selectedEvent,
    setSelectedEvent,
    selectedScore,
  } = usePreviousEventScores(DAY_KEYS.DAY_ONE)

  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [richFieldOptions, setRichFieldOptions] = useState<DropdownOption[]>([])
  const [allianceCenterOptions, setAllianceCenterOptions] = useState<DropdownOption[]>([])
  const previousEventDropdownOptions = [
    { label: 'Daily average', value: 'daily-average' },
    ...mapToDropdownOptions(eventList)
  ]

  useEffect(() => {

    const firstOption: DropdownOption = {
      label: 'Select troop',
      value: '0'
    }

    const richFieldOptions: DropdownOption[] = [
      firstOption,
      ...localState.troops
        .filter((troop: GatherTroopData) => troop.id !== localState.allianceCenterId)
        .map((troop: GatherTroopData) => ({
          label: troop.name,
          value: troop.id
        }))]

    const allianceCenterOptions: DropdownOption[] = [
      firstOption,
      ...localState.troops
        .filter((troop: GatherTroopData) => troop.id !== localState.richFieldId)
        .map((troop: GatherTroopData) => ({
          label: troop.name,
          value: troop.id
        }))
    ]

    setRichFieldOptions(richFieldOptions)
    setAllianceCenterOptions(allianceCenterOptions)

  }, [localState.troops, localState.richFieldId, localState.allianceCenterId])


  const handlelocalTroopChange = (id: string, field: string, value: string) => {
    setLocalState?.((prev: typeof localState) => ({
      ...prev,
      troops: prev.troops.map((troop: typeof prev.troops[number]) =>
        troop.id === id ? { ...troop, [field]: value } : troop
      )
    }));
  }

  const handleTroopBlur = (id: string, field: string) => {
    // console.log("handletroopBlur values, id: ", id, ' field: ', field);
    const troop = localState.troops.find((troop: GatherTroopData) => troop.id === id);
    if (!troop) return;
    dispatch(updateTroopField({ id, field, value: troop[field as keyof GatherTroopData] }));
    dispatch(calculateDailyScoreDayThree(id))
  }

  const handleTroopInstantDispatch = (id: string, field: string, value: boolean) => {
    dispatch(updateTroopField({ id, field, value }))
    dispatch(calculateDailyScoreDayThree(id))
  }

  const dropdownDispatch = (field: string, value: string) => {
    // console.log("dropdownDispatch values, field: ", field, ' value: ', value)
    dispatch(updateFieldDayThree({ field, value }))
    dispatch(calculateDailyScoreDayThree('dropdownSelection'))
  }


  const handleRemovetroop = (id: string) => {
    dispatch(removeTroop(id))
  }
  const handleAddtroop = () => {
    if (localState.troops.length >= 5) return;

    dispatch(addTroop())
  }

  const resetCalculator = () => {
    reset()
    setShowModal(false)
  }


  return (
    <SectionContainer>
        <SectionHeader title="Day Three" handleClick={() => setShowModal(true)} />
        <div className='flex flex-col md:flex-row'>
          <div className='calculator-input'>
            <Header title='Gathering' />
            {localState.troops.map((troop: GatherTroopData, index: number) => (
              <GatherTroop
                key={index}
                troopData={troop}
                onChange={handlelocalTroopChange}
                onBlur={handleTroopBlur}
                onInstantDispatch={handleTroopInstantDispatch}
                onDelete={handleRemovetroop}
              />
            ))}
            <div className="w-full flex items-center">
              <button
                disabled={localState.troops.length >= 5}
                className="add-button"
                onClick={() => handleAddtroop()}>Add troop</button>
            </div>
            <RowWrapper>
              <Dropdown
                id='richFieldId'
                label='Rich Field'
                options={richFieldOptions}
                value={localState.richFieldId}
                onChange={(e) => dropdownDispatch('richFieldId', e.target.value)}
              />
              <Dropdown
                id='allianceCenterId'
                label='Alliance Center'
                options={allianceCenterOptions}
                value={localState.allianceCenterId}
                onChange={(e) => dropdownDispatch('allianceCenterId', e.target.value)}
              />
            </RowWrapper>
            <Header title='Advent wheel' />
            <Input
              id='empireCoins'
              placeholder="0"
              label="Empire coins"
              value={localState.empireCoins}
              onChange={(e) => handleLocalChange('empireCoins', e.target.value)}
              onBlur={() => handleBlur('empireCoins')}
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
              <Output label='Spins' value={localState.score.spins} />
            </RowWrapper>
            <GridWrapper columns={2}>
              <Output label='Gathering total' value={localState.score.gathering} />
              {localState.troops.map((troop, index) => (
                <Output key={index} label={troop.name} value={troop.score} />
              ))}
            </GridWrapper>
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

export default DayThreeCalc;