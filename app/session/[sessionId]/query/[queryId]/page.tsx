"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {ArrowLeft, Check, Search} from "lucide-react"

import { MdAppBar } from "@/components/ui/md-app-bar"
import { MdChip } from "@/components/ui/md-chip"
import { MdButton } from "@/components/ui/md-button"
import { MdCard, MdCardContent } from "@/components/ui/md-card"
import { EmptyState } from "@/components/empty-state"
import {cn} from "@/lib/utils";
import {SwitchWithLabel} from "@/components/ui/switch-with-label";
import {getResults, getSession, markDocumentAsViewed} from "@/lib/api";
import { getQuery } from "@/lib/api"

export default function QueryResultsPage() {
  const params = useParams<{ sessionId: string; queryId: string }>()
  const [hideViewed, setHideViewed] = useState(true)
  const [viewedResults, setViewedResults] = useState<Set<string>>(new Set())
  const [isAnimating, setIsAnimating] = useState(true)

  const [session, setSession] = useState<{ id: number; title: string } | null>(null)

  const [query, setQuery] = useState<QueryWithResults | null>(null)
  const [results, setResults] = useState<SearchResult[]>([])

  const [isLoading, setIsLoading] = useState(true)



  const handleToggleViewed = async (docId: string) => {
    await markDocumentAsViewed(Number(params.queryId), docId)
    setViewedResults((prev) => new Set(prev).add(docId))
  }

  useEffect(() => {
    // Add animation class when component mounts
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 300)
    return () => clearTimeout(timer)
  }, [params.queryId])


  useEffect(() => {
    const loadQueryAndResults = async () => {
      try {
        setIsLoading(true)

        const queryData = await getQuery(Number(params.queryId))
        const resultData = await getResults(Number(params.queryId))

        // если ручки нет — убираем этот вызов
        // const sessionData = await getSession(Number(params.sessionId))

        setQuery({
          id: queryData.id,
          text: queryData.queryText,
          results: resultData,
        })

        setResults(resultData)

        setSession({
          id: Number(params.sessionId),
          title: queryData.queryText, // используем текст запроса как имя сессии
        })

        setIsLoading(false)
      } catch (e) {
        console.error("Ошибка при загрузке запроса или результатов", e)
        setIsLoading(false)
      }
    }

    loadQueryAndResults()
  }, [params.queryId, params.sessionId])




  if (!session || !query) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <EmptyState
              title="Запрос не найден"
              description="Запрос не существует или удален"
              action={
                <Link href="/">
                  <MdButton>На главный экран</MdButton>
                </Link>
              }
          />
        </div>
    )
  }

  // Filter results based on the hideViewed state
  const filteredResults = results.filter((result) => {
    const isViewed = result.viewed || viewedResults.has(result.id)
    return !hideViewed || !isViewed
  })

  const getScoreShade = (score: number) => {
    if (score >= 0.9) return "bg-primary/20";
    if (score >= 0.8) return "bg-primary/10";
    return "bg-primary/5";
  };


  return (
      <div className={`flex min-h-screen flex-col ${isAnimating ? "md-page-transition" : ""}`}>
        <MdAppBar elevation={2} variant="center">
          {session && (
              <Link href={`/session/${String(session.id)}`}>
                <MdButton variant="ghost" size="icon">
                  <ArrowLeft className="h-6 w-6" />
                  <span className="sr-only">Back</span>
                </MdButton>
              </Link>
          )}
          <h1 className="ml-4 md-headline-medium font-medium tracking-tight text-on-surface">
            {query?.text}
          </h1>
        </MdAppBar>




        <main className="flex flex-1 flex-col items-center p-4 md:p-8">
          <div className="mb-6 w-full max-w-2xl flex items-center justify-between">
            <h3 className="md-headline-small">Результаты поиска</h3>
            <div className="flex items-center justify-between mb-4">
              <SwitchWithLabel
                  label="Скрыть просмотренные"
                  checked={hideViewed}
                  onChange={setHideViewed}
              />
            </div>
          </div>
          {isLoading ? (
              <div className="flex flex-1 items-center justify-center py-10">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
          ) : filteredResults.length > 0 ? (
              <div className="w-full max-w-2xl space-y-4">
                {filteredResults.map((result) => {
                  result.viewed || viewedResults.has(result.id);
                  return (
                      <MdCard key={result.id} className="overflow-hidden" variant="elevated" elevation={2}>
                        <MdCardContent className="p-0">
                          <div className="relative p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="text-on-surface font-bold text-base md:text-lg leading-tight">
                                  <a
                                      href={result.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 hover:underline align-middle"
                                  >
                                    <span className="leading-tight">{result.title}</span>
                                  </a>

                                </h3>
                              </div>
                              <MdChip
                                  variant="tonal"
                                  size="sm"
                                  className={cn(
                                      "text-sm font-semibold text-on-surface px-5 py-3 rounded-xl",
                                      getScoreShade(result.score)
                                  )}
                              >
                                Оценка: {result.score.toFixed(2)}
                              </MdChip>

                            </div>
                            <p className="md-body-small mb-3 text-muted-foreground">{result.url}</p>
                            <p className="md-body-medium">{result.snippet}</p>

                            <div className="mt-4">
                              <MdButton
                                  onClick={() => handleToggleViewed(result.id)}
                                  className={cn(
                                      "rounded-md text-sm px-4 py-2 transition font-medium",
                                      result.viewed
                                          ? "bg-surface-container-low text-muted-foreground hover:text-primary"
                                          : "bg-[hsl(var(--primary-container)/0.25)] text-on-surface hover:bg-[hsl(var(--primary-container)/0.2)]"
                                  )}
                              >
                                {result.viewed ? (
                                    <>
                                      <Check className="w-4 h-4 mr-1"/>
                                      Просмотрено
                                    </>
                                ) : (
                                    "Отметить как просмотренное"
                                )}
                              </MdButton>
                            </div>
                          </div>
                        </MdCardContent>
                      </MdCard>
                  )
                })}
              </div>
          ) : (
              <EmptyState
                  title="Результаты поиска не найдены"
                  description="Попробуйте иначе сформулировать запрос"
                  icon={<Search className="h-10 w-10 text-muted-foreground"/>}
                  action={
                    <Link href={session ? `/session/${session.id}` : "/"}>
                      <MdButton>Вернуться к поиску</MdButton>
                    </Link>
                  }
              />
          )}
        </main>
      </div>
  )
}
