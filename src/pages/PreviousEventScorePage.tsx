import { useState } from "react";
import { useAppSelector, useAppDispatch, resetPreviousEventState, updateEvent, createEvent, deleteEvent } from '@/redux'
import { CalculatorContainer, CalculatorHeader, SubHeader, Output, ToggleButton, Modal } from "@/components";


const PreviousEventScorePage = () => {

  const [showModal, setShowModal] = useState(false)
  const dispatch = useAppDispatch()

  const confirmDelete = (): void => {

    dispatch(resetPreviousEventState())
    setShowModal(false)
  }
  return (
    <CalculatorContainer>
      <CalculatorHeader title="Previous Events" handleClick={() => setShowModal(true)} />
      <Modal
        title="Delete data"
        description="Delete all previous event data? This action can not be undone"
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={() => confirmDelete()}
      />
    </CalculatorContainer>
  )
}

export default PreviousEventScorePage;


// Each previous event score
// Contains either 7 or 2 scores
// Title field for start date
// Input section w/ 2 or 7 inputs depending on complexity 
// 