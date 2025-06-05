import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800",
        destructive:
          "bg-error-500 text-white hover:bg-error-600 active:bg-error-700",
        outline:
          "border border-border-medium bg-transparent hover:bg-background-tertiary hover:text-text-primary",
        secondary:
          "bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700",
        ghost: "hover:bg-background-tertiary hover:text-text-primary",
        link: "text-primary-400 underline-offset-4 hover:underline",
        gradient: "bg-gradient-primary text-white hover:shadow-glow-sm transition-shadow duration-300",
        accent: "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };