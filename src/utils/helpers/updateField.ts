import { PayloadAction } from '@reduxjs/toolkit';
import { FieldUpdatePayload } from '@/types';


/**
 * Generic update handler for both primitive and nested object fields.
 * 
 * @template T - The shape of the state slice (e.g., DayFiveState).
 */
export const updateFieldDelegated = <T extends Record<string, any>>(
  state: T,
  action: PayloadAction<FieldUpdatePayload>
) => {
  const { field, unit, value } = action.payload;

  if (unit && typeof value === 'string') {
    updateObjectField(state, field, unit, value);
  } else {
    updatePrimitiveField(state, field, value);
  }
};

/**
 * Updates a nested object field in the state.
 * Assumes state[field] is an object with string keys and string values.
 *
 * @template T - The shape of the state slice.
 * @template K - The key within T being updated.
 */
const updateObjectField = <T extends Record<K, Record<string, string>>, K extends keyof T>(
  state: T,
  field: K,
  unit: string,
  value: string
) => {
  state[field] = {
    ...state[field],
    [unit]: value,
  };
};

/**
 * Updates a primitive field in the state.
 * Supports string and boolean fields.
 * If the current value is a boolean, it is toggled.
 *
 * @template T - The shape of the state slice.
 * @template K - The key within T being updated.
 */
function updatePrimitiveField<T extends Record<K, string | boolean>, K extends keyof T>(
  state: T,
  field: K,
  value?: string | boolean
) {
  const currentValue = state[field];

  if (typeof currentValue === 'boolean') {
    state[field] = !currentValue as T[K]; // [1]
  } else {
    state[field] = value as T[K]; 
  }
}

/* [1]
Type assertion
T is a generic type representing an object
K is a key from that object type (i.e., one of its property names).
T[K] is the type of the value at key K — for example, if K = "gatherTroopName", then T[K] = string.
*/