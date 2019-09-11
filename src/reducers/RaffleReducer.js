const RaffleReducer = (state, action) => {
  switch (action.type) {
    case "SET_URL_NAME":
      return {
        ...state,
        urlName: action.urlName
      };

    case "SET_EVENT_ID":
      return {
        ...state,
        eventId: action.eventId
      };

    case "SET_GROUPS":
      return {
        ...state,
        groups: action.groups
      };
    case "SET_EVENTS":
      return {
        ...state,
        events: action.events
      };
    case "SET_ATTENDANCE_LIST":
      return {
        ...state,
        attendanceList: action.attendanceList
      };

    case "SET_SIZE_ROULETTE":
      return {
        ...state,
        sizeRoulette: action.sizeRoulette
      };

    case "SET_STATUS_MESSAGE":
      return {
        ...state,
        statusMessage: action.statusMessage
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading
      };

    default:
      return {
        ...state
      };
  }
};

export default RaffleReducer;
