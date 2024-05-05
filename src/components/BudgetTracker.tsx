import { useMemo } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import useBudget from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css";

export default function BudgetTracker() {
  const { budget, totalExpenses, remainingBudget, resetApp } = useBudget();
  const percetage = useMemo(
    () => +((totalExpenses / budget) * 100).toFixed(2),
    [totalExpenses, budget]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percetage}
          styles={buildStyles({
            pathColor: percetage === 100 ? "#DC2626" : "#3B82F6",
            textColor: percetage === 100 ? "#DC2626" : "#3B82F6" ,
            trailColor: "#F5F5F5",
          })}
          text={`${percetage}%`}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
          type="button"
          onClick={resetApp}
        >
          Resetear Ppp
        </button>

        <AmountDisplay label="Presupuesto" amount={budget} />

        <AmountDisplay label="Disponible" amount={remainingBudget} />

        <AmountDisplay label="Gastado" amount={totalExpenses} />
      </div>
    </div>
  );
}
