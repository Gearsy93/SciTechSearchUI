"use client"

import {createContext, useContext, useEffect, useState} from "react"
import { NavigationDrawer } from "@/components/navigation-drawer"
import { sessions } from "@/lib/data"

interface DrawerContextType {

    openDrawer: () => void
    closeDrawer: () => void
}

const NavigationDrawerContext = createContext<DrawerContextType | null>(null)

export function useNavigationDrawer() {
    const context = useContext(NavigationDrawerContext)
    if (!context) throw new Error("Missing NavigationDrawerContext")
    return context
}

export function NavigationDrawerProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        console.log("Drawer open?", isOpen)
    }, [isOpen])


    const openDrawer = () => setIsOpen(true)
    const closeDrawer = () => setIsOpen(false)

    return (
        <NavigationDrawerContext.Provider value={{ openDrawer, closeDrawer }}>
            {children}
            <NavigationDrawer open={isOpen} onClose={closeDrawer} sessions={sessions} />
        </NavigationDrawerContext.Provider>
    )
}
