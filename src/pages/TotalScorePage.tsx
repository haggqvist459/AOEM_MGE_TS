import { DAY_KEYS, DAY_TITLES, toNumber } from '@/utils';
import { useAppSelector, selectPreviousScoreAverages, selectTotalScoreAverages } from '@/redux';
import { DailyScoreData } from '@/types'
import { SectionContainer, SectionHeader, Header, Output } from "@/components";


const TotalScorePage = () => {

  const dailyScores: DailyScoreData[] = [];
  const previousEventTotals = useAppSelector(selectTotalScoreAverages)
  const previousEventAverages = useAppSelector(selectPreviousScoreAverages)



  Object.keys(DAY_KEYS).forEach((key) => {
    dailyScores.push({
      day: DAY_KEYS[key as keyof typeof DAY_KEYS],
      score: toNumber(
        useAppSelector(
          (state: any) =>
            state[DAY_KEYS[key as keyof typeof DAY_KEYS]].totalDailyScore
        )
      ),
    });
  });



  const totalDailyScore = dailyScores.reduce((acc, curr) => acc + curr.score, 0);
  // console.log("dailyScores: ", dailyScores)
  // console.log("totalDailyScore: ", totalDailyScore)


  return (
    <SectionContainer>
      <div key={'total'}>
        <SectionHeader title="Score Overview" showTrash={false} />
        <div className='flex flex-col xs:flex-row mb-5'>
          <div className='w-full flex flex-col xs:w-1/2 xs:pr-2 xs:border-r border-secondary text-right'>
            <Header title="Your score" />
            <Output label='Total daily score' value={totalDailyScore} />
            <br />
            <br />
            {dailyScores.map(({ day, score }) => (
              <div key={day} className='mt-2'>
                <Header title={DAY_TITLES[day]} />
                <Output label={"Daily score"} value={score} />
                <br />
                <br />
              </div>
            ))}
          </div>
          <div className='w-full flex flex-col xs:w-1/2 xs:pl-2 xs:border-0 border-t border-secondary mt-1 xs:mt-0'>
            <Header title="Previous events" />
            <Output label='First place' value={previousEventTotals.first} />
            <Output label='Tenth place' value={previousEventTotals.tenth} />
            {previousEventAverages.days.map(({ day, score }) => (
              <div key={day} className='mt-2'>
                <Header title={'\u00A0'} />
                <Output label='1st place' value={score.first} />
                <Output label='10th place' value={score.tenth} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default TotalScorePage;