import { useState } from "react";
import { courses } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardNav from "@/components/DashboardNav";
import { t } from "@/lib/i18n";
import { useAuth } from "@/lib/auth-context";
import { Palette, BookOpen, Clock, Star, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function NonTechPaths() {
  const { language } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "UI/UX", "Arts", "Cooking", "Finance"];

  const filteredCourses = selectedCategory === "All"
    ? courses
    : courses.filter(c => c.category === selectedCategory);

  const recommendedCourses = courses.filter(c => c.rating >= 4.8).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav ageGroup="mid" />
      <main className="container py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
          <Palette className="h-8 w-8 text-primary" />
          {t(language, "courses.title")}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t(language, "courses.subtitle")}
        </p>

        {/* Recommended Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-accent" />
            {t(language, "courses.recommended")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedCourses.map(course => (
              <Card key={course.id} className="border-accent/30 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{course.category}</Badge>
                    <div className="flex items-center text-yellow-600 text-sm font-bold">
                      <Star className="h-4 w-4 fill-current mr-1" />
                      {course.rating}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center text-xs text-muted-foreground gap-3">
                    <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {course.duration}</span>
                    <span>{course.level}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => toast.success("Enrollment started!")}>{t(language, "courses.enroll")}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* All Courses with Filter */}
        <section>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <div className={`h-32 w-full ${course.image} flex items-center justify-center rounded-t-lg`}>
                   <BookOpen className="h-10 w-10 opacity-50" />
                </div>
                <CardHeader>
                   <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{course.category}</Badge>
                    <span className="text-xs text-muted-foreground">{course.provider}</span>
                  </div>
                  <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
                   <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {course.duration}</span>
                      <span className="flex items-center text-yellow-600"><Star className="h-3 w-3 fill-current mr-1" /> {course.rating}</span>
                   </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => toast.success("Detailed view coming soon!")}>{t(language, "courses.viewDetails")}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
