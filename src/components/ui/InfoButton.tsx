import { useEffect, useRef, useState } from 'react'
import { Info } from '@/components/icons'

type Props = {
  message: string,
}

const InfoButton = ({ message }: Props) => {


  const [show, setShow] = useState(false)
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block self-end" ref={popupRef}>
      <button
        onClick={() => setShow((prev) => !prev)}
        className="text-primary"
      >
        <Info />
      </button>
      {show && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 p-2 bg-neutral-700 text-blue-50 text-xs rounded shadow">
          {message}
        </div>
      )}
    </div>
  )
}

export default InfoButton;