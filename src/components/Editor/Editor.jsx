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
import ActionButton from "../ActionButton/ActionButton";

let htmlExt = html();
let cssExt = css();
let jsExt = javascript();
let markdownExt = markdown();

const codeWindowData = [
    {
        field: "HTMLSnippet",
        extensions: [htmlExt],
        title: "HTML",
    },
    {
        field: "CSSSnippet",
        extensions: [cssExt],
        title: "CSS",
    },
    {
        field: "JSSnippet",
        extensions: [jsExt],
        title: "JS",
    },
];

function EditorView1() {
    const [currentTab, setCurrentTab] = React.useState("HTMLSnippet");

    const codeWindows = codeWindowData.map(data => {
        return <CodeWindow key={data.field} field={data.field} extensions={data.extensions} title={data.title}
                    className={`${classes.codeWindow} ${currentTab === data.field ? classes.smallScreenVisible : ""}`}>
        </CodeWindow>
    });

    const selectCodeButtons = codeWindowData.map(data => {
       return <ActionButton key={data.field} className={`${classes.selectCodeButton} ${data.field === currentTab ? classes.selected : ""}`} onClick={() => setCurrentTab(data.field)}>
           {data.title}
       </ActionButton>
    });

    return <div className={classes.fullScreenFlexColumn}>
        <div className={classes.selectCodeContainer}>
            {selectCodeButtons}
        </div>
        <div className={classes.codeWindowContainer}>
            {codeWindows}
        </div>
        <div className={classes.fullScreenFlex}>
            <div className={classes.fullScreenFlex}>
                <PreviewFrame></PreviewFrame>
            </div>
        </div>
    </div>
}

function EditorView2(props) {
    return <div className={`${props.className || ""} ${classes.fullScreenFlex}`}>
        <div className={classes.blogEditorContainer}>
            <div className={classes.containerElement}>
                <CodeWindow field="blogContent" extensions={[markdownExt]} title="Edit blog contents" className={`${classes.codeWindow} ${classes.blogWindow}`}></CodeWindow>
            </div>
            <div className={classes.containerElement}>
                <MarkdownPreview extensions={[markdownExt]} title="Edit blog contents" className={`${classes.codeWindow} ${classes.blogWindow}`}></MarkdownPreview>
            </div>
        </div>
    </div>;
}

export default function Editor() {
    const snippetContext = React.useContext(EditorContext);

    let currentUI;
    if (!snippetContext.blogMode) {
        currentUI = <div className={`${classes.editorContainer} ${classes.fullScreenFlex}`}>
            <EditorView1></EditorView1>
            <EditorView2 className={`${classes.blogEditorOverlay} ${classes.swipeHidden}`}></EditorView2>
        </div>;
    } else {
        currentUI = <div className={`${classes.editorContainer} ${classes.fullScreenFlex}`}>
            <EditorView1></EditorView1>
            <EditorView2 className={`${classes.blogEditorOverlay}`}></EditorView2>
        </div>;
    }

    return <div className={classes.container}>
        <Navbar></Navbar>
        {currentUI}
    </div>;
}