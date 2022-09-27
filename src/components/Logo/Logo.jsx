import classes from "./Logo.module.css";

export default function Logo(props) {
    return <span className={`${classes.logo} ${props.className || ""}`}>{"<✨>"}</span>
}