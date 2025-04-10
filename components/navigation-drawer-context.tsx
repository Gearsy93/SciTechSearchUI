"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { getAllSessions } from "@/lib/api";
import {NavigationDrawer, Session} from "@/components/navigation-drawer";

const NavigationDrawerContext = createContext<NavigationDrawerContextType | undefined>(undefined);

export const NavigationDrawerProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sessions, setSessions] = useState<Session[]>([])

    const openDrawer = () => setIsOpen(true);
    const closeDrawer = () => setIsOpen(false);

    const reloadSessions = async () => {
        const result = await getAllSessions()
        const transformed = result.map((s: any) => ({
            id: String(s.id),
            title: s.title,
            date: new Date(s.startTime).toLocaleString("ru-RU", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })
        }))

        setSessions(transformed)
    }

    useEffect(() => {
        const loadSessions = async () => {
            const result = await getAllSessions()

            const transformed = result.map((s: any) => ({
                id: String(s.id),
                title: s.title,
                date: new Date(s.startTime).toLocaleString("ru-RU", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                })
            }))

            setSessions(transformed)
        }

        loadSessions()
    }, [])


    return (
        <NavigationDrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, sessions, reloadSessions }}>
            <NavigationDrawer open={isOpen} onClose={closeDrawer} sessions={sessions} />
            <main>{children}</main>
        </NavigationDrawerContext.Provider>
    )

};

export const useNavigationDrawer = () => {
    const context = useContext(NavigationDrawerContext);
    if (!context) {
        throw new Error("useNavigationDrawer must be used within a NavigationDrawerProvider");
    }
    return context;
};
