import React from "react";
import {EditorContext} from "../../../contexts/EditorContext";
import classes from "./PreviewFrame.module.css";

let iFrameCounter = 0;

export default function PreviewFrame(props) {
    const snippetContext = React.useContext(EditorContext);
    const iframeName = React.useMemo(() => {
        iFrameCounter++;
        console.log("__previewIframe_" + iFrameCounter);
        return "__previewIframe_" + iFrameCounter;
    }, []);
    const timeoutRef = React.useRef(null);
    const formRef = React.useRef(null);
    const {snippetData} = snippetContext;

    React.useEffect(() => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            formRef.current.submit();
        }, 500);
        return () => {
            clearTimeout(timeoutRef.current);
        }
    }, [
        snippetData.contents.HTMLSnippet,
        snippetData.contents.CSSSnippet,
        snippetData.contents.JSSnippet,
    ]);

    return <div className={classes.container}>
        <form target={iframeName} hidden={true} action={"/api/snippets/preview"} method={"POST"} ref={formRef}>
            <input name="HTMLSnippet" value={snippetData._contents.HTMLSnippet || ""} readOnly={true}/>
            <input name="CSSSnippet" value={snippetData._contents.CSSSnippet || ""} readOnly={true}/>
            <input name="JSSnippet" value={snippetData._contents.JSSnippet || ""} readOnly={true}/>
        </form>
        <iframe className={`${classes.previewFrame} ${props.className}`} name={iframeName}></iframe>
    </div>;
}