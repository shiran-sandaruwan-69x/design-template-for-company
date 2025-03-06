import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

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

// Duplicate logos for seamless infinite scroll
const duplicatedLogos = [...logos, ...logos];

export default function LogoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        // Reset scroll position when it reaches the end to create infinite effect
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            We've helped companies of all sizes achieve their technology goals
          </motion.p>
        </div>
      </div>

      {/* First carousel - moving left */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
            repeatType: "loop",
          }}
          className="flex items-center space-x-12 whitespace-nowrap"
        >
          {duplicatedLogos.map((item, index) => (
            <div
              key={`logo-1-${index}`}
              className="flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                <img
                  src={item.logo}
                  alt={`${item.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-2 text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Second carousel - moving right (opposite direction) */}
      <div className="relative w-full overflow-hidden mt-8">
        <motion.div
          initial={{ x: "-50%" }}
          animate={{ x: 0 }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
            repeatType: "loop",
          }}
          className="flex items-center space-x-12 whitespace-nowrap"
        >
          {duplicatedLogos.reverse().map((item, index) => (
            <div
              key={`logo-2-${index}`}
              className="flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                <img
                  src={item.logo}
                  alt={`${item.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-2 text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
