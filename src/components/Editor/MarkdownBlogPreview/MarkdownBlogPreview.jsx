import PreviewFrame from "../PreviewFrame/PreviewFrame";
import classes from "./MarkdownBlogPreview.module.css"
import WindowPane from "../../WindowPane/WindowPane";
import MarkdownPreviewContent from "../../MarkdownPreviewContent/MarkdownPreviewContent";
import React from "react";
import "github-markdown-css/github-markdown-dark.css";

export default function MarkdownBlogPreview() {
    return <div className={classes.container}>
        <WindowPane title="Blog preview"></WindowPane>
        <div className={classes.windowInner}>
            <div className={classes.previewFrameContainer}>
                <PreviewFrame></PreviewFrame>
            </div>
            <div className={`${classes.markdownPreviewContainer} markdown-body`}>
                <MarkdownPreviewContent></MarkdownPreviewContent>
            </div>
        </div>
    </div>
}