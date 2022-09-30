import classes from "./DirectLink.module.css";

export default function DirectLink(props) {
    return <a {...props} className={`${classes.link} ${props.className || ""}`}></a>
}