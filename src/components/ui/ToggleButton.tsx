import { useState, useEffect } from 'react'
import { CheckCircle, CheckCross } from '@/components/icons'

type Props = {
  isToggled: boolean
  onToggle: () => void
}

const ToggleButton = ({
  isToggled,
  onToggle
}: Props) => {

  const [delayedToggle, setDelayedToggle] = useState(isToggled)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedToggle(isToggled);
    }, 200);

    return () => clearTimeout(timer);
  }, [isToggled]);

  return (
    <button
      type="button"
      aria-pressed={isToggled}
      onClick={onToggle}
      className={`w-10 h-5 mb-0.5 rounded-full transition-all duration-[400ms] ${isToggled ? 'bg-primary' : 'bg-secondary'}`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full transition-all duration-[400ms] ${isToggled ? "translate-x-full" : "translate-x-0"
          }`}
      >
        {delayedToggle
          ? (<CheckCircle isToggled={isToggled} />)
          : (<CheckCross isToggled={isToggled} />)
        }
      </div>
    </button>
  )
}

export default ToggleButton;