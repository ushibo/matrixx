const ACTION_SEND = "SEND";
const ACTION_SET_USER = 'SET_USER';
const ACTION_CHANGE_TEXT = 'CHANGE_TEXT';

export default (state = {}, action) => {
  switch (action.type) {
    case `${ACTION_SEND}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        isSendCompleted: true,
      };
    case `${ACTION_SEND}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${ACTION_SEND}_REJECTED`:
      return {
        ...state,
        isFetching: false,
      };
    case ACTION_SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case ACTION_CHANGE_TEXT:
      return {
        ...state,
        text: action.payload,
      };
    default:
      return state
  }
};