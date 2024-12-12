import { SectionMap, SentenceMap, TimeMap } from '@/App.type';

export interface IProps {
    sectionMap: SectionMap[];
    sentenceMap: SentenceMap;
    timeMap: TimeMap[];
    highlights: number[];
    count: number;
    onPause: () => void;
    setCount: (val: number) => void;
    setHighlights: (val: number[]) => void;
}
