import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: Array<UserType>, action: ActionType): Array<UserType> => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            const copyState = [...state]
            if (action.payload === 'up') {
                return copyState.sort((a, b) => a.name.localeCompare(b.name))
            } else {
                return copyState.sort((a, b) => b.name.localeCompare(a.name))
            }
        }
        case 'check': {
            const copyState = [...state]
            return copyState.filter( u => u.age >= 18)
        }
        default:
            return state
    }
}
