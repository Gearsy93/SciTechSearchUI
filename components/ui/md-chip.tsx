import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        filled: "bg-secondary-container text-on-secondary-container",
        outlined: "border border-outline bg-transparent text-on-surface",
        tonal: "bg-secondary-container/70 text-on-secondary-container",
      },
      size: {
        default: "h-8",
        sm: "h-6 px-2 text-xs",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "default",
    },
  },
)

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chipVariants> {}

const MdChip = React.forwardRef<HTMLDivElement, ChipProps>(({ className, variant, size, ...props }, ref) => {
  return <div ref={ref} className={cn(chipVariants({ variant, size, className }))} {...props} />
})
MdChip.displayName = "MdChip"

export { MdChip, chipVariants }
