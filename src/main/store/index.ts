import { createStore } from "redux";
import { StoreActions } from "./actions";

interface IStore {
  num: number;
}

const initialState: IStore = {
  num: 10
};

const store = createStore(
  (state: IStore = initialState, action: StoreActions) => {
    switch (action.type) {
      case "INCREMENT": {
        return {
          ...state,
          num: state.num + 1
        };
      }
      case "DECREMENT": {
        return {
          ...state,
          num: state.num - 1
        };
      }
      case "SET": {
        return {
          ...state,
          num: action.num
        };
      }
      default:
        return state;
    }
  }
);

// store.subscribe(() => console.log(store.getState()));

// store.dispatch({ type: "INCREMENT" });
// store.dispatch({ type: "DECREMENT" });
// store.dispatch({ type: "SET", num: 42 });

export default store;
