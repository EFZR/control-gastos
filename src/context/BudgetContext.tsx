import { useReducer, useMemo, createContext, ReactNode } from "react"
import { initialState, budgetReducer } from "../reducer/budget-reducer"

export type BudgetContextProps = {
  budget: number,
  isValidBudget: boolean,
  addBudget: (budget: number) => void
}

export const BudgetContext = createContext<BudgetContextProps>({
  budget: 0,
  isValidBudget: false,
  addBudget: () => { }
});

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  //#region State

  const [state, dispatch] = useReducer(budgetReducer, initialState)
  const isValidBudget = useMemo(() => state.budget > 0 && !isNaN(state.budget), [state.budget])

  //#endregion

  //#region Functions

  // set budget to state.
  const addBudget = (budget: number) => {
    dispatch({ type: "add-budget", payload: { budget } })
  }

  //#endregion

  //#region Return

  return (
    <BudgetContext.Provider value={{ budget: state.budget, isValidBudget, addBudget }}>
      {children}
    </BudgetContext.Provider>
  )

  //#endregion
}