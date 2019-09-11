const RouletteReducer = (state, action) => {
  switch (action.type) {
    case "SET_INDEX_ROULETTE":
      return {
        ...state,
        indexRoulette: action.indexRoulette
      };

    case "SET_RUNNING_TIME":
      return {
        ...state,
        runningTime: action.runningTime
      };

    case "SET_SUSPENSE_TIME":
      return {
        ...state,
        suspenseTime: action.suspenseTime
      };

    case "SET_SUSPENSE":
      return {
        ...state,
        suspense: action.suspense
      };
    case "SET_INDEX_WINNER":
      return {
        ...state,
        indexWinner: action.indexWinner
      };
    case "SET_WINNER":
      return {
        ...state,
        winner: action.winner
      };
    case "SET_END_GAME":
      return {
        ...state,
        endGame: action.endGame
      };
    case "SET_ROULETTE":
      return {
        ...state,
        roulette: action.roulette
      };

    default:
      return {
        ...state
      };
  }
};

export default RouletteReducer;
