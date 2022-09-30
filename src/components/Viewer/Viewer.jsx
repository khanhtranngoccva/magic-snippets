import Navbar from "../Viewer/Navbar/Navbar";
import classes from "./Viewer.module.css";
import React from "react";
import PreviewFrame from "../Editor/PreviewFrame/PreviewFrame";
import MarkdownViewer from "./MarkdownViewer/MarkdownViewer";
import {EditorContext} from "../../contexts/EditorContext";

export default function Viewer() {
    const editorContext = React.useContext(EditorContext);

    let hint, markdown;
    if (editorContext.snippetLastSave._contents.blogContent) {
        hint = <div className={`${classes.scrollDownBanner} fa-fade`}>
            <p>Scroll down to read more</p>
            <i className="fa-solid fa-arrow-down"></i>
        </div>;
        markdown = <MarkdownViewer></MarkdownViewer>
    }

    return <div className={classes.flexOverlayColumn}>
        <Navbar></Navbar>
        <div className={`${classes.flexOverlayColumn} ${classes.scrollable} ${classes.relative}`}>
            <div className={`${classes.flexOverlayColumn}`}>
                <PreviewFrame></PreviewFrame>
                {hint}
            </div>
            {markdown}
        </div>
    </div>
}