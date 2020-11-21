export function createStore(rootReducer, initialState) {
  let state = rootReducer(initialState, "__INIT__");
  const subscribers = [];


  return {
    dispatch(action) {
      state = rootReducer(state, action);
      subscribers.forEach((sub) => sub());
    },
    subscribe(callback) {
      subscribers.push(callback);
      console.log(subscribers);
    },
    getState() {
      return state;
    }
  };
}
