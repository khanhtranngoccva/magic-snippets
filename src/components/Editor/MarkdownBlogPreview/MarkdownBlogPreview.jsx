import PreviewFrame from "../PreviewFrame/PreviewFrame";
import classes from "./MarkdownBlogPreview.module.css"
import WindowPane from "../../WindowPane/WindowPane";
import MarkdownPreviewContent from "../MarkdownPreviewContent/MarkdownPreviewContent";
import React from "react";

export default function MarkdownBlogPreview(props) {
    const previewFrame = React.useMemo(() => {
        return <PreviewFrame></PreviewFrame>;
    }, []);

    return <div className={classes.container}>
        <WindowPane title="Blog preview"></WindowPane>
        <div className={classes.windowInner}>
            <div className={classes.previewFrameContainer}>
                {previewFrame}
            </div>
            <div className={classes.markdownPreviewContainer}>
                <MarkdownPreviewContent></MarkdownPreviewContent>
            </div>
        </div>
    </div>
}