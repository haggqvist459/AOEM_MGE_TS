import { DayKey } from "@/types";
import { DAY_KEYS } from "@/utils";

type Props = {
  activeDay: DayKey;
  setActiveDay: React.Dispatch<React.SetStateAction<DayKey>>;
}

const CalculatorButtons = ({
  activeDay,
  setActiveDay
}: Props) => {

  const dayKeysArray = Object.values(DAY_KEYS)
  const dayKeyIndex = dayKeysArray.indexOf(activeDay)

  return (
    <div className="flex space-x-4 mb-5 mt-2">
      <button
        type="button"
        className="w-1/2 font-semibold rounded border-2 text-primary bg-secondary border-secondary disabled:opacity-50 hover:border-primary disabled:hover:border-secondary"
        onClick={() => setActiveDay(dayKeysArray[dayKeyIndex - 1])}
        disabled={dayKeyIndex === 0}
      >
        Previous
      </button>
      <button
        type="button"
        className="w-1/2 font-semibold rounded border-2 text-blue-50 bg-primary border-primary disabled:opacity-50 hover:border-blue-50 disabled:hover:border-primary"
        onClick={() => setActiveDay(dayKeysArray[dayKeyIndex + 1])}
        disabled={dayKeyIndex === dayKeysArray.length -1}
      >
        Next
      </button>
    </div>
  )
}

export default CalculatorButtons;