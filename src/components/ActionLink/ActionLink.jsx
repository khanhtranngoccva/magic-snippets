import classes from "./ActionLink.module.css";
import {Link} from "react-router-dom";

export default function ActionLink(props) {
    return <Link {...props} className={`${classes.link} ${props.className || ""}`}></Link>
}