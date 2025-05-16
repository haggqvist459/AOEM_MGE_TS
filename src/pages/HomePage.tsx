import { useState, useEffect } from 'react'
import { DAY_KEYS, DAY_TITLES } from '@/utils';
import { DayKey } from '@/types';
import { SlideWrapper } from '@/components';
import { DayOneCalc, DayThreeCalc, DayTwoCalc, DayFourCalc, DayFiveCalc, DaySixCalc, DaySevenCalc } from '@/components/calculators';



const HomePage = () => {

  const [activeDay, setActiveDay] = useState<DayKey>(DAY_KEYS.DAY_ONE)


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeDay]);


  const menuOptions = Object.values(DAY_KEYS).map((key) => (
    <button key={key} onClick={() => setActiveDay(key)} className='text-blue-50 font-semibold text-base hover:font-bold'>
      {DAY_TITLES[key]}
    </button>
  ))

  const daySlides = [
    { key: DAY_KEYS.DAY_ONE, component:<DayOneCalc activeDay={activeDay} setActiveDay={setActiveDay} key={activeDay} />},
    { key: DAY_KEYS.DAY_TWO, component: <DayTwoCalc activeDay={activeDay} setActiveDay={setActiveDay} key={activeDay} />},
    { key: DAY_KEYS.DAY_THREE, component: <DayThreeCalc activeDay={activeDay} setActiveDay={setActiveDay} key={activeDay} />},
    { key: DAY_KEYS.DAY_FOUR, component: <DayFourCalc activeDay={activeDay} setActiveDay={setActiveDay} key={activeDay} /> },
    { key: DAY_KEYS.DAY_FIVE, component: <DayFiveCalc activeDay={activeDay} setActiveDay={setActiveDay} key={activeDay} /> },
    { key: DAY_KEYS.DAY_SIX, component: <DaySixCalc activeDay={activeDay} setActiveDay={setActiveDay} key={activeDay} /> },
    { key: DAY_KEYS.DAY_SEVEN, component: <DaySevenCalc activeDay={activeDay} setActiveDay={setActiveDay} key={activeDay} /> },
  ];

  return (
    <div>
      <div className='relative px-3 w-full h-10 bg-primary flex items-center justify-center space-x-2'>
        <p className='text-blue-50 text-base min-w-max font-semibold'>Jump to: </p>
        <div className='flex space-x-2 overflow-x-auto whitespace-nowrap'>
          {menuOptions}
          <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-l from-primary/80 to-transparent md:hidden" />
        </div>

      </div>
      <SlideWrapper activeKey={activeDay} slides={daySlides}>
      </SlideWrapper>
    </div>
  )
}

export default HomePage;

