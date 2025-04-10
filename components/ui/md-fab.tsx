import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const fabVariants = cva(
  "flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:shadow-xl active:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 active:bg-secondary/80",
        tertiary: "bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 active:bg-tertiary/80",
      },
      size: {
        default: "h-14 w-14",
        small: "h-10 w-10",
        large: "h-24 w-24",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface FabProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof fabVariants> {
  asChild?: boolean
}

const MdFab = React.forwardRef<HTMLButtonElement, FabProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(fabVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
MdFab.displayName = "MdFab"

export { MdFab, fabVariants }
