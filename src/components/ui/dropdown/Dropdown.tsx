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
      <label htmlFor={id} className="label">{label}</label>
      <div className='w-full relative'>
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="dropdown-text"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className='absolute top-0.5 right-0.5 flex items-center pointer-events-none'>
          <svg className='w-5 h-5 text-neutral-800' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24' >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Dropdown;