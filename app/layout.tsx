import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeWrapper } from "@/components/theme-wrapper"
import { NavigationDrawerProvider } from "@/components/navigation-drawer-context"

export const metadata: Metadata = {
    title: "SciTech Search",
    description: "Scientific information retrieval interface",
    generator: "v0.dev",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="font-sans">
        <ThemeWrapper>
            <NavigationDrawerProvider>
                {children}
            </NavigationDrawerProvider>
        </ThemeWrapper>
        </body>
        </html>
    )
}