import { useState, useEffect, ChangeEvent } from "react";
import { DAY_KEYS, DAY_TITLES } from "@/utils";
import {
  useAppSelector, useAppDispatch, resetPreviousEventState, updateEvent, createEvent, deleteEvent,
  PreviousEventStateData, PreviousEventScoreData
} from '@/redux'
import { CalculatorContainer, CalculatorHeader, Modal, SubHeader, Input, PreviousEvent, GridWrapper, RowWrapper, Output } from "@/components";


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
      score: {
        first: '',
        tenth: ''
      }
    }))
  })

  useEffect(() => {
    setLocalState(previousEventData)
    console.log("localState: ", localState)
  }, [previousEventData])


  const onChange = (e: ChangeEvent<HTMLInputElement>, index: number, field: 'first' | 'tenth'): void => {
    const updatedDays = [...newEvent.days];
    updatedDays[index] = {
      ...updatedDays[index],
      score: {
        ...updatedDays[index].score,
        [field]: e.target.value,
      },
    };
    setNewEvent({ ...newEvent, days: updatedDays });
  };

  const onConfirm = (): void => {
    dispatch(createEvent(newEvent))
    setNewEvent({
      id: '',
      name: '',
      days: Object.values(DAY_KEYS).map(dayKey => ({
        day: dayKey,
        score: {
          first: '',
          tenth: ''
        }
      }))
    })
  }

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
      <div className="flex flex-col sm:flex-row">
        {/* Create event */}
        <div className="w-1/2 xs:w-full px-1 border-b border-r border-secondary mb-1 mr-1">
          <form onSubmit={(e) => {
            e.preventDefault()
            onConfirm()
          }}>
            <SubHeader title="Create event" />
            <GridWrapper columns={1}>
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
                <div key={index}>
                  <h3 className="text-[17px] font-semibold text-primary">{DAY_TITLES[dayData.day]}</h3>
                  <RowWrapper>
                    <Input
                      id={`${index}-${dayData.day}-first`}
                      label={'First'}
                      placeholder="0"
                      value={dayData.score.first}
                      required={false}
                      onChange={(e) => onChange(e, index, 'first')}
                    />
                    <Input
                      key={index}
                      id={`${index}-${dayData.day}-tenth`}
                      label={'Tenth'}
                      placeholder="0"
                      value={dayData.score.tenth}
                      required={false}
                      onChange={(e) => onChange(e, index, 'tenth')}
                    />
                  </RowWrapper>
                </div>
              ))}
            </GridWrapper>
            <button
              className="add-button w-full"
              type="submit"
              disabled={newEvent.name.trim() === ""}
            >
              Add Event
            </button>
          </form>
        </div>
        {/* Averages */}
        <div className="w-1/2 xs:w-full px-1 border-l border-b border-secondary mb-1">
          <SubHeader title="Average score" />
          <GridWrapper columns={1}>
          <Output label="Total score" value={0} />
            {Object.values(DAY_KEYS).map((dayKey, index) => (
              <div key={index}>
                <h3 className="text-[17px] font-semibold text-primary">{DAY_TITLES[dayKey]}</h3>
                <RowWrapper>
                  <Output key={dayKey} label={'First'} value={0} />
                  <Output key={dayKey} label={'Tenth'} value={0} />
                </RowWrapper>
              </div>
            ))}
          </GridWrapper>
        </div>
      </div>
      <GridWrapper columns={1}>
        {localState.previousEvents.map((previousEvent, index) => (
          <div key={index} className={`px-1 border-b border-secondary ${index % 2 !== 0 ? 'md:border-l' : 'md:border-r'}`}>
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


