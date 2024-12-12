# React + TypeScript + Vite

Project Intro: Leveraging AI to help users create highlighted clips with transcript from uploaded videos.

Features:

1. Video Upload(mock)
2. AI API(mock)
3. Edit Panel(support updating timeframe, setting highlighted clips, and auto scroll)
4. Preview Panel(support playing, pausing, seeking videos)

Technical choices:

1. React CSR -> This tool is small and highly interactive. Also, the requirement doesn't mention that SEO is important. Therefore, I choose CSR to implement this tool.
2. Vite -> To streamline the gh-pages deployment process and improve devloper experience, I choose Vite so that I could focus more on the features.
3. useState for state managment -> Since this is a small demo, I think Redux would be too complicated for this project. However, if I had more time, I would refacrtor with useContext to make codes more readable.
4. Other considerations(not implement or try them due to lack of time): (1) I think using virtualized list to render EditPanel UI might be a good solution as there might be a lot transcript DOM nodes and the performance would decrease a lot. (2) For PreviewPanel UI, we need to detect if the timeframe indicator is in the highlighted blocks. I think maybe using interseciton observer here would be a better approach for performance but I'm not sure how to do it.

See this in Localhost:

download the repo -> yarn install -> yarn dev

See this in production:

https://tingyuwong.github.io/video-highlighting-tool/

```

```
