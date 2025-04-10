import * as React from "react"

import { cn } from "@/lib/utils"

const MdCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    elevation?: 1 | 2 | 3 | 4 | 5
    variant?: "elevated" | "filled" | "outlined"
  }
>(({ className, elevation = 1, variant = "elevated", ...props }, ref) => {
  const variantClasses = {
    elevated: "bg-surface md-elevation-" + elevation,
    filled: "bg-surface",
    outlined: "bg-surface border border-outline",
  }

  return (
    <div ref={ref} className={cn("rounded-xl text-card-foreground", variantClasses[variant], className)} {...props} />
  )
})
MdCard.displayName = "MdCard"

const MdCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
)
MdCardHeader.displayName = "MdCardHeader"

const MdCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h3 ref={ref} className={cn("md-title-large", className)} {...props} />,
)
MdCardTitle.displayName = "MdCardTitle"

const MdCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("md-body-medium text-muted-foreground", className)} {...props} />
  ),
)
MdCardDescription.displayName = "MdCardDescription"

const MdCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
)
MdCardContent.displayName = "MdCardContent"

const MdCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
MdCardFooter.displayName = "MdCardFooter"

export { MdCard, MdCardHeader, MdCardFooter, MdCardTitle, MdCardDescription, MdCardContent }
