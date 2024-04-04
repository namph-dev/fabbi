export interface IDish {
  id: number;
  name: string;
  restaurant: string;
  availableMeals: string[];
}

export interface ISelection {
  meal: string;
  numberOfPeople: number;
  restaurant: string;
  dishes: Array<{ name: string; servings: number }>;
}
