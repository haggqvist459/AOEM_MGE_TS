import { useState, useEffect } from 'react'
import { DAY_KEYS, DAY_TITLES } from '@/utils';
import { DayKey } from '@/types';
import { SwipeWrapper } from '@/components';
import { DayOneCalc, DayThreeCalc, DayTwoCalc, DayFourCalc, DayFiveCalc, DaySixCalc, DaySevenCalc } from '@/components/calculators';



const HomePage = () => {

  const [activeDay, setActiveDay] = useState<DayKey>(DAY_KEYS.DAY_ONE)

  const [prevDay, setPrevDay] = useState<DayKey>(activeDay);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    if (prevDay === activeDay) return;

    const dayKeys = Object.values(DAY_KEYS);
    const prevIndex = dayKeys.indexOf(prevDay);
    const newIndex = dayKeys.indexOf(activeDay);

    setDirection(newIndex > prevIndex ? "left" : "right");
    setPrevDay(activeDay);
  }, [activeDay]);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeDay]);

  const menuOptions = Object.values(DAY_KEYS).map((key) => (
    <button key={key} onClick={() => setActiveDay(key)} className='text-blue-50 font-semibold text-base hover:font-bold'>
      {DAY_TITLES[key]}
    </button>
  ))

  const conditionallyRenderedDay = () => {
    switch (activeDay) {
      case DAY_KEYS.DAY_ONE: return <DayOneCalc activeDay={activeDay} setActiveDay={setActiveDay} />
      case DAY_KEYS.DAY_TWO: return <DayTwoCalc activeDay={activeDay} setActiveDay={setActiveDay} />
      case DAY_KEYS.DAY_THREE: return <DayThreeCalc activeDay={activeDay} setActiveDay={setActiveDay} />
      case DAY_KEYS.DAY_FOUR: return <DayFourCalc activeDay={activeDay} setActiveDay={setActiveDay} />
      case DAY_KEYS.DAY_FIVE: return <DayFiveCalc activeDay={activeDay} setActiveDay={setActiveDay} />
      case DAY_KEYS.DAY_SIX: return <DaySixCalc activeDay={activeDay} setActiveDay={setActiveDay} />
      case DAY_KEYS.DAY_SEVEN: return <DaySevenCalc activeDay={activeDay} setActiveDay={setActiveDay} />
      default: return <DayOneCalc activeDay={activeDay} setActiveDay={setActiveDay} />
    }
  }

  return (
    <div>
      <div className='relative px-3 w-full h-10 bg-primary flex items-center justify-center space-x-2'>
        <p className='text-blue-50 text-base min-w-max font-semibold'>Jump to: </p>
        <div className='flex space-x-2 overflow-x-auto whitespace-nowrap'>
          {menuOptions}
          <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-l from-primary/80 to-transparent md:hidden" />
        </div>

      </div>
        <SwipeWrapper key={activeDay} >
          {conditionallyRenderedDay()}
        </SwipeWrapper>
    </div>
  )
}

export default HomePage;

