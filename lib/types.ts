type SearchResult = {
    documentUrl: string
    id: string
    score: number
    snippet: string
    title: string
    viewed: boolean
}


type NavigationDrawerContextType = {
    openDrawer: () => void;
    closeDrawer: () => void;
    isOpen: boolean;
    sessions: any[];
    reloadSessions: () => Promise<void>;
};
