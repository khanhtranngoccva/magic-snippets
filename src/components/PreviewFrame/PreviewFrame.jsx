import React from "react";
import {EditorContext} from "../../contexts/EditorContext";
import classes from "./PreviewFrame.module.css";

export default function PreviewFrame() {
    const snippetContext = React.useContext(EditorContext);
    const iframeName = "__previewIframe";
    const timeoutRef = React.useRef(null);
    const formRef = React.useRef(null);
    const {snippetData} = snippetContext;

    React.useEffect(() => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            formRef.current.submit();
        }, 1000);
        return () => {
            clearTimeout(timeoutRef.current);
        }
    }, [snippetData.contents]);

    return <div className={classes.container}>
        <form target={iframeName} hidden={true} action={"/api/snippets/preview"} method={"POST"} ref={formRef}>
            <input name="HTMLSnippet" value={snippetData._contents.HTMLSnippet || ""}/>
            <input name="CSSSnippet" value={snippetData._contents.CSSSnippet || ""}/>
            <input name="JSSnippet" value={snippetData._contents.JSSnippet || ""}/>
        </form>
        <iframe className={classes.previewFrame} name={iframeName}></iframe>
    </div>;
}