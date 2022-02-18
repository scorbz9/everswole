const LOAD_DAYS = 'day/LOAD_DAYS'
const ADD_DAY = 'day/ADD_DAY'


const getDays = (payload) => ({
    type: LOAD_DAYS,
    payload
})

const addDay = payload => ({
    type: ADD_DAY,
    payload
})

export const getAllDays = (userId) => async dispatch => {

    const response = await fetch(`/api/${userId}/days`)

    if (response.ok) {
        const data = await response.json()

        await dispatch(getDays(data))
        return data;
    }
}

export const addOneDay = (payload, userId) => async dispatch => {

    const response = await fetch(`/api/${userId}/days/`, {
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

        await dispatch(addDay(data))
        return data;
    }
}

const initialState = { entries: [] }

const dayReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_DAYS:
            return { ...state, entries: [...action.payload.days] }
        case ADD_DAY:
            return { ...state, entries: [...action.payload.days] }
        default:
            return state;
    }
}

export default dayReducer
