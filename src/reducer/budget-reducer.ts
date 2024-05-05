import { v4 as uuidv4 } from "uuid";
import { Category, DraftExpense, Expense } from "../types";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "close-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } }
  | { type: "get-expense-by-id"; payload: { id: Expense["id"] } }
  | { type: "update-expense"; payload: { expense: Expense } }
  | { type: "remove-expense"; payload: { id: Expense["id"] } }
  | { type: "reset-app" }
  | { type: "filter-category"; payload: { id: Category["id"] } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
  currentCategory: Category["id"];
};

function getExpensesLocalStorage(): Expense[] {
  const expenses = localStorage.getItem("expenses");
  return expenses ? JSON.parse(expenses) : [];
}

function getBudgetLocalStorage(): number {
  const budget = localStorage.getItem("budget");
  return budget ? JSON.parse(budget) : 0;
}

export const initialState: BudgetState = {
  budget: getBudgetLocalStorage(),
  modal: false,
  expenses: getExpensesLocalStorage(),
  editingId: "",
  currentCategory: "",
};

function createExpense(draftExpense: DraftExpense): Expense {
  return {
    ...draftExpense,
    id: uuidv4(),
  };
}

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }

  if (action.type === "show-modal") {
    return {
      ...state,
      modal: true,
    };
  }

  if (action.type === "close-modal") {
    return {
      ...state,
      modal: false,
      editingId: "",
    };
  }

  if (action.type === "add-expense") {
    const expense = createExpense(action.payload.expense);
    return {
      ...state,
      modal: false,
      expenses: [...state.expenses, expense],
    };
  }

  if (action.type === "get-expense-by-id") {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    };
  }

  if (action.type === "update-expense") {
    const updatedExpenses = state.expenses.map((exp) => {
      if (exp.id === action.payload.expense.id) {
        return action.payload.expense;
      }
      return exp;
    });

    return {
      ...state,
      expenses: updatedExpenses,
      modal: false,
      editingId: "",
    };
  }

  if (action.type === "remove-expense") {
    const updatedExpenses: Expense[] = state.expenses.filter(
      (expense) => expense.id !== action.payload.id
    );

    return {
      ...state,
      expenses: updatedExpenses,
    };
  }

  if (action.type === "reset-app") {
    return {
      ...state,
      budget: 0,
      expenses: [],
      currentCategory: "",
    };
  }

  if (action.type === "filter-category") {
    return {
      ...state,
      currentCategory: action.payload.id,
    };
  }

  return state;
};
