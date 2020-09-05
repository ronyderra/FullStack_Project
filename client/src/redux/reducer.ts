import { AppState } from "./app-state";
import { Action } from "./action";
import { ActionType } from "./action-type";

export default function reduce(oldAppState: AppState, action: Action): AppState {

    const newAppState = { ...oldAppState }; // Duplicate the old state into a new state.

    switch (action.type) {

        case ActionType.GetAllVacations:
            newAppState.vacations = action.payload;
            break;

        case ActionType.AddVacation:
            newAppState.vacations = [...newAppState.vacations]
            newAppState.vacations.push(action.payload);
             
            break;

        case ActionType.DeleteVacation:
            newAppState.vacations = [...newAppState.vacations].filter(v => v.id !== action.payload)
            break;

        case ActionType.UpdateVacation:
            newAppState.vacations = [...newAppState.vacations].map((v) => {
                const val = action.payload.update;
                
                if (v.id !== Number(action.payload.id)) return v;
                return {
                    ...v,
                    ...val
                }
            })

            break;

        default: break;
    }

    return newAppState;
}