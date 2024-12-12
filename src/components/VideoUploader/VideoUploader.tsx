import { getTranscript, TranscriptData } from '@/api/getTranscript';
import { SectionMap, SentenceMap, TimeMap } from '@/App.type';
import { IProps } from './VideoUploader.type';

/*
responsibility:
upload video / call api / normalize data
*/

const normalizeData = (data: TranscriptData) => {
    const sectionMap = data.sections.reduce((acc, curr) => {
        acc.push({
            title: curr.title,
            sentences: curr.sentences.map((item) => item.id),
        });
        return acc;
    }, [] as SectionMap[]);

    const sentenceMap = data.sections.reduce((acc, curr) => {
        curr.sentences.forEach((item) => {
            acc[item.id] = item;
        });
        return acc;
    }, {} as SentenceMap);

    const timeMap = data.sections.reduce((acc, curr) => {
        curr.sentences.forEach((item) => {
            acc.push({ startTime: item.startTime, id: item.id });
        });
        return acc;
    }, [] as TimeMap[]);

    console.log({
        sectionMap,
        sentenceMap,
        timeMap,
        highlights: data.suggestedHighlights,
        videoLength: data.endTime,
    });

    return {
        sectionMap,
        sentenceMap,
        timeMap,
        highlights: data.suggestedHighlights,
        videoLength: data.endTime,
    };
};

const VideoUploader = ({ onSetData, loading, onSetLoading }: IProps) => {
    const handleFileUpload = () => {
        onSetLoading(true);
        getTranscript()
            .then((res) => {
                onSetData(normalizeData(res));
                console.log(res);
            })
            .finally(() => onSetLoading(false));
    };

    return (
        <div>
            {/* <input type="file" accept="video/*" onChange={handleFileUpload} /> */}
            <button onClick={handleFileUpload} disabled={loading}>
                Video Upload
            </button>
        </div>
    );
};

export default VideoUploader;
