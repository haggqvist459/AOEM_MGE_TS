import { PayloadAction } from '@reduxjs/toolkit';
import { FieldUpdatePayload } from '@/types';


// <T extends Record<string, any>>
// This means: "T is a generic type that must be an object with string keys and any values"
// It's used so the function can work with any shape of slice state (e.g., DayOneState, DayTwoState)
// This lets TypeScript infer the actual state type when the function is called from a specific slice
export const updateFieldDelegated = <T extends Record<string, any>>(
    state: T,
    action: PayloadAction<FieldUpdatePayload>
) => {
    const { field, unit, value } = action.payload;

    // validate value here at later stage

    if (unit) {
        updateObjectField(state, field, unit, value);
    } else {
        updatePrimitiveField(state, field, value);
    }
};

// (state as Record<string, any>)
// This is a type assertion telling TypeScript:
// "Trust me, state is an object with string keys"
// It's necessary because generic types (like T) are read-only by default, and you can't assign to T[key]
// By asserting it as a Record, we temporarily bypass that restriction so we can safely update the field
const updateObjectField = <T extends Record<string, any>>(
    state: T,
    field: string,
    unit: string,
    value: string
) => {
    (state as Record<string, any>)[field] = {
        ...state[field],
        [unit]: value,
    };
};

const updatePrimitiveField = <T extends Record<string, any>>(
    state: T,
    field: string,
    value: string
) => {
    (state as Record<string, any>)[field] = value;
};