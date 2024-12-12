export interface SentenceItem {
    text: string;
    startTime: number;
    endTime: number;
    id: number;
}

export interface SectionMap {
    title: string;
    sentences: number[];
}

export type SentenceMap = Record<number, SentenceItem>;

export interface TimeMap {
    startTime: number;
    id: number;
}
