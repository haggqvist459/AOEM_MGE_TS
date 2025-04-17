import { useAppSelector } from '@/redux'
import { DAY_KEYS } from '@/utils';
import { DailyScoreData, PreviousScoreData } from '@/types'
import { CalculatorContainer, CalculatorHeader, SubHeader, Output } from "@/components";


const TotalScorePage = () => {

  const dailyScores: DailyScoreData[] = [];
  const previousEventScores: PreviousScoreData[] = [];

  Object.keys(DAY_KEYS).forEach((key) => {
    dailyScores.push({
      day: DAY_KEYS[key as keyof typeof DAY_KEYS],
      score: useAppSelector(
        (state: any) =>
          state[DAY_KEYS[key as keyof typeof DAY_KEYS]].totalDailyScore === ''
            ? 0
            : state[DAY_KEYS[key as keyof typeof DAY_KEYS]].totalDailyScore
      ),
    });
  });

  Object.keys(DAY_KEYS).forEach((key) => {
    previousEventScores.push({
      day: DAY_KEYS[key as keyof typeof DAY_KEYS],
      score: {
        first: useAppSelector(
          (state: any) =>
            state[DAY_KEYS[key as keyof typeof DAY_KEYS]].previousEventScore.first === ''
              ? 0
              : state[DAY_KEYS[key as keyof typeof DAY_KEYS]].previousEventScore.first
        ),
        tenth: useAppSelector(
          (state: any) =>
            state[DAY_KEYS[key as keyof typeof DAY_KEYS]].previousEventScore.tenth === ''
              ? 0
              : state[DAY_KEYS[key as keyof typeof DAY_KEYS]].previousEventScore.tenth
        ),
      },
    });
  });



  return (
    <CalculatorContainer>
      <CalculatorHeader title="Score Overview" showTrash={false} />
      <div className='flex flex-col xs:flex-row mb-5'>
        <div className='w-full flex flex-col xs:w-1/2 xs:pr-2 xs:border-r border-secondary text-right'>
          <SubHeader title="Your score" />

        </div>
        <div className='w-full flex flex-col xs:w-1/2 xs:pl-2 xs:border-0 border-t border-secondary mt-1 xs:mt-0'>
          <SubHeader title="Previous events" />

        </div>
      </div>
    </CalculatorContainer>
  )
}

export default TotalScorePage;