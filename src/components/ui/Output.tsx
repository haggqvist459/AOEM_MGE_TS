import { toNumber } from "@/utils";

type Props = {
  label: string,
  value: number
}

const Output = ({
  label,
  value
}: Props) => {
  return (
    <div className="flex flex-col">
      <span className="score-label">{label}</span>
      <span className="score-text">{value.toLocaleString()}</span>
    </div>
  )
}

export default Output;