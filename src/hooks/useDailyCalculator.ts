import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector, RootState } from '@/redux'
import { FieldUpdatePayload } from '@/types'

// Defines the shape of the config object passed into the hook
// Each parameter refers to the reducer or the state fetched
// useInstantDispatch as optional allows to pass in true if the function is needed for dropdowns or toggle buttons
type UseDailyCalculatorProps<T> = {
  selector: (state: RootState) => T
  updateField: (payload: FieldUpdatePayload) => void
  calculateScore: () => void
  resetState: () => void
  useInstantDispatch?: boolean
}


export const useDailyCalculator = <T>({
  selector,
  updateField,
  calculateScore,
  resetState,
  useInstantDispatch = false,
}: UseDailyCalculatorProps<T>) => {
  const dispatch = useAppDispatch()
  const dailyData = useAppSelector(selector)
  const [localState, setLocalState] = useState(dailyData)

  useEffect(() => {
    setLocalState(dailyData)
  }, [dailyData])

  const handleLocalChange = (
    field: string,
    value: string,
    unit: string | null = null
  ) => {
    setLocalState((prev: any) => ({
      ...prev,
      [field]: unit
        ? { ...prev[field], [unit]: value }
        : value,
    }))
  }

  const handleBlur = (field: string, unit?: string | null) => {
    const value = unit
      ? (localState as any)[field][unit as string]
      : (localState as any)[field]

    dispatch(updateField({ field, value, unit }))
    dispatch(calculateScore())
  }

  const handleInstantDispatch = useInstantDispatch
  ? (field: string, value: string) => {
      dispatch(updateField({ field, value }))
      dispatch(calculateScore())
    }
  : undefined

  const reset = () => {
    dispatch(resetState())
  }

  return {
    localState,
    handleLocalChange,
    handleBlur,
    handleInstantDispatch,
    reset,
  }
}