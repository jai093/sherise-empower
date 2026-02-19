import { useState } from "react";
import { jobs } from "@/data/jobs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardNav from "@/components/DashboardNav";
import { t } from "@/lib/i18n";
import { useAuth } from "@/lib/auth-context";
import { Briefcase, MapPin, Clock, Building, Star, Search } from "lucide-react";

export default function JobSearch() {
  const { language } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [scheduleFilter, setScheduleFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    const matchesSchedule = scheduleFilter === "all" || job.schedule === scheduleFilter;
    const matchesRating = ratingFilter === "all" || job.diversityRating >= parseFloat(ratingFilter);

    return matchesSearch && matchesType && matchesSchedule && matchesRating;
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav ageGroup="mid" />
      <main className="container py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
          <Briefcase className="h-8 w-8 text-primary" />
          {t(language, "jobs.title")}
        </h1>

        <div className="bg-card p-6 rounded-lg shadow-sm border mb-8 space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t(language, "jobs.searchPlaceholder")}
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t(language, "jobs.filterType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t(language, "jobs.allTypes")}</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="Onsite">Onsite</SelectItem>
              </SelectContent>
            </Select>

            <Select value={scheduleFilter} onValueChange={setScheduleFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t(language, "jobs.filterSchedule")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t(language, "jobs.allSchedules")}</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
              </SelectContent>
            </Select>

            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t(language, "jobs.filterRating")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t(language, "jobs.allRatings")}</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                      <div className="flex items-center text-muted-foreground text-sm gap-2">
                        <Building className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs font-medium">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {job.diversityRating}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3 mb-4 text-sm">
                    <span className="flex items-center px-2 py-1 bg-secondary rounded-md">
                      <MapPin className="h-3 w-3 mr-1" /> {job.location}
                    </span>
                    <span className="flex items-center px-2 py-1 bg-secondary rounded-md">
                      <Clock className="h-3 w-3 mr-1" /> {job.schedule}
                    </span>
                    <span className="flex items-center px-2 py-1 bg-secondary rounded-md">
                      {job.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{job.postedAt}</span>
                  <Button size="sm">{t(language, "jobs.apply")}</Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              {t(language, "jobs.noResults")}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
