import classes from "./LikeButton.module.css";
import ActionButton from "../../ActionButton/ActionButton";
import React from "react";
import api from "../../../helpers/api";
import {UserContext} from "../../../contexts/UserContext";

export default function LikeButton(props) {
    const userContext = React.useContext(UserContext);

    const snippetID = props.snippetID;

    const [isLiked, setIsLiked] = React.useState();
    const [likeCount, setLikeCount] = React.useState();

    const intervalRef = React.useRef(null);

    function getIsLiked() {
        if (snippetID) {
            api.getJSON(`/api/snippets/like/${snippetID}`).then(result => {
                setIsLiked(result.data.like);
            });
        }
    }

    function getLikeCount() {
        if (snippetID) {
            api.getJSON(`/api/snippets/likes/${snippetID}`).then(result => {
                setLikeCount(result.data.likes);
            });
        }
    }

    React.useEffect(() => {
        clearInterval(intervalRef.current);
        getIsLiked();
        getLikeCount();
        setInterval(getLikeCount, 5000);
        return () => clearInterval(intervalRef.current);
    }, [snippetID]);

    async function setLike(mode) {
        if (userContext.userInfo === null) {
            location.replace("/api/auth/google");
            return;
        }
        if (snippetID) {
            api.sendJSON(`/api/snippets/like/${snippetID}`, {
                like: !!mode,
            }, {
                method: "PUT",
            });
            if (mode) {
                setLikeCount(likeCount + 1);
            } else {
                setLikeCount(likeCount - 1);
            }
            setIsLiked(mode);
        }
    }

    // Not loaded yet.
    if (isLiked === undefined || likeCount === undefined) {
        return <ActionButton className={`${classes.button}`} onClick={() => setLike(true)}>
            <i className="fas fa-heart"></i>
            <span>0</span>
        </ActionButton>
    } else {
        if (isLiked) {
            return <ActionButton className={`${classes.button} ${classes.liked}`} onClick={() => setLike(false)}>
                <i className="fas fa-heart"></i>
                <span>{likeCount}</span>
            </ActionButton>
        } else {
            return <ActionButton className={`${classes.button}`} onClick={() => setLike(true)}>
                <i className="fas fa-heart"></i>
                <span>{likeCount}</span>
            </ActionButton>
        }
    }
}