import { useState, useMemo, ChangeEvent, FormEvent } from "react";
import useBudget from "../hooks/useBudget";

export default function BudgetForm() {
  //#region States

  const { addBudget } = useBudget();
  const [budget, setBudget] = useState(0);
  const isValidBudget = useMemo(() => budget > 0 && !isNaN(budget), [budget]);

  //#endregion

  //#region Functions

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    // TODO: Find a better way to handle this.
    if (isNaN(e.target.valueAsNumber)) return;
    setBudget(e.target.valueAsNumber);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addBudget(budget);
  }

  //#endregion

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir presupuesto
        </label>
        <input
          id="budget"
          type="number"
          className="w-full bg-white border border-gray-200 p-2"
          placeholder="Ejemplo: 3000"
          name="budget"
          value={budget}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value="Definir presupuesto"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-50 disabled:cursor-default"
        disabled={!isValidBudget}
      />
    </form>
  );
}
