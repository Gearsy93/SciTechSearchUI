"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface Session {
  id: string
  title: string
  date: string
}

interface NavigationDrawerProps {
  open: boolean
  onClose: () => void
  sessions: Session[]
}

export function NavigationDrawer({ sessions, open, onClose }: NavigationDrawerProps) {
  const pathname = usePathname()

  return (
      <div
          className={cn(
              "fixed inset-0 z-50 flex transition-opacity duration-300 ease-in-out",
              open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          )}
      >
        <div
            className={cn(
                "fixed inset-0 bg-black/50 transition-opacity duration-300",
                open ? "opacity-100" : "opacity-0",
            )}
            onClick={onClose}
        />
        <div
            className={cn(
                "w-[280px] bg-surface h-full overflow-auto p-4 z-50 transition-transform duration-300 ease-in-out",
                open ? "translate-x-0" : "-translate-x-full",
            )}
            onClick={(e) => e.stopPropagation()}
        >
          <h2 className="md-headline-small mb-6 px-2">Recent Sessions</h2>
          <nav className="flex flex-col space-y-1">
            {sessions.map((session) => (
                <Link
                    key={session.id}
                    href={`/session/${session.id}`}
                    onClick={onClose}
                    className={cn(
                        "flex flex-col rounded-lg px-4 py-3 transition-colors",
                        pathname === `/session/${session.id}`
                            ? "bg-primary-container text-primary-container-foreground"
                            : "hover:bg-surface-container-high active:bg-surface-container-highest",
                    )}
                >
                  <span className="md-title-medium">{session.title}</span>
                  <span className="md-body-small text-muted-foreground">{session.date}</span>
                </Link>
            ))}
          </nav>
        </div>
      </div>
  )
}
