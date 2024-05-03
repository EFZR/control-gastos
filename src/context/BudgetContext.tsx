import { useReducer, useMemo, createContext, ReactNode } from "react";
import { initialState, budgetReducer } from "../reducer/budget-reducer";
import type { DraftExpense, Expense } from "../types";

export type BudgetContextProps = {
  budget: number;
  isValidBudget: boolean;
  addBudget: (budget: number) => void;
  modal: boolean;
  showModal: () => void;
  closeModal: () => void;
  expenses: Expense[];
  addExpense: (expense: DraftExpense) => void;
};

export const BudgetContext = createContext<BudgetContextProps>({
  budget: 0,
  isValidBudget: false,
  addBudget: () => {},
  modal: false,
  showModal: () => {},
  closeModal: () => {},
  expenses: [],
  addExpense: () => {},
});

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  //#region State

  const [state, dispatch] = useReducer(budgetReducer, initialState);
  const isValidBudget = useMemo(
    () => state.budget > 0 && !isNaN(state.budget),
    [state.budget]
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

  //#endregion

  //#region Return

  return (
    <BudgetContext.Provider
      value={{
        budget: state.budget,
        isValidBudget,
        addBudget,
        modal: state.modal,
        showModal,
        closeModal,
        expenses: state.expenses,
        addExpense,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );

  //#endregion
};
