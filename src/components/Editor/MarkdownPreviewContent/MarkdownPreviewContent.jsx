import React from "react";
import {EditorContext} from "../../../contexts/EditorContext";
import Markdown from "marked-react"

export default function MarkdownPreviewContent() {
    const editorContext = React.useContext(EditorContext);
    const currentBlogContent = editorContext.snippetData.contents.blogContent;
    const [curState, setCurState] = React.useState("");

    React.useEffect(() => {
        const output = <Markdown>{currentBlogContent}</Markdown>
        setCurState(output);
    }, [currentBlogContent]);

    return curState;
}