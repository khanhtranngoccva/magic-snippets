import ActionButton from "../ActionButton/ActionButton";
import React from "react";
import classes from "./Pagination.module.css";

export default function Pagination(props) {
    const pageItems = [];

    for (let i = props.lowestPage; i <= props.highestPage; i++) {
        const pageButton = <ActionButton onClick={() => props.onClick(i)} key={i} className={i === props.currentPage ? classes.active : ""}>
            {i}
        </ActionButton>
        pageItems.push(pageButton);
    }

    return <div className={`${classes.pagination}`}>
        {pageItems}
    </div>
}