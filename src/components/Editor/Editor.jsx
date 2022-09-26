import EditorContextWrapper, {EditorContext} from "../../contexts/EditorContext";
import CodeWindow from "../CodeWindow/CodeWindow";
import {javascript} from "@codemirror/lang-javascript";
import {css} from "@codemirror/lang-css";
import {html} from "@codemirror/lang-html";
import classes from "./Editor.module.css";
import PreviewFrame from "../PreviewFrame/PreviewFrame";

let htmlExt = html();
let cssExt = css();
let jsExt = javascript();

export default function Editor() {
    return <EditorContextWrapper>
        <div className={classes.container}>
            <div className={classes.codeWindowContainer}>
                <CodeWindow field="HTMLSnippet" extensions={[htmlExt]} title="HTML"></CodeWindow>
                <CodeWindow field="CSSSnippet" extensions={[cssExt]} title="CSS"></CodeWindow>
                <CodeWindow field="JSSnippet" extensions={[jsExt]} title="JavaScript"></CodeWindow>
            </div>
            <PreviewFrame></PreviewFrame>
        </div>
    </EditorContextWrapper>
}