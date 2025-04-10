import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary-container text-on-primary-container hover:bg-primary-container/80 shadow-none hover:shadow-sm",
                destructive: "bg-error text-on-error hover:bg-error/90",
                outline: "border border-outline bg-surface hover:bg-surface-container",
                secondary: "bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80",
                ghost: "hover:bg-surface-container hover:text-on-surface",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-5 text-sm rounded-xl",
                sm: "h-9 px-4 text-sm rounded-lg",
                lg: "h-12 px-6 text-base rounded-2xl",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)



export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const MdButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
MdButton.displayName = "MdButton"

export { MdButton, buttonVariants }
