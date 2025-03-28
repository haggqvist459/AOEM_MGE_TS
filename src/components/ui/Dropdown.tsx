
type Props = {
  id: string
  label: string
  value: any
  options: any
  onChange: () => void
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
    </div>
  )
}

export default Dropdown;