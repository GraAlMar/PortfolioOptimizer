

export interface SearchBarProps {
    searchTerm?: string;
    onSaveSearchTerm: (searchTerm: string) => void;
    title: string;
}