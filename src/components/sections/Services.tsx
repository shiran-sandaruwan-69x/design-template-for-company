import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code,
  Database,
  Globe,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";

const services = [
  {
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies.",
    icon: <Globe className="h-10 w-10" />,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications for iOS and Android.",
    icon: <Smartphone className="h-10 w-10" />,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Cloud Services",
    description: "Scalable cloud infrastructure and migration services.",
    icon: <Database className="h-10 w-10" />,
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    title: "Cybersecurity",
    description:
      "Comprehensive security solutions to protect your digital assets.",
    icon: <Shield className="h-10 w-10" />,
    color: "bg-red-500/10 text-red-500",
  },
  {
    title: "Custom Software",
    description:
      "Tailored software solutions designed for your specific business needs.",
    icon: <Code className="h-10 w-10" />,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    title: "IT Consulting",
    description:
      "Strategic technology consulting to optimize your business operations.",
    icon: <Zap className="h-10 w-10" />,
    color: "bg-indigo-500/10 text-indigo-500",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive range of IT services to help your business
            thrive in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index}>
              <Card className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/20">
                <CardHeader>
                  <div
                    className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}
                  >
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Customized solutions
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Expert team
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Ongoing support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="group w-full justify-between"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
