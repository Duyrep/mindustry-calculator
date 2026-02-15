import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";

const VARIANTS = {
  primary: "bg-primary text-white hover:bg-primary/80",
  outline: "border border-input bg-transparent hover:bg-accent",
  danger: "bg-red-500 text-white hover:bg-red-600",
  ghost: "hover:bg-accent hover:text-accent-foreground",
};

const SIZES = {
  sm: "h-8 px-2 text-xs",
  md: "h-10 px-3 py-1",
  lg: "h-12 px-8 text-lg",
  icon: "h-10 w-10",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const variantClass = VARIANTS[variant];
    const sizeClass = SIZES[size];
    const baseClass =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

    return (
      <Comp
        ref={ref}
        className={twMerge(baseClass, variantClass, sizeClass, className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export default Button;
