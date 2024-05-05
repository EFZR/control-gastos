import { useReducer, createContext, ReactNode, useMemo } from "react";
import { initialState, budgetReducer } from "../reducer/budget-reducer";
import { DraftExpense, Expense, Category } from "../types";

export type BudgetContextProps = {
  budget: number;
  addBudget: (budget: number) => void;
  modal: boolean;
  showModal: () => void;
  closeModal: () => void;
  expenses: Expense[];
  editingId: Expense["id"];
  addExpense: (expense: DraftExpense) => void;
  getExpenseById: (id: Expense["id"]) => void;
  updateExpense: (expense: Expense) => void;
  removeExpense: (id: Expense["id"]) => void;
  resetApp: () => void;
  currentCategory: Category["id"];
  filterCategory: (id: Category["id"]) => void;
  totalExpenses: number;
  remainingBudget: number;
};

export const BudgetContext = createContext<BudgetContextProps>({
  budget: 0,
  addBudget: () => {},
  modal: false,
  showModal: () => {},
  closeModal: () => {},
  expenses: [],
  editingId: "",
  addExpense: () => {},
  getExpenseById: () => {},
  updateExpense: () => {},
  removeExpense: () => {},
  resetApp: () => {},
  currentCategory: "",
  filterCategory: () => {},
  totalExpenses: 0,
  remainingBudget: 0,
});

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  //#region State

  const [state, dispatch] = useReducer(budgetReducer, initialState);
  const totalExpenses = useMemo(
    () => state.expenses.reduce((acc, exp) => acc + exp.amount, 0),
    [state.expenses]
  );
  const remainingBudget = useMemo(
    () => state.budget - totalExpenses,
    [state.expenses, state.budget]
  );

  //#endregion

  //#region Functions

  // set budget to state.
  function addBudget(budget: number) {
    dispatch({ type: "add-budget", payload: { budget } });
  }

  // show modal.
  function showModal() {
    dispatch({ type: "show-modal" });
  }

  // close modal.
  function closeModal() {
    dispatch({ type: "close-modal" });
  }

  // add expense to state.
  function addExpense(expense: DraftExpense) {
    dispatch({ type: "add-expense", payload: { expense } });
  }

  // get expense by id.
  function getExpenseById(id: Expense["id"]) {
    dispatch({ type: "get-expense-by-id", payload: { id } });
  }

  // update expense.
  function updateExpense(expense: Expense) {
    dispatch({ type: "update-expense", payload: { expense } });
  }

  // remove expense from state.
  function removeExpense(id: Expense["id"]) {
    dispatch({ type: "remove-expense", payload: { id } });
  }

  // reset app.
  function resetApp() {
    dispatch({ type: "reset-app" });
  }

  // Filter by category.
  function filterCategory(id: Category["id"]) {
    dispatch({ type: "filter-category", payload: { id } });
  }

  //#endregion

  //#region Return

  return (
    <BudgetContext.Provider
      value={{
        budget: state.budget,
        addBudget,
        modal: state.modal,
        showModal,
        closeModal,
        expenses: state.expenses,
        editingId: state.editingId,
        addExpense,
        getExpenseById,
        updateExpense,
        removeExpense,
        resetApp,
        filterCategory,
        currentCategory: state.currentCategory,
        totalExpenses,
        remainingBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );

  //#endregion
};
