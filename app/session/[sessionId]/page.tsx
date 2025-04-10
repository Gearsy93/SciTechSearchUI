"use client"

import {useState, type KeyboardEvent, useEffect} from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Search } from "lucide-react"

import { MdAppBar } from "@/components/ui/md-app-bar"
import { MdButton } from "@/components/ui/md-button"
import { MdCard, MdCardContent, MdCardHeader, MdCardTitle } from "@/components/ui/md-card"
import { EmptyState } from "@/components/empty-state"
import {getQueries, runSearch} from "@/lib/api";


export default function SessionPage() {
  const params = useParams<{ sessionId: string }>()
  const router = useRouter()
  const [queryText, setQueryText] = useState("")
  const [queries, setQueries] = useState<any[]>([])
  const [sessionId, setSessionId] = useState<number | null>(null)

  useEffect(() => {
    const sid = Number(params.sessionId)
    setSessionId(sid)

    async function fetchQueries() {
      const q = await getQueries(sid)
      setQueries(q)
    }

    fetchQueries()
  }, [params.sessionId])

  const handleSearch = async () => {
    if (!sessionId) return
    const results = await runSearch(sessionId, queryText)
    const latestQuery = results.length > 0 ? results[0].queryId : null
    if (latestQuery) {
      router.push(`/session/${sessionId}/query/${latestQuery}`)
    }
  }

  if (!sessionId) return null

  return (
      <div className="flex min-h-screen flex-col">
        <MdAppBar elevation={1} variant="center">
          <Link href="/">
            <MdButton variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">Back</span>
            </MdButton>
          </Link>
          <h1 className="ml-4 text-[22px] font-medium tracking-tight text-on-surface">
            Сессия №{sessionId}
          </h1>
        </MdAppBar>

        <main className="flex flex-1 flex-col items-center relative">
          <div className="flex-1 flex items-center justify-center w-full p-4 md:p-8">
            <MdCard className="w-full max-w-2xl" variant="filled">
              <MdCardHeader>
                <MdCardTitle>История запросов</MdCardTitle>
              </MdCardHeader>
              <MdCardContent>
                {queries.length > 0 ? (
                    <ul className="space-y-4">
                      {queries.map((query) => (
                          <li key={query.id}>
                            <Link
                                href={`/session/${sessionId}/query/${query.id}`}
                                className="block rounded-xl bg-surface-container-low px-4 py-4 shadow-sm hover:shadow-md transition-colors"
                            >
                              <div className="md-body-large text-on-surface">{query.queryText}</div>
                              <div className="md-body-small text-muted-foreground mt-1">{query.createdAt}</div>
                            </Link>
                          </li>
                      ))}
                    </ul>
                ) : (
                    <EmptyState title="No queries yet" description="Start your research by entering a query below." />
                )}
              </MdCardContent>
            </MdCard>
          </div>

          <div className="w-full px-4 pb-8 pt-4 fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-outline/10">
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
                  placeholder="Поиск научно-технической литературы"
                  className="flex-1 rounded-xl border border-outline/30 bg-surface px-4 py-4 text-lg text-on-surface placeholder:text-muted-foreground shadow-sm hover:shadow-md focus:shadow-md focus:outline-none focus:ring-0 transition"
              />
              <MdButton type="submit" className="shrink-0">
                <Search className="mr-1 h-5 w-5" />
                Найти
              </MdButton>
            </form>
          </div>
        </main>
      </div>
  )
}

