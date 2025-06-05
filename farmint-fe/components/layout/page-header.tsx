"use client";

import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  showWalletButton?: boolean;
  showBackButton?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  showWalletButton = false,
  showBackButton = false,
  className,
  children,
}: PageHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled 
          ? "bg-background-primary/80 backdrop-blur-md border-b border-border-light py-3" 
          : "bg-transparent py-4",
        className
      )}
    >
      <div className="container flex items-center justify-between px-4">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="font-heading text-heading-h4 font-bold"
        >
          {title}
        </motion.h1>
        
        <div className="flex items-center gap-4">
          {children}
          
          {showWalletButton && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 border-border-medium hover:bg-background-tertiary"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}