// rootReducer - функция reducer, initialState - начальное состояние
export function createStore(rootReducer, initialState) {
  let state = rootReducer(initialState, { type: "__INIT__" });
  const subscribers = [];

  return {
    // Метод dispatch говорит, что нужно что-то изменить
    // action === {type: '__INIT__'}
    dispatch(action) {
      state = rootReducer(state, action);
      subscribers.forEach((subscriber) => subscriber());
    },
    // subscribe Все слушатели, которые слушают объект, должны что-то поменять
    subscribe(callback) {
      subscribers.push(callback);
    },
    getState() {
      return state;
    },
  };
}
