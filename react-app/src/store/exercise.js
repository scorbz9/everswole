const LOAD_EXERCISES = 'exercise/LOAD_EXERCISES'

const loadExercises = (payload) => ({
    type: LOAD_EXERCISES,
    payload
})

export const getAllExercises = () => async dispatch => {
    const response = await fetch(`/api/exercises/`)
    if (response.ok) {
        const data = await response.json()

        dispatch(loadExercises(data))
        return data
    }
}

const initialState = { entries: [] }

const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EXERCISES:
            return {...state, entries: [...action.payload.exercises]}
        default:
            return state;
    }
}

export default exerciseReducer
