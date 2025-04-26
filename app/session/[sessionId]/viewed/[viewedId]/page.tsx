"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Search } from "lucide-react"

import { MdAppBar } from "@/components/ui/md-app-bar"
import { MdCard, MdCardContent } from "@/components/ui/md-card"
import { MdChip } from "@/components/ui/md-chip"
import { MdButton } from "@/components/ui/md-button"
import { EmptyState } from "@/components/empty-state"
import { cn } from "@/lib/utils"
import { getViewedDocuments } from "@/lib/api" // нужен в api.ts

export default function ViewedDocumentsPage() {
    const params = useParams<{ sessionId: string }>()
    const [isLoading, setIsLoading] = useState(true)
    const [results, setResults] = useState<SearchResult[]>([])

    useEffect(() => {
        const loadViewed = async () => {
            setIsLoading(true)
            try {
                const docs = await getViewedDocuments(Number(params.sessionId))
                const sortedDocs = docs.sort((a, b) => b.score - a.score)
                setResults(sortedDocs)
            } catch (e) {
                console.error("Ошибка загрузки просмотренных", e)
            } finally {
                setIsLoading(false)
            }
        }

        loadViewed()
    }, [params.sessionId])


    const getScoreShade = (score: number) => {
        if (score >= 0.9) return "bg-primary/20"
        if (score >= 0.8) return "bg-primary/10"
        return "bg-primary/5"
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
                    Просмотренные документы
                </h1>
            </MdAppBar>

            <main className="flex flex-1 flex-col items-center p-4 md:p-8">
                {isLoading ? (
                    <div className="flex flex-1 items-center justify-center py-10">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    </div>
                ) : results.length > 0 ? (
                    <div className="w-full max-w-2xl space-y-4">
                        {results.map((result) => (
                            <MdCard key={result.id} className="overflow-hidden" variant="elevated" elevation={2}>
                                <MdCardContent className="p-0">
                                    <div className="relative p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className="text-on-surface font-bold text-base md:text-lg leading-tight">
                                                    <Link
                                                        href={result.documentUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 hover:underline align-middle"
                                                    >
                                                        <span className="leading-tight">{result.title}</span>
                                                    </Link>
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
                                        <p className="md-body-small mb-3 text-muted-foreground">{result.documentUrl}</p>
                                        <p className="md-body-medium">{result.snippet}</p>
                                    </div>
                                </MdCardContent>
                            </MdCard>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title="Нет просмотренных документов"
                        description="Вы еще не открыли ни одного результата"
                        icon={<Search className="h-10 w-10 text-muted-foreground" />}
                        action={
                            <Link href={`/session/${params.sessionId}`}>
                                <MdButton>Назад к сессии</MdButton>
                            </Link>
                        }
                    />
                )}
            </main>
        </div>
    )
}
