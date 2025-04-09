type Props = {
  isExpanded: boolean
  height?: string
  children: React.ReactNode
  title: string
  toggleExpansion: (isExpanded: boolean) => void
}

const ExpandableSection = ({
  isExpanded = false,
  height = 'max-h-50',
  children,
  title,
  toggleExpansion

}: Props) => {
  return (
    <div className="mb-1 pb-1 border-b border-neutral-400">
      <div className='flex flex-row space-x-2 mt-2'>
        <button
          type='button'
          onClick={() => toggleExpansion(!isExpanded)}
          className="flex flex-row items-center justify-between w-full text-left focus:outline-none"
        >
          <h3 className='text-[17px] font-semibold text-primary'>{title}</h3>
          {/* Triangle Icon */}
          <span className={`text-primary font-sans inline-block transform transition-transform ${isExpanded ? "rotate-90" : "rotate-0"}`}>
            ▶
          </span>
        </button>
      </div>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? `${height} opacity-100 translate-y-0 ` : "max-h-0 opacity-0 -translate-y-3 pointer-events-none"}`}>
        {children}
      </div>
    </div>
  )
}

export default ExpandableSection;