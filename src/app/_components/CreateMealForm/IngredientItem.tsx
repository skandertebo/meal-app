import { IngredientDto } from "@/services/mealservice/dto/listIngredientDto";
import SearchSelect from "../SearchSelect";

export interface IngredientItemProps {
  onNameChange: (name: string) => void;
  onAmountChange: (amount: string) => void;
  onUnitChange: (unit: string) => void;
  onDelete: () => void;
  name: string;
  amount: string;
  unit: string;
  ingredientOptions: IngredientDto[];
}

const IngredientItem: React.FC<IngredientItemProps> = ({
  onNameChange,
  onAmountChange,
  onUnitChange,
  onDelete,
  name,
  amount,
  unit,
  ingredientOptions,
}) => {
  return (
    <div className="flex flex-wrap justify-between gap-1 gap-y-2 rounded-md border px-2 py-1.5 sm:px-5">
      <SearchSelect
        value={name}
        onChange={(val) => onNameChange(val)}
        placeholder="Ingredient Name"
        items={ingredientOptions.map((ingredient) => ingredient.strIngredient)}
      />
      <input
        type="text"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        placeholder="Amount"
        className="rounded-md border border-gray-300 px-2 py-1.5"
      />
      <input
        type="text"
        value={unit}
        onChange={(e) => onUnitChange(e.target.value)}
        placeholder="Unit"
        className="rounded-md border border-gray-300 px-2 py-1.5"
      />
      <button
        onClick={() => onDelete()}
        type="button"
        className="rounded-md border border-gray-300 bg-red-500 px-2 py-0.5 text-white"
      >
        Remove
      </button>
    </div>
  );
};

export default IngredientItem;
