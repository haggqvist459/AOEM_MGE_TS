import { useState, useEffect } from 'react'
import { useDailyCalculator } from "@/hooks";
import { useAppDispatch, DayThreeStateData } from "@/redux";
import { toNumber } from '@/utils';
import { DayKey } from '@/types';
import { updateFieldDayThree, resetStateDayThree, calculateDailyScoreDayThree, updateTroopField, addTroop, removeTroop, GatherTroopData } from "@/redux"
import { CalculatorContainer, CalculatorButtons, CalculatorHeader, SubHeader, RowWrapper, Input, Output, GatherTroop, Modal } from "@/components";
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'


type Props = {
  activeDay: DayKey;
  setActiveDay: React.Dispatch<React.SetStateAction<DayKey>>;
}

const DayThreeCalc = ({ activeDay, setActiveDay}: Props) => {

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

  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [richFieldOptions, setRichFieldOptions] = useState<DropdownOption[]>([])
  const [allianceCenterOptions, setAllianceCenterOptions] = useState<DropdownOption[]>([])

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
    console.log("handletroopBlur values, id: ", id, ' field: ', field);
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
    console.log("dropdownDispatch values, field: ", field, ' value: ', value)
    dispatch(updateFieldDayThree({ field, value }))
    calculateDailyScoreDayThree(value)
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
    <CalculatorContainer>
      <CalculatorHeader title="Day Three" handleClick={() => setShowModal(true)} />
      <div className='flex flex-col md:flex-row'>
        <div className='calculator-input'>
          <SubHeader title='Gathering'/>
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
              className="w-1/2 lg:w-1/3 mx-auto px-4 my-2 rounded border-2 border-primary bg-primary text-blue-50 font-medium hover:bg-blue-900 hover:border-blue-50 disabled:opacity-50 disabled:hover:border-none'"
              onClick={() => handleAddtroop()}>Add troop</button>
          </div>
          <RowWrapper>
            <Dropdown
              id='richFieldId'
              label='Rich Field'
              options={richFieldOptions}
              value={localState.richFieldId}
              // onChange={(e) => handleInstantDispatch('richFieldId', e.target.value)}
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
          <SubHeader title='Advent wheel'/>
          <Input
            id='empireCoins'
            placeholder="0"
            label="Empire coins"
            value={localState.empireCoins}
            onChange={(e) => handleLocalChange('empireCoins', e.target.value)}
            onBlur={() => handleBlur('empireCoins')}
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
            <Output label='Gathering' value={localState.score.gathering} />
            <Output label='Spins' value={localState.score.spins} />
          </RowWrapper>
          <SubHeader title='Previous Event Score' />
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

export default DayThreeCalc;