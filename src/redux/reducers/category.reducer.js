// This reducer doesn't make any DB or API calls; it's being used
// to store global state of the currently selected Chore Category
    // default state is empty string, when user returns to HOME 
    // and unsets a chore category (so they can view ALL chores again)

    const categoryReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_CATEGORY':
            return action.payload;
        case 'UNSET_CATEGORY':
            return '';
        default:
            return state;
    }
}

export default categoryReducer;