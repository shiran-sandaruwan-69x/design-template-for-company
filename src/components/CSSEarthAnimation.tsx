import { motion } from "framer-motion";

export default function CSSEarthAnimation({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center ${className}`}
    >
      {/* Main globe */}
      <div className="relative w-40 h-40">
        {/* Earth sphere */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {/* Continents */}
          <div className="absolute w-12 h-8 bg-emerald-400 rounded-full top-6 left-6 opacity-80"></div>
          <div className="absolute w-16 h-10 bg-emerald-400 rounded-full top-16 left-20 opacity-80"></div>
          <div className="absolute w-10 h-6 bg-emerald-400 rounded-full top-24 left-8 opacity-80"></div>
          <div className="absolute w-14 h-8 bg-emerald-400 rounded-full bottom-10 right-8 opacity-80"></div>
          <div className="absolute w-8 h-8 bg-emerald-400 rounded-full bottom-6 left-14 opacity-80"></div>
        </motion.div>

        {/* Orbit rings */}
        <div className="absolute inset-[-15px] border-2 border-white/20 rounded-full"></div>
        <motion.div
          className="absolute inset-[-30px] border-2 border-white/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        ></motion.div>

        {/* Satellites */}
        <motion.div
          className="absolute w-3 h-3 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: "center center",
            left: "calc(50% - 1.5px)",
            top: "calc(50% - 1.5px)",
            transform: "translateX(-30px) translateY(-30px)",
          }}
        />

        <motion.div
          className="absolute w-2 h-2 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: "center center",
            left: "calc(50% - 1px)",
            top: "calc(50% - 1px)",
            transform: "translateX(40px) translateY(40px)",
          }}
        />
      </div>

      {/* Glow effects */}
      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl -z-10"></div>
      <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
    </div>
  );
}
