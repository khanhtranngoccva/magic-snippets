import Navbar from "../Viewer/Navbar/Navbar";
import classes from "./Viewer.module.css";
import React from "react";
import PreviewFrame from "../Editor/PreviewFrame/PreviewFrame";
import MarkdownViewer from "./MarkdownViewer/MarkdownViewer";

export default function Viewer() {
    return <div className={classes.flexOverlayColumn}>
        <Navbar></Navbar>
        <div className={`${classes.flexOverlayColumn} ${classes.scrollable} ${classes.relative}`}>
            <div className={`${classes.flexOverlayColumn}`}>
                <PreviewFrame></PreviewFrame>
                <div className={`${classes.scrollDownBanner} fa-fade`}>
                    <p>Scroll down to read more</p>
                    <i className="fa-solid fa-arrow-down"></i>
                </div>
            </div>
            <MarkdownViewer></MarkdownViewer>
        </div>
    </div>
}