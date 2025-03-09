interface LogoItem {
  name: string;
  logo: string;
}

const logos: LogoItem[] = [
  {
    name: "Microsoft",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=MS&backgroundColor=0052cc",
  },
  {
    name: "Google",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=G&backgroundColor=ea4335",
  },
  {
    name: "Amazon",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=AMZ&backgroundColor=ff9900",
  },
  {
    name: "Apple",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=A&backgroundColor=000000",
  },
  {
    name: "IBM",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=IBM&backgroundColor=006699",
  },
  {
    name: "Oracle",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=ORC&backgroundColor=f80000",
  },
  {
    name: "Intel",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=INT&backgroundColor=0071c5",
  },
  {
    name: "Samsung",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=SG&backgroundColor=1428a0",
  },
  {
    name: "Tesla",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TS&backgroundColor=cc0000",
  },
  {
    name: "Nvidia",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=NV&backgroundColor=76b900",
  },
];

export default function LogoCarousel() {
  return (
    <div className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've helped companies of all sizes achieve their technology goals
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex items-center space-x-16 whitespace-nowrap justify-center flex-wrap gap-8 px-4">
          {logos.map((item, index) => (
            <div
              key={`logo-${index}`}
              className="flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden bg-muted/50 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <img
                  src={item.logo}
                  alt={`${item.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-3 text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
