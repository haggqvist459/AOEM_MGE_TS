
// loadData
export const loadData = <T>(key: string): T | undefined => {
  try {
    const loadedData = localStorage.getItem(key);
    return loadedData ? (JSON.parse(loadedData) as T) : undefined;
  } catch (err) {
    console.error(`localStorage load error [${key}]:`, err);
    return undefined;
  }
};

// saveData  
// <T> Declares a generic type T, a placeholder for any data type (e.g., string, MyType, DayState, etc.)
// The function does not return anything (it's used for its side effect, saving to localStorage)
// data: T means that Data can be anything
export const saveData = <T>(key: string, data: T): void => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
  } catch (err) {
    console.error(`localStorage save error [${key}]:`, err);
  }
};


// Delete all the data in localstorage. 
export const deleteData = ():void => {
  try {
    localStorage.clear()
  } catch (err) {
    console.log("localStorage saveData error: ", err)
  }
}