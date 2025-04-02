import { useAppDispatch } from "@/redux";
import { useDailyCalculator } from "@/hooks";
import { updateFieldDayThree, resetStateDayThree, calculateDailyScoreDayThree, updateMarchField, addMarch, removeMarch, GatherMarchData } from "@/redux"
import { CalculatorContainer, CalculatorHeader, SubHeader, RowWrapper, Input, Output, Dropdown, GatherMarch } from "@/components";

// props needed for calculator navigation later
type Props = {}

const DayThreeCalc = (props: Props) => {

  const {
    localState,
    handleLocalChange,
    handleBlur,
    reset,
    setLocalState
  } = useDailyCalculator({
    selector: state => state.dayThree,
    updateField: updateFieldDayThree,
    calculateScore: (field) => calculateDailyScoreDayThree(field),
    resetState: resetStateDayThree,
    exposeSetLocalState: true
  })

  const dispatch = useAppDispatch()

  const handlelocalMarchChange = (id: string, field: string, value: string) => {
    setLocalState?.((prev: typeof localState) => ({
      ...prev,
      marches: prev.marches.map((march: typeof prev.marches[number]) =>
        march.id === id ? { ...march, [field]: value } : march
      )
    }));
  }

  const handleMarchBlur = (id: string, field: string) => {
    const march = localState.marches.find((m: GatherMarchData) => m.id === id);
    if (!march) return;
    dispatch(updateMarchField({ id, field, value: march[field] }));
  };

  const handleMarchInstantDispatch = (id: string, field: string, value: boolean) => {
    dispatch(updateMarchField({ id, field, value}))
  }

  const handleRemoveMarch = (id: string) => {
    dispatch(removeMarch(id))
  }
  const handleAddMarch = () => {
    if (localState.marches.length >= 5) return;

    dispatch(addMarch())
  }

  const resetCalculator = () => {
    // modal pop up
    reset()
  }


  return (
    <CalculatorContainer>
      <CalculatorHeader title="Day Three" handleClick={() => resetCalculator()} />
      {localState.marches.map((march: GatherMarchData, index: number) => (
        <GatherMarch
          key={index}
          marchData={march}
          onChange={handlelocalMarchChange}
          onBlur={handleMarchBlur}
          onInstantDispatch={handleMarchInstantDispatch}
          onDelete={handleRemoveMarch}
        />
      ))}
      <div className="w-full flex items-center">
        <button
          disabled={localState.marches.length >= 5}
          className="w-1/2 lg:w-1/3 mx-auto px-4 my-2 rounded border-2 border-primary bg-primary text-blue-50 font-medium hover:bg-blue-900 hover:border-blue-50 disabled:opacity-50 disabled:hover:border-none'"
          onClick={() => handleAddMarch()}>Add March</button>
      </div>

      <Input
        id='empireCoins'
        placeholder="0"
        label="Empire coins"
        value={localState.empireCoins}
        onChange={(e) => handleLocalChange('empireCoins', e.target.value)}
        onBlur={() => handleBlur('empireCoins')}
      />
    </CalculatorContainer>
  )
}

export default DayThreeCalc;