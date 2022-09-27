import React from "react";
import {EditorContext} from "../../../contexts/EditorContext";
import CodeMirror from "@uiw/react-codemirror";
import {darcula} from "@uiw/codemirror-theme-darcula";
import classes from "./CodeWindow.module.css";
import WindowPane from "../../WindowPane/WindowPane";

export default function CodeWindow(props) {
    const editorContext = React.useContext(EditorContext);
    const {snippetData, snippetLastSave} = editorContext;

    if (!props.field) {
        throw new Error("This needs a field to sync!");
    }

    const update = React.useCallback((value) => {
        snippetData.contents[props.field] = value;
    }, [props.field]);

    return <div className={`${classes.windowContainer} ${props.className || ""}`}>
        <WindowPane title={props.title}></WindowPane>
        <CodeMirror className={classes.windowInner}
                    width={"100%"}
                    height={"100%"}
                    value={snippetData._contents[props.field] ?? ""}
                    theme={darcula}
                    extensions={props.extensions}
                    onChange={update}>
        </CodeMirror>
    </div>
}