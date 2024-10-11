export function builderReducer(currentGameState, payload) {
  if (payload.action === "selectFeature") {
    return {...currentGameState, activeFeature: payload.newFeature};
  } else {
    console.log(`unknown action: ${payload.action}`);
    return currentGameState;
  }
}

// when drop a number start or exit on the board, update remaining limited features in the state
