import React from "react";
import api from "../../helpers/api";
import SearchResultCard from "../SearchResultCard/SearchResultCard";
import Navbar from "./Navbar/Navbar";
import classes from "./SnippetBrowser.module.css";
import Pagination from "../Pagination/Pagination";

export default function SnippetBrowser(props) {
    const [page, setPage] = React.useState(1);
    const [searchResult, setSearchResult] = React.useState();

    function getPageData() {
        api.getJSON(`/api/snippets/browse/newest?page=${page}`).then(result => {
            setSearchResult(result.data);
        });
    }

    React.useEffect(getPageData, [page]);

    console.log(searchResult);

    // Loader.
    if (!searchResult) {
        return <div className={`${classes.flexOverlayColumn} ${classes.snippetList}`}>
            <Navbar></Navbar>
            <div className={classes.loader}></div>
        </div>;
    } else {
        const currentPage = searchResult["page"];
        const lowestPage = Math.max(1, searchResult["page"] - 5);
        const highestPage = Math.min(searchResult["page"] + 5, searchResult["totalPages"]);

        const searchResultCards = searchResult["docs"].map(snippet => {
            return <SearchResultCard snippet={snippet} key={snippet._id}></SearchResultCard>
        });
        return <div className={`${classes.flexOverlayColumn} ${classes.snippetList}`}>
            <Navbar></Navbar>
            <div className={`${classes.searchResultCardContainer}`}>
                <ul className={classes.searchResultCardList}>
                    {searchResultCards}
                </ul>
            </div>
            <Pagination lowestPage={lowestPage} highestPage={highestPage} onClick={setPage} currentPage={currentPage}></Pagination>
        </div>;
    }
}