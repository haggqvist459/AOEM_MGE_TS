import { useState, useEffect, ChangeEvent } from "react";
import { DAY_KEYS, DAY_TITLES } from "@/utils";
import {
  useAppSelector, useAppDispatch, resetPreviousEventState, createEvent, deleteEvent,
  PreviousEventStateData, PreviousEventScoreData, selectPreviousScoreAverages, selectTotalScoreAverages
} from '@/redux'
import { CalculatorContainer, CalculatorHeader, Modal, Header, Input, PreviousEvent, GridWrapper, RowWrapper, Output } from "@/components";


const PreviousEventScorePage = () => {

  const dispatch = useAppDispatch();
  const previousEventData = useAppSelector(state => state.previousEventScore)
  const previousTotalAverage = useAppSelector(selectTotalScoreAverages)
  const previousDailyAverage = useAppSelector(selectPreviousScoreAverages)
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
      <div className="flex flex-col md:flex-row ">
        {/* Create event */}
        <div className="w-full mb-1 md:mr-1 border-secondary border-b md:border-r">
          <form onSubmit={(e) => {
            e.preventDefault()
            onConfirm()
          }}>
            <div className="md:px-1">
              <Header title="Create Event" />
            </div>
            <GridWrapper>
              <div className="md:pl-1">
                <Input
                  inputType="text"
                  id="startDate"
                  label='Start date'
                  placeholder="e.g. April 28"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                />
              </div>
              {/* Map the days in the newEvent object */}
              {newEvent.days.map((dayData, index) => (
                <div key={index} className={`border-transparent border-b ${index % 2 !== 0 ? 'md:pl-1' : 'md:pr-1'}`}>
                  <Header title={DAY_TITLES[dayData.day]} headerType="sub-header" />
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
            <div className="md:px-1">
              <button
                className="add-button w-full"
                type="submit"
                disabled={newEvent.name.trim() === ""}
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
        {/* Averages */}
        <div className="w-full mb-1 border-secondary border-b md:border-l">
          <div className="md:px-1">
            <Header title="Average Score" />
          </div>
          <GridWrapper>
            <div className="border-secondary border-b">
              <div className="md:px-1">
                <Header title="Total Score" headerType="sub-header" />
                <RowWrapper>
                  <Output label="First" value={previousTotalAverage.first} />
                  <Output label="Tenth" value={previousTotalAverage.tenth} />
                </RowWrapper>
              </div>
            </div>
            {previousDailyAverage.days.map((day, index) => (
              <div
                key={index}
                className={`border-secondary border-b
                  ${index % 2 === 0 ? 'md:border-l' : ''}
                  ${index === Object.values(DAY_KEYS).length - 1 ? 'border-b-0 md:border-b' : 'border-b'}
                  `}
              >
                <div className="md:px-1">
                  <Header title={DAY_TITLES[day.day]} headerType="sub-header" />
                  <RowWrapper>
                    <Output label={'First'} value={day.score.first} />
                    <Output label={'Tenth'} value={day.score.tenth} />
                  </RowWrapper>
                </div>
              </div>
            ))}
          </GridWrapper>
        </div>
      </div>
      <GridWrapper>
        {localState.previousEvents.map((previousEvent, index) => (
          <div key={index} className={`border-secondary ${index % 2 !== 0 ? 'md:border-l' : 'md:border-r'}`}>
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


