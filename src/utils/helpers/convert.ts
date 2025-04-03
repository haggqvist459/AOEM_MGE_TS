import { TimeData } from "@/types"

// convert the stringed value into a number.
export const toNumber = (value: string): number => {
  const num = parseFloat(value) // default state values will result in num = isNaN
  return isNaN(num) ? 0 : num
}

export const toSeconds = ({ days, hours, minutes, seconds }: TimeData) => {

  return (
    toNumber(days) * 86400 +
    toNumber(hours) * 3600 +
    toNumber(minutes) * 60 +
    toNumber(seconds ?? '0')
  )
};

export const fromSeconds = (totalSeconds: number): TimeData => {
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return {
    days: String(days),
    hours: String(hours),
    minutes: String(minutes),
    seconds: String(seconds),
  }
}

export const toMinutes = ({ days, hours, minutes }: TimeData) => {
  return (
    toNumber(days) * 1440 +
    toNumber(hours) * 60 +
    toNumber(minutes)
  )
}

export const fromMinutes = (totalMinutes: number): TimeData => {
  const days = Math.floor(totalMinutes / 1440)                  
  const hours = Math.floor((totalMinutes % 1440) / 60)          
  const minutes = totalMinutes % 60

  return {
    days: String(days),
    hours: String(hours),
    minutes: String(minutes),
  }

}