export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Remote" | "Hybrid" | "Onsite";
  schedule: "Full-time" | "Part-time";
  diversityRating: number; // 1-5
  description: string;
  postedAt: string;
}

export const jobs: Job[] = [
  {
    id: "1",
    title: "Senior UX Researcher",
    company: "TechInclusive",
    location: "Remote",
    type: "Remote",
    schedule: "Full-time",
    diversityRating: 4.8,
    description: "We are looking for an experienced UX Researcher to help us understand user needs. TechInclusive is committed to building a diverse and inclusive workplace.",
    postedAt: "2 days ago",
  },
  {
    id: "2",
    title: "Content Writer",
    company: "Creative Minds",
    location: "Bangalore, India",
    type: "Hybrid",
    schedule: "Part-time",
    diversityRating: 4.5,
    description: "Join our creative team to write compelling content for our blog and social media. Flexible hours available.",
    postedAt: "1 week ago",
  },
  {
    id: "3",
    title: "Customer Support Specialist",
    company: "GlobalConnect",
    location: "Remote",
    type: "Remote",
    schedule: "Part-time",
    diversityRating: 4.2,
    description: "Assist customers with their inquiries. Perfect for those looking for flexible, remote work.",
    postedAt: "3 days ago",
  },
  {
    id: "4",
    title: "Frontend Developer",
    company: "WebSolutions",
    location: "Pune, India",
    type: "Onsite",
    schedule: "Full-time",
    diversityRating: 4.0,
    description: "Develop responsive web applications using React and TypeScript.",
    postedAt: "5 days ago",
  },
  {
    id: "5",
    title: "HR Manager",
    company: "PeopleFirst",
    location: "Mumbai, India",
    type: "Hybrid",
    schedule: "Full-time",
    diversityRating: 4.9,
    description: "Lead our HR initiatives with a focus on diversity and inclusion strategies.",
    postedAt: "1 day ago",
  },
];
