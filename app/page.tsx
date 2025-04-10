"use client"

import { useState, type KeyboardEvent } from "react"
import { useRouter } from "next/navigation"

import {createQuery, createSession, runSearch} from "@/lib/api"
import Header from "@/components/ui/header"
import {useNavigationDrawer} from "@/components/navigation-drawer-context";

export default function Home() {
  const [sessionTitle, setSessionTitle] = useState("")
  const router = useRouter()

  const { reloadSessions } = useNavigationDrawer()

  const handleStartSession = async () => {
    const session = await createSession()
    const query = await createQuery(session.sessionId, sessionTitle)

    await reloadSessions() // 🔄 обновляем историю перед переходом

    router.push(`/session/${session.sessionId}/query/${query.id}`)
  }



  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && sessionTitle.trim()) {
      handleStartSession()
    }
  }

  return (
      <div className="flex min-h-screen flex-col">
        <Header/>
        <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-2xl space-y-6 text-center">
            <h1 className="text-[24px] font-semibold text-on-surface tracking-tight">Начните исследовательскую
              сессию</h1>
            <p className="text-muted-foreground text-base">
              Введите ключевую тему или вопрос — например: «Цифровизация логистики»
            </p>
            <input
                type="text"
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Поиск научно-технической литературы"
                className="w-full rounded-xl border border-outline/30 bg-surface px-4 py-4 text-lg text-on-surface placeholder:text-muted-foreground shadow-sm hover:shadow-md focus:shadow-md focus:outline-none focus:ring-0 transition"
            />
          </div>
        </main>

      </div>
  )
}
