import { motion } from "framer-motion";
import CSSEarthAnimation from "./CSSEarthAnimation";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center">
        <motion.h1
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          IntelleJ
        </motion.h1>

        <div className="w-64 h-64 mb-8">
          <CSSEarthAnimation />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-sm text-muted-foreground mt-2"
        >
          Loading amazing experiences...
        </motion.p>
      </div>
    </motion.div>
  );
}
