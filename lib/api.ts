const baseUrl =
    typeof window !== "undefined" && window.location.hostname === "46.146.230.53"
        ? "http://46.146.230.53:8080/api"
        : "http://localhost:8080/api"


export async function createSession(): Promise<{ sessionId: number; startTime: string }> {
    const res = await fetch(`${baseUrl}/session/create`, { method: "POST" })
    return res.json()
}

export async function runSearch(sessionId: number, queryText: string): Promise<{ id: number; queryText: string }> {
    const res = await fetch(`${baseUrl}/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, query: queryText }),
    })

    const data = await res.json()
    return {
        id: data.queryId,
        queryText: queryText,
    }
}

export async function getQueries(sessionId: number): Promise<any[]> {
    const res = await fetch(`${baseUrl}/session/${sessionId}/queries`)
    return res.json()
}

export async function getResults(queryId: number): Promise<SearchResult[]> {
    const res = await fetch(`${baseUrl}/query/${queryId}/results`)
    return res.json()
}


export async function markDocumentAsViewed(queryId: number, documentId: string) {
    await fetch(`${baseUrl}/document/viewed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queryId, documentId })
    })
}

export async function getAllSessions(): Promise<{ sessionId: number; startTime: string; title: string }[]> {
    const res = await fetch(`${baseUrl}/session/titled/all`)
    return res.json()
}

export async function getQuery(queryId: number): Promise<{ id: number; queryText: string }> {
    const res = await fetch(`${baseUrl}/query/${queryId}`)
    if (!res.ok) throw new Error("Failed to fetch query")
    return res.json()
}
export async function unmarkDocumentAsViewed(queryId: number, documentId: string) {
    await fetch(`${baseUrl}/document/${queryId}/unviewed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queryId, documentId }),
    })
}

export async function getViewedDocuments(sessionId: number): Promise<SearchResult[]> {
    console.log("делаю запроса")
    const res = await fetch(`${baseUrl}/session/${sessionId}/viewed`)
    if (!res.ok) throw new Error("Failed to fetch viewed docs")
    return res.json()
}
