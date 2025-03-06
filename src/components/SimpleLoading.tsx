import { motion } from "framer-motion";

export default function SimpleLoading({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative w-32 h-32 mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-24 w-24 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/logo.svg" alt="IntelleJ Logo" className="h-12" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-primary mb-2">IntelleJ</h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-sm text-muted-foreground"
      >
        Loading amazing experiences...
      </motion.p>
    </div>
  );
}
