import { loadData, saveData } from "./localStorage";
import { DAY_KEYS } from "./constants";


export const exportLocalStorageToFile = (): void => {
  const collectedData: Record<string, unknown> = {}

  for (const key of Object.values(DAY_KEYS)) {
    const value = loadData(key)
    if (value !== null) {
      collectedData[key] = value
    }
  }

  if (Object.keys(collectedData).length === 0) {
    alert("No data found to export!")
    return
  }

  const data = JSON.stringify(collectedData, null, 2)
  const blob = new Blob([data], { type: "application/txt" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "AoEM_MGE_backup.txt"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export const importLocalStorageFromFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target?.result as string) as Record<string, unknown>

      for (const key of Object.values(DAY_KEYS)) {
        if (data[key] !== undefined) {
          saveData(key, data[key])
        }
      }

      alert("Data successfully imported into localStorage!")
      window.location.reload()
    } catch {
      alert("Invalid file format!")
    }
  }

  reader.readAsText(file)
}