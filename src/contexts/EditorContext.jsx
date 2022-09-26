import React from "react";
import {useParams} from "react-router-dom";
import api from "../helpers/api";

export const EditorContext = React.createContext({
    snippetData: {
        name: null,
        _contents: {
            HTMLSnippet: null,
            CSSSnippet: null,
            JSSnippet: null,
        },
        contents: {},
    },
    snippetLastSave: {
        name: null,
        _contents: {
            HTMLSnippet: null,
            CSSSnippet: null,
            JSSnippet: null,
        },
    },
    saveSnippet: null,
    deleteSnippet: null,
});

export default function EditorContextWrapper(props) {
    const params = {useParams};

    const [snippetLastSave, setSnippetLastSave] = React.useState({
        name: null,
        _contents: {
            HTMLSnippet: null,
            CSSSnippet: null,
            JSSnippet: null,
        },
    });
    const [snippetData, setSnippetData] = React.useState({
        name: null,
        _contents: {
            HTMLSnippet: null,
            CSSSnippet: null,
            JSSnippet: null,
        },
        contents: {},
    });

    React.useEffect(() => {
        setSnippetData(JSON.parse(JSON.stringify(snippetLastSave)));
    }, [snippetLastSave]);

    const deleteSnippet = React.useCallback(async (data) => {

    }, [params.snippetID]);

    const saveSnippet = React.useCallback(async (data) => {
        if (!params.snippetID) {
            await api.sendJSON("/api/snippets/create", {

            });
        } else {
            await api.sendJSON("/api/snippets/edit", {

            }, {
                method: "PUT",
            });
        }
    }, [params.snippetID]);

    snippetData.contents = new Proxy(snippetData._contents, {
        get(target, key) {
            return target[key];
        },
        set(target, key, val) {
            target[key] = val;
            setSnippetData({...snippetData});
            return true;
        }
    });

    const contextObject = {
        saveSnippet,
        deleteSnippet,
        snippetData,
        snippetLastSave,
    }

    return <EditorContext.Provider value={contextObject}>
        {props.children}
    </EditorContext.Provider>
}