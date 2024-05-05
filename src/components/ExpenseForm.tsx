import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import useBudget from "../hooks/useBudget";
import ErrorMessage from "./ErrorMessage";
import { categories } from "../data/categories";
import type { DraftExpense, Value } from "../types";

export default function ExpenseForm() {
  //#region States

  const { addExpense, updateExpense, editingId, expenses, remainingBudget } =
    useBudget();

  const [expense, setExpense] = useState<DraftExpense>({
    expenseName: "",
    amount: 0,
    category: "",
    date: new Date(),
  });

  const [error, setError] = useState<string>("");

  const [prevAmount, setPrevAmount] = useState<number>(0);

  useEffect(() => {
    if (editingId) {
      const updateExpense = expenses.filter((exp) => exp.id === editingId)[0];
      setExpense(updateExpense);
      setPrevAmount(updateExpense.amount);
    }
  }, [editingId]);

  //#endregion

  //#region Functions

  function handleChangeInput(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    const { value, name } = e.target;
    const isAmountField = ["amount"].includes(name);
    setExpense({ ...expense, [e.target.name]: isAmountField ? +value : value });
  }

  function handleChangeDate(e: Value) {
    setExpense({ ...expense, date: e });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validacion
    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (expense.amount - prevAmount > remainingBudget) {
      setError("No puedes exceder el presupuesto total");
      return;
    }

    // Agregar o actulizar gasto
    if (editingId) {
      updateExpense({ ...expense, id: editingId });
    } else {
      addExpense(expense);
    }

    // Reiniciar los states
    setExpense({
      expenseName: "",
      amount: 0,
      category: "",
      date: new Date(),
    });
    setError("");
  }

  //#endregion

  //#region Return

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {editingId ? "Guardar Cambios" : "Nuevo Gasto"}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añande el nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          autoComplete="off"
          value={expense.expenseName}
          onChange={handleChangeInput}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Añande la cantidad del gasto: ej. 1000"
          className="bg-slate-100 p-2"
          name="amount"
          autoComplete="off"
          value={expense.amount}
          onChange={handleChangeInput}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          autoComplete="off"
          value={expense.category}
          onChange={handleChangeInput}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl">Fecha Gastos:</label>
        <DatePicker
          className="bg-slate-100 p-2 border-0"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={editingId ? "Guardar Cambios" : "Agregar Gasto"}
      />
    </form>
  );

  //#endregion
}
