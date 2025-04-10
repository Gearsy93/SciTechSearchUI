const baseUrl = 'http://192.168.0.2:8080/api'

export async function createSession(): Promise<{ sessionId: number; startTime: string }> {
    const res = await fetch(`${baseUrl}/session/create`, { method: "POST" })
    return res.json()
}

export async function runSearch(sessionId: number, query: string): Promise<any[]> {
    const res = await fetch(`${baseUrl}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, query })
    })
    return res.json()
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

export async function getSession(sessionId: number): Promise<{ id: number; title: string }> {
    const res = await fetch(`${baseUrl}/session/${sessionId}`);
    return res.json();
}

export async function createQuery(sessionId: number, queryText: string): Promise<{ id: number; queryText: string }> {
    const res = await fetch(`${baseUrl}/query/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, queryText }),
    })
    return res.json()
}
