const ADD_DAY = 'day/ADD_DAY'


const addDay = payload => ({
    type: ADD_DAY,
    payload
})

export const addOneDay = (payload) => async dispatch => {

    const response = await fetch(`/api/days/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json()

        await dispatch(addDay(data))
        return data;
    }
}

const initialState = { entries: [] }

const dayReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case ADD_DAY:
            newState = { ...state }

            return { ...newState }
        default:
            return state;
    }
}

export default dayReducer
