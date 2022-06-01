//Reducer => takes an old state and an action and returns the new state
import { REMOVE, ADD } from "../constants/constant";

const contextReducer = (state, action) => {
  let transactions;

  switch (action.type) {
    case REMOVE:
      transactions = state.filter((t) => t.id !== action.payload);
      localStorage.setItem("transactions", JSON.stringify(transactions));

      return transactions;

    case ADD:
      transactions = [action.payload, ...state];
      localStorage.setItem("transactions", JSON.stringify(transactions));

      return transactions;

    default:
      return state;
  }
};

export default contextReducer;
