export interface Course {
  id: string;
  title: string;
  category: "UI/UX" | "Arts" | "Cooking" | "Finance";
  provider: string;
  rating: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  image: string; // Placeholder color or URL
}

export const courses: Course[] = [
  {
    id: "1",
    title: "Introduction to User Experience Design",
    category: "UI/UX",
    provider: "Coursera",
    rating: 4.8,
    duration: "4 weeks",
    level: "Beginner",
    description: "Learn the basics of UX research and design thinking.",
    image: "bg-blue-100 text-blue-600",
  },
  {
    id: "2",
    title: "Modern Art History",
    category: "Arts",
    provider: "Udemy",
    rating: 4.5,
    duration: "6 weeks",
    level: "Beginner",
    description: "Explore the evolution of art in the modern era.",
    image: "bg-purple-100 text-purple-600",
  },
  {
    id: "3",
    title: "Mastering Indian Cuisine",
    category: "Cooking",
    provider: "Skillshare",
    rating: 4.9,
    duration: "2 weeks",
    level: "Intermediate",
    description: "Learn authentic Indian recipes from top chefs.",
    image: "bg-orange-100 text-orange-600",
  },
  {
    id: "4",
    title: "Personal Finance 101",
    category: "Finance",
    provider: "Khan Academy",
    rating: 4.7,
    duration: "3 weeks",
    level: "Beginner",
    description: "Manage your money, save, and invest wisely.",
    image: "bg-green-100 text-green-600",
  },
  {
    id: "5",
    title: "Advanced Figma Prototyping",
    category: "UI/UX",
    provider: "Udemy",
    rating: 4.6,
    duration: "5 weeks",
    level: "Advanced",
    description: "Create interactive high-fidelity prototypes.",
    image: "bg-pink-100 text-pink-600",
  },
  {
    id: "6",
    title: "Financial Planning for Women",
    category: "Finance",
    provider: "WomenWhoMoney",
    rating: 4.9,
    duration: "4 weeks",
    level: "Intermediate",
    description: "Tailored financial advice for women's life stages.",
    image: "bg-emerald-100 text-emerald-600",
  },
];
