// Custom Hook for displaying the data in chart
import { useContext } from "react";

import {
  expenseCategories,
  incomeCategories,
  resetCategories,
} from "./constants/categories";
import { ExpenseTrackerContext } from "./context/context";

const useTransactions = (title) => {
  resetCategories();

  const { transactions } = useContext(ExpenseTrackerContext);
  const transactionsPerTitle = transactions.filter((t) => t.type === title);
  const total = transactionsPerTitle.reduce(
    (sum, cur) => sum + Number(cur.amount),
    0
  );
  const categories = title === "Income" ? incomeCategories : expenseCategories;

  transactionsPerTitle.forEach((t) => {
    const category = categories.find((c) => c.type === t.category);
    if (category) category.amount += t.amount;
  });

  const finalCategories = categories.filter((c) => c.amount > 0);

  return { finalCategories, total };
};

export default useTransactions;
