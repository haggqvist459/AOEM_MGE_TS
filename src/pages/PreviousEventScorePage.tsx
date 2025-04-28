import { useState, useEffect } from "react";
import { DAY_KEYS, DAY_TITLES } from "@/utils";
import {
  useAppSelector, useAppDispatch, resetPreviousEventState, updateEvent, createEvent, deleteEvent,
  PreviousEventStateData, PreviousEventScoreData
} from '@/redux'
import { CalculatorContainer, CalculatorHeader, Modal, SubHeader, Input } from "@/components";


const PreviousEventScorePage = () => {

  const dispatch = useAppDispatch();
  const previousEventData = useAppSelector(state => state.previousEventScore)
  const [localState, setLocalState] = useState<PreviousEventStateData>(previousEventData);
  const [showModal, setShowModal] = useState(false)
  const [newEvent, setNewEvent] = useState<PreviousEventScoreData>({
    id: '',
    name: '',
    days: Object.values(DAY_KEYS).map(dayKey => ({
      day: dayKey,
      score: ''
    }))
  })

  useEffect(() => {
    setLocalState(previousEventData)
  }, [previousEventData])

  const confirmDelete = (): void => {

    dispatch(resetPreviousEventState())
    setShowModal(false)
  }
  return (
    <CalculatorContainer>
      <CalculatorHeader title="Previous Events" handleClick={() => setShowModal(true)} />
      <div>
        <SubHeader title="Create event" />
        <div className="grid grid-cols-1 xs:grid-cols-2">
          <Input
            inputType="text"
            id="startDate"
            label='Start date'
            placeholder="April 28"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
          {/* Map the days in the newEvent object */}
          {newEvent.days.map((dayData, index) => (
            <Input 
              key={index}
              id={`day-${index}`}
              label={DAY_TITLES[dayData.day]}
              placeholder="0"
              value={dayData.score}
              onChange={(e) => {
                const updatedDays = [...newEvent.days];
                updatedDays[index] = { ...updatedDays[index], score: e.target.value };
                setNewEvent({ ...newEvent, days: updatedDays });
              }}
            />
          ))}
        </div>
        <button className="add-button">
          Add Event
        </button>
      </div>




      {localState.previousEvents.map((previousEvent, index) => (
        <div key={index}>

        </div>
      ))}
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