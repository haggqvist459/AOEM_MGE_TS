import { CalculatorContainer, CalculatorHeader, SubHeader, Output } from "@/components";


const PreviousEventScorePage = () => {
  return (
    <CalculatorContainer>
      <CalculatorHeader title="Previous Event Scores" showTrash={false}/>
    </CalculatorContainer>
  )
}

export default PreviousEventScorePage;


// each previous event score
// contains either 7 or 2 scores
// title field for start date
// 