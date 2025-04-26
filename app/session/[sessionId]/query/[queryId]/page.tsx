"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { runSearch, getQuery, getResults } from "@/lib/api"
import { MdAppBar } from "@/components/ui/md-app-bar"
import { MdButton } from "@/components/ui/md-button"
import { EmptyState } from "@/components/empty-state"
import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import QueryResultsList from "@/components/query-results-list";

export default function QueryResultsPage() {
  const router = useRouter()
  const params = useParams<{ sessionId: string; queryId: string }>()

  const [query, setQuery] = useState<any>(null)
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusMessage, setStatusMessage] = useState("")

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ws/progress")

    ws.onmessage = (event) => {
      const msg = event.data
      setStatusMessage(msg)
    }

    ws.onopen = () => console.log("WS подключен")
    ws.onclose = () => console.log("WS отключен")

    return () => ws.close()
  }, [])


  useEffect(() => {
    const load = async () => {
      const sessionId = Number(params.sessionId)

      if (params.queryId === "new") {
        // Создаем новый поиск
        const newQuery = await runSearch(sessionId, "Тема поиска") // можно заменить на реальное значение
        router.replace(`/session/${sessionId}/query/${newQuery.id}`)
      } else {
        try {
          const queryData = await getQuery(Number(params.queryId))
          const resultData = await getResults(Number(params.queryId))
          setQuery(queryData)
          setResults(resultData.sort((a, b) => b.score - a.score))
          setIsLoading(false)
        } catch (e) {
          console.error("Ошибка загрузки данных", e)
        }
      }
    }

    load()
  }, [params.queryId, params.sessionId, router])

  if (params.queryId === "new" || isLoading) {
    // Показываем спиннер
    return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <div className="ml-4 text-muted-foreground">{statusMessage}</div>
        </div>
    )
  }

  if (!query) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <EmptyState
              title="Запрос не найден"
              description="Запрос отсутствует или был удален"
              action={
                <Link href="/">
                  <MdButton>На главный экран</MdButton>
                </Link>
              }
          />
        </div>
    )
  }

  return (
      <div className="flex min-h-screen flex-col">
        <MdAppBar elevation={2} variant="center">
          <Link href={`/session/${params.sessionId}`}>
            <MdButton variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">Назад</span>
            </MdButton>
          </Link>
          <h1 className="ml-4 md-headline-medium font-medium tracking-tight text-on-surface">
            {query.queryText}
          </h1>
        </MdAppBar>

        <main className="flex flex-1 flex-col items-center p-4 md:p-8">
          {results.length > 0 ? (
              <QueryResultsList queryId={query.id} documents={results} />
          ) : (
              <EmptyState
                  title="Результаты не найдены"
                  description="Попробуйте изменить запрос"
                  icon={<Search className="h-10 w-10 text-muted-foreground" />}
                  action={
                    <Link href={`/session/${params.sessionId}`}>
                      <MdButton>Вернуться к поиску</MdButton>
                    </Link>
                  }
              />
          )}
        </main>
      </div>
  )
}
