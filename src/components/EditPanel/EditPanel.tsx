import { useLayoutEffect, useRef } from 'react';
import style from './EditPanel.module.css';
import { IProps } from './EditPanel.type';
import reformTime from '@/utils/reformTime';

/*
responsibility:
click time to seek / click transcript to set highlight clips / focused border / auto scroll
*/

const EditPanel = ({
    sectionMap,
    sentenceMap,
    timeMap,
    highlights,
    count,
    onPause,
    setCount,
    setHighlights,
}: IProps) => {
    const elRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const computePlayingId = () => {
        const arr = timeMap.filter((item) => item.startTime <= count);
        return arr[arr.length - 1].id;
    };

    const seek = (startTime: number) => {
        onPause();
        setCount(startTime);
    };

    const handleHighlights = (sentenceId: number) => {
        onPause();
        const temp = highlights.map((item) => item);
        const index = temp.indexOf(sentenceId);
        if (index === -1) {
            temp.push(sentenceId);
        } else {
            temp.splice(index, 1);
        }
        setHighlights(temp.sort((a, b) => a - b));
    };

    useLayoutEffect(() => {
        // auto scroll
        const arr = timeMap.filter((item) => item.startTime <= count);
        const sentenceId = arr[arr.length - 1].id;
        if (!elRefs.current[sentenceId]) return;

        elRefs.current[sentenceId].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }, [count, timeMap]);

    return (
        <div className={style.wrap}>
            <div className={style.blockTitle}>Transcript</div>
            {sectionMap.map((item, index) => (
                <div key={index}>
                    <div className={style.sectionTitle}>{item.title}</div>
                    <div className={style.sectionContent}>
                        {item.sentences.map((sentenceId, key) => {
                            const sentence = sentenceMap[sentenceId];
                            const isHighlight = highlights.includes(sentenceId);
                            return (
                                <div
                                    className={`${style.sentenceWrap} ${
                                        isHighlight && style.highlight
                                    } ${
                                        computePlayingId() === sentenceId &&
                                        style.isPlaying
                                    }`}
                                    key={key}
                                    ref={(ref) => {
                                        elRefs.current[sentenceId] = ref;
                                    }}
                                    onClick={() => handleHighlights(sentenceId)}
                                >
                                    <div
                                        className={style.timestamp}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            seek(sentence.startTime);
                                        }}
                                    >
                                        {reformTime(sentence.startTime)}
                                    </div>
                                    <div>{sentence.text}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EditPanel;
