interface Sentence {
    text: string;
    startTime: number;
    endTime: number;
    id: number;
}

interface Section {
    title: number;
    sentences: Sentence[];
}

export interface TranscriptData {
    startTime: number;
    endTime: number;
    sections: Section[];
    suggestedHighlights: number[];
}

export const getTranscript = (): Promise<TranscriptData> => {
    return new Promise((resolve) => {
        setTimeout(
            () =>
                resolve({
                    startTime: 0,
                    endTime: 74,
                    sections: [
                        {
                            title: 'Introduction',
                            sentences: [
                                {
                                    text: 'Welcome to our product demonstration.',
                                    startTime: 0,
                                    endTime: 5,
                                    id: 1,
                                },
                                {
                                    text: "Today, we'll be showcasing our latest innovation.",
                                    startTime: 5,
                                    endTime: 15,
                                    id: 2,
                                },
                            ],
                        },
                        {
                            title: 'Key Features',
                            sentences: [
                                {
                                    text: 'Our product has three main features.',
                                    startTime: 15,
                                    endTime: 20,
                                    id: 3,
                                },
                                {
                                    text: "First, it's incredibly easy to use.",
                                    startTime: 20,
                                    endTime: 25,
                                    id: 4,
                                },
                                {
                                    text: "Second, it's highly efficient.",
                                    startTime: 25,
                                    endTime: 30,
                                    id: 5,
                                },
                                {
                                    text: "And third, it's cost-effective.",
                                    startTime: 30,
                                    endTime: 39,
                                    id: 6,
                                },
                            ],
                        },
                        {
                            title: 'Demonstration',
                            sentences: [
                                {
                                    text: 'Let me show you how it works.',
                                    startTime: 40,
                                    endTime: 45,
                                    id: 7,
                                },
                                {
                                    text: 'Simply press this button to start.',
                                    startTime: 45,
                                    endTime: 50,
                                    id: 8,
                                },
                                {
                                    text: 'The interface is intuitive and use-friendly.',
                                    startTime: 50,
                                    endTime: 60,
                                    id: 9,
                                },
                            ],
                        },
                        {
                            title: 'Conclusion',
                            sentences: [
                                {
                                    text: 'In conclusion, our product is a game-changer.',
                                    startTime: 60,
                                    endTime: 65,
                                    id: 10,
                                },
                                {
                                    text: "We're excited to bring this to market.",
                                    startTime: 65,
                                    endTime: 70,
                                    id: 11,
                                },
                                {
                                    text: 'Thank you for your attention.',
                                    startTime: 70,
                                    endTime: 75,
                                    id: 12,
                                },
                            ],
                        },
                    ],
                    suggestedHighlights: [2, 8, 9, 11],
                }),
            1000
        );
    });
};
