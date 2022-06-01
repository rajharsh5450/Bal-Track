import React, { useReducer, createContext } from "react";

import contextReducer from "./contextReducer";
import { REMOVE, ADD } from "../constants/constant";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [
  {
    amount: 75,
    category: "Pets",
    type: "Expense",
    date: "2022-06-06",
    id: "f7e1fe3e-8176-4b7e-a1f7-8d393a1c34c4",
  },
  {
    amount: 25,
    category: "Car",
    type: "Expense",
    date: "2022-06-03",
    id: "4ad20eb6-4886-4054-a82d-82fd694973d1",
  },
  {
    amount: 50,
    category: "Investments",
    type: "Income",
    date: "2022-06-03",
    id: "c75e0a21-839f-44f8-883b-4e33802e49d9",
  },
  {
    amount: 100,
    category: "Salary",
    type: "Income",
    date: "2022-06-06",
    id: "3544bd49-4362-4554-9b19-713c6f936408",
  },
];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);
  const balance = transactions.reduce(
    (sum, cur) =>
      cur.type === "Expense" ? sum - cur.amount : sum + cur.amount,
    0
  );

  //Action Creators
  const removeTransaction = (id) => dispatch({ type: REMOVE, payload: id });
  const addTransaction = (transaction) =>
    dispatch({ type: ADD, payload: transaction });

  return (
    <ExpenseTrackerContext.Provider
      value={{ removeTransaction, addTransaction, transactions, balance }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
