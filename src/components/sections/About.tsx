import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -z-10 top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-muted rounded-lg h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-muted rounded-lg h-40 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1581092921461-39b9d08a9b2a?w=500&q=80"
                    alt="Technology"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-muted rounded-lg h-40 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=500&q=80"
                    alt="Office space"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-muted rounded-lg h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80"
                    alt="IT professional"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About IntelleJ
              </h2>
              <div className="w-20 h-1.5 bg-primary rounded-full mb-6"></div>
            </div>

            <p className="text-muted-foreground">
              Founded in 2010, IntelleJ has been at the forefront of
              technological innovation, helping businesses transform their
              operations through cutting-edge IT solutions.
            </p>

            <p className="text-muted-foreground">
              Our team of experienced professionals is dedicated to delivering
              exceptional service and tailored solutions that address the unique
              challenges faced by our clients.
            </p>

            <div className="grid grid-cols-2 gap-6 my-8">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-primary">200+</h3>
                <p className="text-sm text-muted-foreground">
                  Projects Completed
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-primary">50+</h3>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-primary">12+</h3>
                <p className="text-sm text-muted-foreground">
                  Years Experience
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-primary">98%</h3>
                <p className="text-sm text-muted-foreground">
                  Client Satisfaction
                </p>
              </div>
            </div>

            <Button size="lg">Learn More About Us</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
