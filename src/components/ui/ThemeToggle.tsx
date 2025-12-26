import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored === 'dark' || (!stored && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "relative w-10 h-10 rounded-full flex items-center justify-center transition-all",
        "bg-transparent hover:bg-muted/50 border border-border/50 hover:border-orange/50",
        className
      )}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute"
          >
            <Sun className="h-5 w-5 text-orange drop-shadow-[0_0_8px_hsl(var(--orange))]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute"
          >
            <Moon className="h-5 w-5 text-orange drop-shadow-[0_0_8px_hsl(var(--orange))]" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 bg-orange/20"
        animate={{
          opacity: [0, 0.5, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.button>
  );
}
