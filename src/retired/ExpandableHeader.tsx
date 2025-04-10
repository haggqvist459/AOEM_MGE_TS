import { SubHeader } from '@/components'

type Props = {
  title: string
  isExpanded: boolean
  toggleExpansion: (isExpanded: boolean) => void
}

const ExpandableHeader = ({
  title,
  isExpanded,
  toggleExpansion
}: Props) => {
  return (
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
  )
}

export default ExpandableHeader;