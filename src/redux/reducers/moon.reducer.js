const moonReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MOON':
            return action.payload;
        default:
            return state;
    }
};

export default moonReducer;