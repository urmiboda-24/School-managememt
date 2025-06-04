// "use client";

// import React from "react";
// import clsx from "clsx";

// type variant = "primary" | "secondary" | "delete" | "outlined" | "disabled";

// interface CustomButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: variant;
//   startIcon?: React.ReactNode;
//   endIcon?: React.ReactNode;
//   children: React.ReactNode;
// }

// const CustomButton: React.FC<CustomButtonProps> = ({
//   variant = "primary",
//   startIcon,
//   endIcon,
//   children,
//   className,
//   ...props
// }) => {
//   const baseClasses = "px-4 py-2 font-bold transition duration-200";
//   const typeClasses = {
//     primary:
//       "bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-[8px] text-white",
//     secondary: "bg-gray-500 hover:bg-gray-600 cursor-pointer rounded-[8px]",
//     delete:
//       "bg-red-500 hover:bg-red-600 rounded-[8px] text-white cursor-pointer",
//     outlined:
//       "border border-gray-500 text-gray-700 hover:bg-gray-100 cursor-pointer rounded-[8px]",
//     disabled: "bg-gray-100 text-gray-400 cursor-not-allowed rounded-[8px]",
//   };

//   return (
//     <button
//       className={clsx(baseClasses, typeClasses[variant], className)}
//       {...props}
//     >
//       {startIcon && <span>{startIcon}</span>}
//       {children}
//       {endIcon && <span>{endIcon}</span>}
//     </button>
//   );
// };

// export default CustomButton;

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/helper";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
