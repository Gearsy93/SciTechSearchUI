type SearchResult = {
    id: string
    documentId: string
    url: string
    title: string
    snippet: string
    score: number
    viewed?: boolean
}

type QueryWithResults = {
    id: number
    text: string
    results: SearchResult[]
}

type NavigationDrawerContextType = {
    openDrawer: () => void;
    closeDrawer: () => void;
    isOpen: boolean;
    sessions: any[];
    reloadSessions: () => Promise<void>;
};
