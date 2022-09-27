import {EditorContext} from "../../contexts/EditorContext";
import CodeWindow from "./CodeWindow/CodeWindow";
import {javascript} from "@codemirror/lang-javascript";
import {css} from "@codemirror/lang-css";
import {html} from "@codemirror/lang-html";
import {markdown} from "@codemirror/lang-markdown";
import classes from "./Editor.module.css";
import PreviewFrame from "./PreviewFrame/PreviewFrame";
import Navbar from "./Navbar/Navbar";
import React from "react";
import MarkdownPreview from "./MarkdownBlogPreview/MarkdownBlogPreview";

let htmlExt = html();
let cssExt = css();
let jsExt = javascript();
let markdownExt = markdown();

function EditorView1() {
    const previewFrame = React.useMemo(() => {
        return <PreviewFrame></PreviewFrame>
    }, []);

    return <div className={classes.container}>
        <Navbar></Navbar>
        <div className={classes.codeWindowContainer}>
            <CodeWindow field="HTMLSnippet" extensions={[htmlExt]} title="HTML" className={classes.codeWindow}></CodeWindow>
            <CodeWindow field="CSSSnippet" extensions={[cssExt]} title="CSS" className={classes.codeWindow}></CodeWindow>
            <CodeWindow field="JSSnippet" extensions={[jsExt]} title="JavaScript" className={classes.codeWindow}></CodeWindow>
        </div>
        {previewFrame}
    </div>;
}

function EditorView2() {
    return <div className={classes.container}>
        <Navbar></Navbar>
        <div className={classes.blogEditorContainer}>
            <div className={classes.containerElement}>
                <CodeWindow field="blogContent" extensions={[markdownExt]} title="Edit blog contents" className={`${classes.codeWindow} ${classes.blogWindow}`}></CodeWindow>
            </div>
            <div className={classes.containerElement}>
                <MarkdownPreview field="blogContent" extensions={[markdownExt]} title="Edit blog contents" className={`${classes.codeWindow} ${classes.blogWindow}`}></MarkdownPreview>
            </div>
        </div>
    </div>;
}

export default function Editor() {
    const snippetContext = React.useContext(EditorContext);

    const view1 = React.useMemo(() => {
        return <EditorView1></EditorView1>;
    }, []);
    const view2 = React.useMemo(() => {
        return <EditorView2></EditorView2>;
    }, []);

    let currentUI;
    if (!snippetContext.blogMode) {
        currentUI = view1;
    } else {
        if (!snippetContext.snippetLastSave.creator) {
            currentUI = view2;
        }
    }

    return currentUI;
}