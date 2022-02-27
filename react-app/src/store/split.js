const LOAD_SPLITS = 'split/LOAD_SPLITS'
const ADD_SPLIT = 'split/ADD_SPLIT'
const EDIT_SPLIT = 'split/EDIT_SPLIT'
const DELETE_SPLIT = 'split/DELETE_DAY'

const getSplits = payload => ({
    type: LOAD_SPLITS,
    payload
})

const addSplit = payload => ({
    type: ADD_SPLIT,
    payload
})

const editSplit = payload => ({
    type: EDIT_SPLIT,
    payload
})

const deleteSplit = payload => ({
    type: DELETE_SPLIT,
    payload
})

export const getAllSplits = userId => async dispatch => {

    const response = await fetch(`/api/${userId}/splits/`)

    if (response.ok) {
        const data = await response.json()

        await dispatch(getSplits(data))
        return data;
    }
}

export const addOneSplit = (payload, userId) => async dispatch => {

    const response = await fetch(`/api/${userId}/splits/`, {
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

        await dispatch(addSplit(data))
        return data;
    }
}

export const editOneSplit = (payload, userId, splitId) => async dispatch => {

    const response = await fetch(`/api/${userId}/splits/${splitId}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json()

    if (data.errors) {

        return data;
    } else {

        await dispatch(editSplit(data))
        return data;
    }
}

export const deleteOneSplit = (userId, splitId) => async dispatch => {

    const response = await fetch(`/api/${userId}/splits/${splitId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify()
    });

    const data = await response.json()

    if (data.errors) {

        return data;
    } else {

        await dispatch(deleteSplit(data))
        return data;
    }
}

const initialState = { entries: [] }

const splitReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_SPLITS:
            return { ...state, entries: [...action.payload.splits] }
        case ADD_SPLIT:
            return { ...state, entries: [...action.payload.splits] }
        case EDIT_SPLIT:
            return { ...state, entries: [...action.payload.splits] }
        case DELETE_SPLIT:
            return { ...state, entries: [...action.payload.splits] }
        default:
            return state;
    }
}
export default splitReducer
