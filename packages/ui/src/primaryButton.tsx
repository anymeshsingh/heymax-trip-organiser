"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[25px] px-[60px] py-[14px] text-base font-semibold transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        light: "bg-[#5046C5] text-white",
        dark: "bg-[#802EFF] text-white",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  }
);

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  title: string;
  dark?: boolean;
}

export const PrimaryButton = ({
  title,
  dark = false,
  className,
  disabled = false,
  ...props
}: PrimaryButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant: dark ? "dark" : "light" }), className)}
      disabled={disabled}
      {...props}
    >
      {title}
    </button>
  );
};