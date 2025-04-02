type Props = {
  isExpanded: boolean
  height?: string
  children: React.ReactNode
}

const ExpandableSection = ({
  isExpanded = false,
  height = 'max-h-50',
  children

}: Props) => {
  return (
    <div className={`pb-2 transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? `${height} opacity-100 translate-y-0` : "max-h-0 opacity-0 -translate-y-3"}`}>
      {children}
    </div>
  )
}

export default ExpandableSection;