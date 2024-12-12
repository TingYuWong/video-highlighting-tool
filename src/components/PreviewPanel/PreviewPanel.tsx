import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import style from './PreviewPanel.module.css';
import reformTime from '@/utils/reformTime';
import { IProps } from './PreviewPanel.type';

/*
responsibility:
video control: play / pause / seek / previous / next
*/

const PreviewPanel = ({
    sentenceMap,
    timeMap,
    highlights,
    videoLength,
    count,
    setCount,
    isPlaying,
    onPlay,
    onPause,
}: IProps) => {
    const progressbarRef = useRef<HTMLDivElement>(null);
    const [progressBarWidth, setProgressBarWidth] = useState(0);

    const arr = timeMap.filter((item) => item.startTime <= count);
    const sentenceId = arr[arr.length - 1].id;
    const playingSentenceIndex = highlights.indexOf(sentenceId);
    const transcriptText = highlights.includes(sentenceId)
        ? sentenceMap[sentenceId].text
        : '';

    const computePosition = (startTime: number) => {
        return (startTime / videoLength) * (progressBarWidth ?? 1);
    };

    const seek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const nextCount = Math.floor(
            (e.nativeEvent.offsetX / progressBarWidth) * videoLength
        );
        const arr = timeMap.filter((item) => item.startTime <= nextCount);
        const nextSentenceId = arr[arr.length - 1].id;
        if (!highlights.includes(nextSentenceId)) return;

        onPause();
        setCount(nextCount);
    };

    const prev = () => {
        if (playingSentenceIndex === 0) return;
        onPause();
        setCount(sentenceMap[highlights[playingSentenceIndex - 1]].startTime);
    };

    const next = () => {
        const playingSentenceIndex = highlights.indexOf(sentenceId);
        if (playingSentenceIndex === highlights.length - 1) return;
        onPause();
        setCount(sentenceMap[highlights[playingSentenceIndex + 1]].startTime);
    };

    useLayoutEffect(() => {
        // ensure highlight clips could finished rendering when initially rendering
        if (progressbarRef.current) {
            setProgressBarWidth(progressbarRef.current?.offsetWidth);
        }
    }, []);

    useEffect(() => {
        // video progress bar RWD
        const resize = () =>
            setProgressBarWidth(progressbarRef.current?.offsetWidth ?? 1);
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <div className={style.wrap}>
            <div className={style.videoPanel}>
                Video Preview
                <div className={style.transcript}>{transcriptText}</div>
            </div>
            <div className={style.controlBar}>
                {isPlaying ? (
                    <button onClick={onPause}>Pause</button>
                ) : (
                    <button onClick={onPlay}>Play</button>
                )}
                <button
                    disabled={
                        playingSentenceIndex === -1 ||
                        playingSentenceIndex === 0
                    }
                    onClick={prev}
                >
                    previous section
                </button>
                <button
                    disabled={
                        playingSentenceIndex === -1 ||
                        playingSentenceIndex === highlights.length - 1
                    }
                    onClick={next}
                >
                    next section
                </button>
                <div>{reformTime(count)}</div>
            </div>
            <div
                className={style.progressBar}
                ref={progressbarRef}
                onClick={seek}
            >
                <div
                    className={style.indicator}
                    style={{
                        left: computePosition(count),
                    }}
                ></div>
                {highlights.map((sentenceId, index) => {
                    const left = computePosition(
                        sentenceMap[sentenceId].startTime
                    );
                    const right = computePosition(
                        sentenceMap[sentenceId].endTime
                    );
                    return (
                        <div
                            className={style.hightlight}
                            key={index}
                            style={{
                                left: computePosition(
                                    sentenceMap[sentenceId].startTime
                                ),
                                width: `${right - left}px`,
                            }}
                        ></div>
                    );
                })}
                {count}
            </div>
        </div>
    );
};

export default PreviewPanel;
