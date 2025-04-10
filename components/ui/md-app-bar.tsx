import * as React from "react"
import { cn } from "@/lib/utils"

interface MdAppBarProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 0 | 1 | 2 | 3
  variant?: "center" | "small" | "medium" | "large"
}

const MdAppBar = React.forwardRef<HTMLDivElement, MdAppBarProps>(
  ({ className, elevation = 0, variant = "center", ...props }, ref) => {
    const variantClasses = {
      center: "h-16 items-center",
      small: "h-14 items-center",
      medium: "h-16 items-center",
      large: "h-20 items-end pb-4",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "sticky top-0 z-40 flex w-full bg-surface px-4",
          variantClasses[variant],
          elevation > 0 && `md-elevation-${elevation}`,
          className,
        )}
        {...props}
      />
    )
  },
)
MdAppBar.displayName = "MdAppBar"

export { MdAppBar }
