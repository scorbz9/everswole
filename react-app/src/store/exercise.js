const LOAD_EXERCISES = 'exercise/LOAD_EXERCISES'
const ADD_EXERCISE = 'exercise/ADD_EXERCISE'
const EDIT_EXERCISE = 'exercise/EDIT_EXERCISE'
const DELETE_EXERCISE = 'exercise/DELETE_EXERCISE'

const loadExercises = (payload) => ({
    type: LOAD_EXERCISES,
    payload
})

const addExercise = payload => ({
    type: ADD_EXERCISE,
    payload
})

const editExercise = payload => ({
    type: EDIT_EXERCISE,
    payload
})

const deleteExercise = payload => ({
    type: DELETE_EXERCISE,
    payload
})

export const getAllExercises = (userId) => async dispatch => {
    const response = await fetch(`/api/${userId}/exercises/`)
    if (response.ok) {
        const data = await response.json()

        dispatch(loadExercises(data))
        return data
    }
}

export const addOneExercise = (payload, userId) => async dispatch => {

    const response = await fetch (`/api/${userId}/exercises/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json()

    if (data.errors) {
        return data;
    } else {

        await dispatch(addExercise(data))
        return data;
    }
}

export const editOneExercise = (payload, userId) => async dispatch => {

    const response = await fetch(`/api/${userId}/exercises/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json()

    if (data.errors) {

        return data;
    } else {

        await dispatch(editExercise(data))
        return data;
    }
}

export const deleteOneExercise = (payload, userId) => async dispatch => {

    const response = await fetch (`/api/${userId}/exercises/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json()

    if (data.errors) {

        return data;
    } else {

        await dispatch(deleteExercise(data))
        return data;
    }
}

const initialState = { entries: [] }

const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EXERCISES:
            return {...state, entries: [...action.payload.exercises]}
        case ADD_EXERCISE:
            return {...state, entries: [...action.payload.exercises]}
        case EDIT_EXERCISE:
            return {...state, entries: [...action.payload.exercises]}
        case DELETE_EXERCISE:
            return {...state, entries: [...action.payload.exercises]}
        default:
            return state;
    }
}

export default exerciseReducer;
