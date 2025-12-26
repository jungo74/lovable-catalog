import { Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Language, languageNames, languageFlags } from '@/lib/i18n/translations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'default' | 'header';
}

export function LanguageSelector({ className, variant = 'default' }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();

  const languages: Language[] = ['fr', 'en', 'ar'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
            variant === 'header' 
              ? "bg-transparent hover:bg-muted/50 border border-border/50 hover:border-orange/50"
              : "bg-muted hover:bg-muted/80",
            className
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{languageFlags[language]}</span>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={cn(
              "flex items-center gap-3 cursor-pointer",
              language === lang && "bg-orange/10 text-orange"
            )}
          >
            <span className="text-lg">{languageFlags[lang]}</span>
            <span className="text-sm">{languageNames[lang]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
