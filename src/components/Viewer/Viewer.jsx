import Navbar from "../Viewer/Navbar/Navbar";
import classes from "./Viewer.module.css";
import React from "react";

export default function Viewer() {
    return <div className={classes.flexOverlayColumn}>
        <Navbar></Navbar>
        <div className={classes.flexOverlay}></div>
    </div>
}