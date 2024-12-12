import { SentenceMap, TimeMap } from '@/App.type';

export interface IProps {
    sentenceMap: SentenceMap;
    timeMap: TimeMap[];
    highlights: number[];
    videoLength: number;
    count: number;
    setCount: (val: number) => void;
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
}
