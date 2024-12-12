import EditPanel from '@/components/EditPanel';
import PreviewPanel from '@/components/PreviewPanel';
import VideoUploader from '@/components/VideoUploader';
import style from './App.module.css';
import { useRef, useState, useCallback, useEffect } from 'react';
import { SectionMap, SentenceMap, TimeMap } from '@/App.type';

function App() {
    const [sectionMap, setSectionMap] = useState<SectionMap[] | null>(null);
    const [sentenceMap, setSentenceMap] = useState<SentenceMap | null>(null);
    const [timeMap, setTimeMap] = useState<TimeMap[]>([]);
    const [highlights, setHighlights] = useState<number[]>([]);
    const [videoLength, setVideoLength] = useState(0);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const timer = useRef<number | null>(null);

    const play = () => {
        if (!timeMap.length || !sentenceMap) return;
        setIsPlaying(true);

        const arr = timeMap.filter((item) => item.startTime <= count);
        const sentenceId = arr[arr.length - 1].id;

        // make sure always start from highlight clips
        if (!highlights.includes(sentenceId)) {
            setCount(sentenceMap[highlights[0]].startTime);
        }

        timer.current = setInterval(() => {
            setCount((prev) => {
                if (prev + 1 === videoLength) {
                    pause();
                }
                return prev + 1;
            });
        }, 1000);
    };

    const pause = useCallback(() => {
        if (!timer.current) return;
        setIsPlaying(false);
        clearInterval(timer.current);
        timer.current = null;
    }, []);

    const handleData = (data) => {
        // set normalized data
        setSectionMap(data.sectionMap);
        setSentenceMap(data.sentenceMap);
        setTimeMap(data.timeMap);
        setHighlights(data.highlights);
        setVideoLength(data.videoLength);
        setCount(data.sentenceMap[data.highlights[0]].startTime);
    };

    useEffect(() => {
        // only play highlight clips
        if (!timeMap.length || !sentenceMap) return;
        const arr = timeMap.filter((item) => item.startTime <= count);
        const sentenceId = arr[arr.length - 1].id;
        const index = highlights.indexOf(sentenceId);

        if (
            index !== -1 &&
            sentenceMap[highlights[index]].endTime - 1 === count
        ) {
            if (index === highlights.length - 1) {
                setCount(sentenceMap[highlights[0]].startTime);
            } else {
                setCount(sentenceMap[highlights[index + 1]].startTime);
            }
        }
    }, [count, timeMap, sentenceMap, highlights]);

    return (
        <div className={style.wrap}>
            <VideoUploader
                onSetData={handleData}
                loading={loading}
                onSetLoading={setLoading}
            />
            {loading && <div>loading...</div>}
            {sectionMap && !loading && (
                <div className={style.container}>
                    <EditPanel
                        sectionMap={sectionMap}
                        sentenceMap={sentenceMap}
                        timeMap={timeMap}
                        highlights={highlights}
                        count={count}
                        setCount={setCount}
                        setHighlights={setHighlights}
                        onPause={pause}
                    />
                    <PreviewPanel
                        sentenceMap={sentenceMap}
                        timeMap={timeMap}
                        highlights={highlights}
                        videoLength={videoLength}
                        isPlaying={isPlaying}
                        count={count}
                        setCount={setCount}
                        onPlay={play}
                        onPause={pause}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
