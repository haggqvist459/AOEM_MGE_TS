import { toNumber } from "@/utils";

type Props = {
  label: string,
  value: string
}

const Output = ({
  label,
  value
}: Props) => {
  return (
    <div className="flex flex-col">
      <span className="score-label">{label}</span>
      <span className="score-text">{toNumber(value).toLocaleString()}</span>
    </div>
  )
}

export default Output;