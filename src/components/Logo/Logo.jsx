import classes from "./Logo.module.css";
import {Link} from "react-router-dom";

export default function Logo(props) {
    return <Link to={"/"}>
        <span className={`${classes.logo} ${props.className || ""}`}>{"<✨>"}</span>
    </Link>
}