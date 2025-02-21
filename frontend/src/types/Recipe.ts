 export default interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags?: string[];
  hero_image: string;
  ingredients: string[];
  instructions: string[];
}