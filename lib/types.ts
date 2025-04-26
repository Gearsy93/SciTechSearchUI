type SearchResult = {
    documentUrl: string
    id: string
    score: number
    snippet: string
    title: string
    viewed: boolean
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
