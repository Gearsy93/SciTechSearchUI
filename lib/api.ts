const API_BASE = "http://localhost:8080/api" // замени на актуальный адрес

export async function createSession(): Promise<{ sessionId: number; startTime: string }> {
    const res = await fetch(`${API_BASE}/session/create`, { method: "POST" })
    return res.json()
}

export async function runSearch(sessionId: number, query: string): Promise<any[]> {
    const res = await fetch(`${API_BASE}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, query })
    })
    return res.json()
}

export async function getQueries(sessionId: number): Promise<any[]> {
    const res = await fetch(`${API_BASE}/session/${sessionId}/queries`)
    return res.json()
}

export async function getResults(queryId: number): Promise<any[]> {
    const res = await fetch(`${API_BASE}/query/${queryId}/results`)
    return res.json()
}

export async function markDocumentAsViewed(queryId: number, documentId: string) {
    await fetch(`${API_BASE}/document/viewed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queryId, documentId })
    })
}

export async function getAllSessions(): Promise<{ sessionId: number; startTime: string }[]> {
    const res = await fetch("http://localhost:8080/api/session/all")
    return res.json()
}
