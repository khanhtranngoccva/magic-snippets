import React from "react";
import classes from "./PreviewFrame.module.css";
import {Link} from "react-router-dom";

let iFrameCounter = 0;

export default function PreviewFrame(props) {
    iFrameCounter++;
    const iframeName = "__browserPreviewIframe_" + iFrameCounter;

    const formRef = React.useRef(null);
    const iframeRef = React.useRef(null);

    const contents = props.snippet;

    React.useEffect(() => {
        /**
         * @type {HTMLElement|null}
         */
        const element = iframeRef.current;
        if (element) {
            function resize() {
                let scaleY, scaleX;
                if (props.fixedHeight) {
                    scaleY = (element.parentElement.offsetHeight / props.fixedHeight) || 1;
                }
                if (props.fixedWidth) {
                    scaleX = (element.parentElement.offsetWidth / props.fixedWidth) || 1;
                }
                element.style.transform = `scaleY(${scaleY}) scaleX(${scaleX})`;
            }
            resize();
            window.addEventListener("resize", resize);
            return () => {
                window.removeEventListener("resize", resize);
            }
        }
    }, [iframeRef.current, props]);

    React.useEffect(() => {
        formRef.current?.submit();
    }, []);

    return <div className={classes.container}>
        <form target={iframeName} hidden={true} action={"/api/snippets/preview"} method={"POST"} ref={formRef}>
            <input name="HTMLSnippet" value={contents.HTMLSnippet || ""} readOnly={true}/>
            <input name="CSSSnippet" value={contents.CSSSnippet || ""} readOnly={true}/>
            <input name="JSSnippet" value={contents.JSSnippet || ""} readOnly={true}/>
        </form>
        <iframe className={`${classes.previewFrame} ${props.className}`} name={iframeName} ref={iframeRef}
                sandbox={"allow-forms allow-modals allow-pointer-lock allow-same-origin allow-scripts allow-presentation"}
                loading="lazy"></iframe>
        <Link to={`/view/${props.snippet._id}`} className={classes.iframeLink}></Link>
    </div>;
}