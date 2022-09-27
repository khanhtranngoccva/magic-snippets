import classes from "./WindowPane.module.css";
import React from "react";

export default function WindowPane(props) {
    return <div className={classes.windowPane}>
        <div className={classes.decorativeButton}></div>
        <div className={classes.decorativeButton}></div>
        <div className={classes.decorativeButton}></div>
        <h2>{props.title}</h2>
    </div>
}