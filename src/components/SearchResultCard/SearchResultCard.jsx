import classes from "./SearchResultCard.module.css";
import PreviewFrame from "./PreviewFrame/PreviewFrame";
import LikeButton from "./LikeButton/LikeButton";
import {Link} from "react-router-dom";

export default function SearchResultCard(props) {

    return <li className={`${classes.flexOverlayColumn} ${classes.card}`}>
        <div className={classes.frameContainer}>
            <PreviewFrame snippet={props.snippet} className={classes.frame}
            fixedWidth={1920} fixedHeight={1080}></PreviewFrame>
        </div>
        <div className={classes.snippetInfo}>
            <div className={classes.snippetNameContainer}>
                <Link to={`/view/${props.snippet._id}`}>
                    <h2 className={classes.snippetName}>
                        <span>{props.snippet.name}</span>
                    </h2>
                </Link>
            </div>
            <LikeButton snippetID={props.snippet._id}></LikeButton>
        </div>
    </li>
}