'use client'

import { useEffect, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>

        {children}
        </ThemeProvider>
    )
}
