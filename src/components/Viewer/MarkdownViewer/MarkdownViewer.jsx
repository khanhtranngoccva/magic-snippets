import MarkdownPreviewContent from "../../MarkdownPreviewContent/MarkdownPreviewContent";
import React from "react";
import classes from "./MarkdownViewer.module.css";
import "github-markdown-css/github-markdown-dark.css";

export default function MarkdownViewer() {
    return <div className={`${classes.markdownViewer} markdown-body`}>
        <MarkdownPreviewContent></MarkdownPreviewContent>
    </div>;
}