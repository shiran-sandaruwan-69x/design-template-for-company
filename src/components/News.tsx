import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "IntelleJ Launches New Cloud Security Solution",
    excerpt:
      "Our new cloud security platform offers enterprise-grade protection with AI-powered threat detection.",
    date: "June 15, 2023",
    category: "Product",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
  {
    id: 2,
    title: "IntelleJ Partners with Global Tech Leader",
    excerpt:
      "Strategic partnership aims to accelerate digital transformation for enterprise clients worldwide.",
    date: "May 28, 2023",
    category: "Business",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
  },
  {
    id: 3,
    title: "New Research on AI Implementation in Healthcare",
    excerpt:
      "Our research team has published findings on how AI is transforming patient care and medical diagnostics.",
    date: "May 10, 2023",
    category: "Research",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    id: 4,
    title: "IntelleJ Opens New Office in Singapore",
    excerpt:
      "Expanding our presence in Asia with a new regional headquarters to better serve our growing client base.",
    date: "April 22, 2023",
    category: "Company",
    image:
      "https://images.unsplash.com/photo-1565963925-b8ebb5a33cd4?w=800&q=80",
  },
  {
    id: 5,
    title: "Annual Tech Conference Announced for September",
    excerpt:
      "Join us for our biggest event of the year featuring industry experts and innovative technology showcases.",
    date: "April 5, 2023",
    category: "Event",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
  {
    id: 6,
    title: "IntelleJ Recognized as Industry Leader in IT Consulting",
    excerpt:
      "Prestigious industry award acknowledges our commitment to excellence and innovation in IT services.",
    date: "March 18, 2023",
    category: "Award",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
  },
];

export default function News() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Latest News</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest developments, announcements, and
            insights from IntelleJ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-primary/10 text-primary">
                    {item.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.date}
                  </span>
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <CardDescription>{item.excerpt}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button
                  variant="ghost"
                  className="group w-full justify-between"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
