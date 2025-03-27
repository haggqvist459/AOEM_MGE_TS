// import { LOCALSTORAGE_KEY } from "./constants";


// // loadData
// export const loadData = (): ListState | undefined => {
//     try {
//         const loadedData = localStorage.getItem(LOCALSTORAGE_KEY);
//         return loadedData ? JSON.parse(loadedData) as ListState : undefined;
//     } catch (err) {
//         console.error("localStorage loadData error:", err);
//         return undefined;
//     }
// };

// // saveData  
// export const saveData = (data: ListState): void => {
//     try {
//         const serializedData = JSON.stringify(data);
//         localStorage.setItem(LOCALSTORAGE_KEY, serializedData);
//     } catch (err) {
//         console.error("localStorage saveData error:", err);
//     }
// };
