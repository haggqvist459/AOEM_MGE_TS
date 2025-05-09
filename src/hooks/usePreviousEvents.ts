import { useState } from 'react';
import { DayKey } from "@/types";
import {
  useAppSelector, 
  selectAverageScoreForDay,
  selectPreviousEventNames,
  selectScoreForDayInEvent,
  PreviousEventNumericData
} from '@/redux'


export const usePreviousEventScores = (day: DayKey) => {
  const previousEventAverages = useAppSelector(selectAverageScoreForDay(day))
  const eventList = useAppSelector(selectPreviousEventNames)
  const getEventScoreById = (eventId: string) => useAppSelector(selectScoreForDayInEvent(eventId, day))
  const [selectedEvent, setSelectedEvent] = useState<string>('daily-average');

  const eventScore = useAppSelector(
    selectScoreForDayInEvent(selectedEvent === 'daily-average' ? '' : selectedEvent, day)
  )
  
  const selectedScore: PreviousEventNumericData =
    selectedEvent === 'daily-average' ? previousEventAverages : eventScore;

  return {
    previousEventAverages,
    eventList,
    getEventScoreById,
    selectedEvent,
    setSelectedEvent,
    selectedScore
  }
}