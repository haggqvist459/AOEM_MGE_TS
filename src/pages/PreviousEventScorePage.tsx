import { CalculatorContainer, CalculatorHeader, SubHeader, Output, ToggleButton } from "@/components";


const PreviousEventScorePage = () => {
  return (
    <CalculatorContainer>
      <CalculatorHeader title="Previous Event Scores" showTrash={false}/>
      
    </CalculatorContainer>
  )
}

export default PreviousEventScorePage;


// Each previous event score
// Contains either 7 or 2 scores
// Title field for start date
// Input section w/ 2 or 7 inputs depending on complexity 
// 