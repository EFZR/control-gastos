import { useMemo } from "react";
import useBudget from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {
  const { expenses, currentCategory } = useBudget();

  const filteredExpenses = useMemo(
    () =>
      currentCategory !== ""
        ? expenses.filter((exp) => exp.category === currentCategory)
        : expenses,
    [currentCategory, expenses]
  );

  const isEmpty = useMemo(() => filteredExpenses.length === 0, [expenses]);

  return (
    <div className="mt-10">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">No Hay Gastos</p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5">
            Listado de Gastos.
          </p>
          {filteredExpenses.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
}
