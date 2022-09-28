import classes from "./LikeButton.module.css";
import ActionButton from "../../ActionButton/ActionButton";
import React from "react";
import {UserContext} from "../../../contexts/UserContext";
import {useParams} from "react-router-dom";
import api from "../../../helpers/api";

export default function LikeButton() {
    const userContext = React.useContext(UserContext);
    const params = useParams();

    const [isLiked, setIsLiked] = React.useState();
    const [likeCount, setLikeCount] = React.useState();

    const intervalRef = React.useRef(null);

    function getIsLiked() {
        if (params.snippetID) {
            api.getJSON(`/api/snippets/like/${params.snippetID}`).then(result => {
                setIsLiked(result.data.like);
            });
        }
    }

    function getLikeCount() {
        if (params.snippetID) {
            api.getJSON(`/api/snippets/likes/${params.snippetID}`).then(result => {
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
    }, [params.snippetID]);

    async function setLike(mode) {
        if (params.snippetID) {
            api.sendJSON(`/api/snippets/like/${params.snippetID}`, {
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