import { DropdownOption } from './types';

type Props = {
  id: string
  label: string
  value: string | number
  options: DropdownOption[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Dropdown = ({
  id,
  label,
  value,
  options,
  onChange
}: Props) => {


  return (
    <div className="w-full">
      <label htmlFor={id} className="input-label">{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="input-text"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown;