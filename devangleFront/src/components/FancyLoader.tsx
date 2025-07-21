import { motion, AnimatePresence } from "framer-motion";

function AnimatedSpinner() {
  return (
    <div style={{ position: 'relative', width: 96, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Glowing animated ring */}
      <motion.div
        initial={{ opacity: 0.7, scale: 1 }}
        animate={{
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.08, 1],
        }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 96,
          height: 96,
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, #2563eb, #7c3aed, #2563eb)',
          filter: 'blur(8px)',
          zIndex: 0,
        }}
      />
      {/* Main spinner arc */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 4px 16px rgba(37,99,235,0.18))' }}
      >
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="#e0e7ef"
          strokeWidth="8"
          opacity="0.18"
        />
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          stroke="url(#spinner-gradient)"
          strokeWidth="8"
          strokeDasharray="44 88"
          strokeLinecap="round"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          style={{ transformOrigin: '50% 50%' }}
        />
        <defs>
          <linearGradient id="spinner-gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563eb" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function FancyLoader({ show = true }: { show?: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(16px)",
            background: "rgba(30, 41, 59, 0.18)",
          }}
        >
          <div className="flex flex-col items-center justify-center gap-8">
            <AnimatedSpinner />
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-xl font-semibold text-blue-700 dark:text-blue-300 tracking-wide drop-shadow-lg"
              style={{ letterSpacing: 2 }}
            >
              Loading...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 