import { useState, useEffect } from "react";
import { DAY_KEYS, DAY_TITLES } from "@/utils";
import {
  useAppSelector, useAppDispatch, resetPreviousEventState, updateEvent, createEvent, deleteEvent,
  PreviousEventStateData, PreviousEventScoreData
} from '@/redux'
import { CalculatorContainer, CalculatorHeader, Modal, SubHeader, Input, PreviousEvent, GridWrapper, Output } from "@/components";


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
    console.log("localState: ", localState)
  }, [previousEventData])

  const onConfirm = (): void => {

    dispatch(createEvent(newEvent))
    setNewEvent({
      id: '',
      name: '',
      days: Object.values(DAY_KEYS).map(dayKey => ({
        day: dayKey,
        score: ''
      }))
    })
  }
  const eventTotals = localState.previousEvents.map(event => {
    return event.days.reduce((sum, day) => sum + Number(day.score || 0), 0);
  });

  const totalScoreAverage = eventTotals.length > 0
    ? eventTotals.reduce((acc, curr) => acc + curr, 0) / eventTotals.length
    : 0;

  const dailyAverages = Object.values(DAY_KEYS).map(dayKey => {
    let total = 0;
    let count = 0;

    for (const event of localState.previousEvents) {
      const day = event.days.find(day => day.day === dayKey);
      if (day && day.score !== '') {
        total += Number(day.score);
        count++;
      }
    }

    return count > 0 ? total / count : 0;
  });



  const onDelete = (id: string): void => {
    dispatch(deleteEvent(id))
  }

  const confirmReset = (): void => {
    dispatch(resetPreviousEventState())
    setShowModal(false)
  }
  return (
    <CalculatorContainer>
      <CalculatorHeader title="Previous Events" handleClick={() => setShowModal(true)} />
      <div className="flex">
        {/* Input */}
        <div className="w-1/2 px-1">
          <SubHeader title="Create event" />
          <GridWrapper>
            <Input
              inputType="text"
              id="startDate"
              label='Start date'
              placeholder="e.g. April 28"
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
          </GridWrapper>
          <button className="add-button w-full" onClick={() => onConfirm()}>
            Add Event
          </button>
        </div>
        {/* Averages */}
        <div className="w-1/2 px-1">
          <SubHeader title="Average score" />
          <GridWrapper>
            {Object.values(DAY_KEYS).map((dayKey, index) => (
              <Output key={dayKey} label={DAY_TITLES[dayKey]} value={dailyAverages[index]}/>
            ))}
            <Output label="Total score" value={totalScoreAverage}/>
          </GridWrapper>
        </div>
      </div>
      <GridWrapper>
        {localState.previousEvents.map((previousEvent, index) => (
          <div key={index} className="px-1">
            <PreviousEvent
              previousEvent={previousEvent}
              onDelete={onDelete}
            />
          </div>
        ))}
      </GridWrapper>
      <Modal
        title="Delete data"
        description="Delete all previous event data? This action can not be undone"
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={() => confirmReset()}
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