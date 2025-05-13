import { DropdownOption } from "./types"

export const mapToDropdownOptions = <
  T extends Record<string, string>
>(obj: T): DropdownOption[] => {
  return Object.entries(obj).map(([label, value]) => ({ label, value }))
}