import { Header } from "@/components";

type Props = {
  isExpanded: boolean
  maxHeight?: number
  children: React.ReactNode
  title: string
  titleSize?: 'main-header' | 'sub-header'
  toggleExpansion: (isExpanded: boolean) => void
}

const ExpandableSection = ({
  isExpanded = false,
  maxHeight = 200,
  children,
  title,
  titleSize = 'sub-header',
  toggleExpansion

}: Props) => {

  const calculatedMaxHeight = isExpanded ? maxHeight : 0
  return (
    <div className="mb-1 pb-1 border-b border-neutral-400">
      <div className='flex flex-row space-x-2 mt-2'>
        <button
          type='button'
          onClick={() => toggleExpansion(!isExpanded)}
          className="flex flex-row items-center justify-between w-full text-left focus:outline-none"
        >
          <Header title={title} headerType={titleSize} />
          {/* Triangle Icon */}
          <span className={`text-primary font-sans inline-block transform transition-transform ${isExpanded ? "rotate-90" : "rotate-0"}`}>
            ▶
          </span>
        </button>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? ` opacity-100 translate-y-0 ` : "max-h-0 opacity-0 -translate-y-3 pointer-events-none"}`}
        style={{ maxHeight: isExpanded ? calculatedMaxHeight : 0 }}
      >
        {children}
      </div>
    </div>
  )
}

export default ExpandableSection;