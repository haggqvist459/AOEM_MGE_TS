import { RowWrapper } from "../layout";
import { Input } from '../ui';
import { TimeData } from "@/types";

type Props = {
  title: string
  field: string
  timeValue: TimeData
  showSeconds?: boolean
  onChange: (field: string, value: string, unit: keyof TimeData) => void
  onBlur: (field: string, unit: keyof TimeData) => void
}

const TimeSelector = ({
  title,
  field,
  timeValue,
  showSeconds = false,
  onChange,
  onBlur
}: Props) => {

  return (
    <div>
      <span className="input-label">{title}</span>
      <RowWrapper>
        <Input
          placeholder="days"
          id={`${field}-days`}
          value={timeValue.days}
          onChange={(e) => onChange(field, e.target.value, 'days')}
          onBlur={() => onBlur(field, 'days')}
        />
        <Input
          placeholder="hours"
          id={`${field}-hours`}
          value={timeValue.hours}
          onChange={(e) => onChange(field, e.target.value, 'hours')}
          onBlur={() => onBlur(field, 'hours')}
        />
        <Input
          placeholder="minutes"
          id={`${field}-minutes`}
          value={timeValue.minutes}
          onChange={(e) => onChange(field, e.target.value, 'minutes')}
          onBlur={() => onBlur(field, 'minutes')}
        />
        {showSeconds &&
          <Input
            placeholder="seconds"
            id={`${field}-seconds`}
            value={timeValue.seconds ?? ''}
            onChange={(e) => onChange(field, e.target.value, 'seconds')}
            onBlur={() => onBlur(field, 'seconds')}
          />
        }
      </RowWrapper>
    </div>
  )
}

export default TimeSelector;