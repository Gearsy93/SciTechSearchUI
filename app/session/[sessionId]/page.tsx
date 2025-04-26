"use client"

import { FileText } from "lucide-react" // иконка документа

import {useState, useEffect} from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { MdAppBar } from "@/components/ui/md-app-bar"
import { MdButton } from "@/components/ui/md-button"
import { MdCardContent } from "@/components/ui/md-card"
import { EmptyState } from "@/components/empty-state"
import {getQueries, runSearch} from "@/lib/api";


export default function SessionPage() {
  const params = useParams<{ sessionId: string }>()
  const router = useRouter()
  const [queryText, setQueryText] = useState("")
  const [queries, setQueries] = useState<any[]>([])
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const sid = Number(params.sessionId)
    if (isNaN(sid)) {
      console.error("Некорректный sessionId", params.sessionId)
      return // или покажи ошибку
    }

    setSessionId(sid)

    async function fetchQueries() {
      setIsLoading(true)
      try {
        const q = await getQueries(sid)
        setQueries(q)
        setIsLoading(false)
      } catch (e) {
        console.error("Ошибка загрузки запросов", e)
      }

    }

    fetchQueries()
  }, [params.sessionId])

  const handleSearch = async () => {
    if (!sessionId) return
    // const query = await runSearch(sessionId, queryText)
    router.push(`/session/${sessionId}/query/new`)
  }


  if (!sessionId) return null

  return (
      <div className="flex min-h-screen flex-col">
        <MdAppBar elevation={1} variant="center">
          <Link href="/">
            <MdButton variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6"/>
              <span className="sr-only">Back</span>
            </MdButton>
          </Link>
          <h1 className="ml-4 md-headline-medium font-medium tracking-tight text-on-surface">
            {queries.length > 0
                ? `${queries[0].queryText.length > 40
                    ? queries[0].queryText.slice(0, 40) + "…"
                    : queries[0].queryText}`
                : `Сессия №${sessionId}`}
          </h1>
          <div className="ml-auto">
            <Link href={`/session/${sessionId}/viewed/all`}>
            <MdButton variant="ghost" size="icon">
                <FileText className="h-6 w-6"/>
                <span className="sr-only">Просмотренные документы</span>
              </MdButton>
            </Link>
          </div>
        </MdAppBar>

        <main className="flex flex-1 flex-col items-start relative">
          <div className="flex-1 w-full p-4 md:p-8">
            <div className="pt-6 px-4 w-full max-w-xl mx-auto">
              <MdCardContent>
                <h2 className="text-xl font-semibold mb-4">История запросов</h2>
                {isLoading ? (
                    <div className="flex flex-1 items-center justify-center py-10">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"/>
                    </div>
                ) : queries.length > 0 ? (
                    <ul className="space-y-4">
                      {queries.map((query) => (
                          <li key={query.id}>
                            <Link
                                href={`/session/${sessionId}/query/${query.id}`}
                                className="block rounded-xl bg-surface-container-low px-4 py-4 shadow-sm hover:shadow-md transition-colors">
                              <div className="md-body-large text-on-surface">{query.queryText}</div>
                              <div className="md-body-small text-muted-foreground mt-1">
                                {new Date(query.createdAt).toLocaleString("ru-RU", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit"
                                })}

                              </div>
                            </Link>
                          </li>
                      ))}
                    </ul>
                ) : (
                    <EmptyState title="Запросов не было" description="Начните сессию поиска НТИ ниже"/>
                )}
              </MdCardContent>
            </div>
          </div>

          <div
              className="w-full px-4 pb-8 pt-4 fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-outline/10">
            <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSearch()
                }}
                className="max-w-2xl mx-auto flex items-center gap-3"
            >
              <input
                  type="text"
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  placeholder="Цифровизация логистики"
                  className="flex-1 rounded-xl border border-outline/30 bg-surface px-4 py-4 text-lg text-on-surface placeholder:text-muted-foreground shadow-sm hover:shadow-md focus:shadow-md focus:outline-none focus:ring-0 transition"
              />
            </form>
          </div>
        </main>
      </div>
  )
}

