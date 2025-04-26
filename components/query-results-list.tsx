"use client" // Эта часть будет интерактивной!

import { useState } from "react"
import { MdCard, MdCardContent } from "@/components/ui/md-card"
import { MdButton } from "@/components/ui/md-button"
import { MdChip } from "@/components/ui/md-chip"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { markDocumentAsViewed, unmarkDocumentAsViewed, getResults } from "@/lib/api"
import {SwitchWithLabel} from "@/components/ui/switch-with-label";

export default function QueryResultsList({ queryId, documents }: { queryId: number, documents: SearchResult[] }) {
    const [results, setResults] = useState(documents)
    const [hideViewed, setHideViewed] = useState(true)

    const handleToggleViewed = async (docId: string, alreadyViewed: boolean) => {
        if (alreadyViewed) {
            await unmarkDocumentAsViewed(queryId, docId)
        } else {
            await markDocumentAsViewed(queryId, docId)
        }

        const updated = await getResults(queryId)
        setResults(updated.sort((a, b) => b.score - a.score))
    }

    const filteredResults = results.filter((result) => !hideViewed || !result.viewed)

    const getScoreShade = (score: number) => {
        if (score >= 0.9) return "bg-primary/20"
        if (score >= 0.8) return "bg-primary/10"
        return "bg-primary/5"
    }

    return (
        <div className="w-full max-w-2xl space-y-4">
            <div className="mb-6 w-full max-w-2xl flex items-center justify-between">
                <h3 className="md-headline-small" style={{fontWeight: 600}}>Результаты поиска</h3>
                <div className="flex items-center justify-between mb-4">
                <SwitchWithLabel
                        label="Скрыть просмотренные"
                        checked={hideViewed}
                        onChange={setHideViewed}
                    />
                </div>
            </div>

            {filteredResults.map((result) => {
                const isViewed = result.viewed
                return (
                    <MdCard key={result.id} className="overflow-hidden" variant="elevated" elevation={2}>
                        <MdCardContent className="p-0">
                            <div className="relative p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-on-surface font-bold text-base md:text-lg leading-tight">
                                            <button
                                                onClick={() => {
                                                    setHideViewed(false)
                                                    handleToggleViewed(result.id, isViewed)
                                                    window.open(result.documentUrl, "_blank", "noopener,noreferrer")
                                                }}
                                                className="inline-flex items-center gap-1 hover:underline align-middle text-on-surface font-semibold justify-start text-left"
                                            >
                                                {result.title}
                                            </button>
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

                                <p className="md-body-small mb-3 text-muted-foreground">
                                    {result.documentUrl.length > 80
                                        ? result.documentUrl.slice(0, 80) + "..."
                                        : result.documentUrl}
                                </p>
                                <p className="md-body-medium">{result.snippet}</p>

                                <div className="mt-4">
                                <MdButton
                                        onClick={() => handleToggleViewed(result.id, isViewed)}
                                        className={cn(
                                            "rounded-md text-sm px-4 py-2 transition font-medium",
                                            isViewed
                                                ? "bg-surface-container-low text-muted-foreground hover:text-primary"
                                                : "bg-[hsl(var(--primary-container)/0.25)] text-on-surface hover:bg-[hsl(var(--primary-container)/0.2)]"
                                        )}
                                    >
                                        {isViewed ? (
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
    )
}
