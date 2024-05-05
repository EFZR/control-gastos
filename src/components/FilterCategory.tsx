import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import useBudget from "../hooks/useBudget";

export default function FilterCategory() {
  const { filterCategory } = useBudget();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    filterCategory(e.target.value);
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <form action="">
        <div className="flex flex-col md:flex-row md: items-center gap-5">
          <label htmlFor="filter">Filtro</label>
          <select
            id="filter"
            className="bg-slate-100 p-3 flex-1 rounded"
            onChange={handleChange}
          >
            <option value="">-- Todas las categorias --</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
