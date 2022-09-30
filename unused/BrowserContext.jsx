import React from "react";
import api from "../src/helpers/api";

// export const BrowserContext = React.createContext({
//     snippetPages: {},
// });

// export default function BrowserContextWrapper(props) {
//     const [snippetBrowseResult, setSnippetBrowseResult] = React.useState({
//         snippetPages: {},
//     });
//
//     const snippetPages = snippetBrowseResult.snippetPages;
//
//     async function getPage(page=1) {
//         page ??= 1;
//         if (!snippetPages[page]) {
//             const query = new URLSearchParams({
//                 page,
//             }).toString();
//             const url = "/api/snippets/browse?" + query;
//             snippetPages[page] = (await api.getJSON(url)).data;
//             setSnippetBrowseResult({snippetPages});
//         }
//     }
//
//     const contextObject = {
//         snippetPages,
//     };
//
//     return <BrowserContext.Provider value={contextObject}>
//         {props.children}
//     </BrowserContext.Provider>
// }