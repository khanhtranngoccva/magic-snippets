import React from "react";
import {useParams} from "react-router-dom";
import api from "../helpers/api";

export const EditorContext = React.createContext({
    snippetData: {
        _name: null,
        name: null,
        _contents: {
            HTMLSnippet: null,
            CSSSnippet: null,
            JSSnippet: null,
            blogContent: null,
        },
        contents: {},
    },
    snippetLastSave: {
        _name: null,
        creator: null,
        _contents: {
            HTMLSnippet: null,
            CSSSnippet: null,
            JSSnippet: null,
            blogContent: null,
        },
    },
    currentField: "HTMLSnippet",
    snippetID: null,
    saveSnippet: null,
    deleteSnippet: null,
    blogMode: false,
    setBlogMode: undefined,
});

export default function EditorContextWrapper(props) {
    const params = {useParams};

    const [blogMode, setBlogMode] = React.useState(false);
    const [snippetLastSave, setSnippetLastSave] = React.useState({
        _name: null,
        creator: null,
        _contents: {},
    });
    const [snippetData, setSnippetData] = React.useState({
        _name: null,
        _contents: {},
    });
    const [currentField, setCurrentField] = React.useState("HTMLSnippet");

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
    try {
        Object.defineProperty(snippetData, "name", {
            get() {
                return this._name;
            },
            set(data) {
                this._name = data;
                setSnippetData({...this});
            }
        })
    } catch (e) {}

    const contextObject = {
        saveSnippet,
        deleteSnippet,
        snippetData,
        snippetLastSave,
        currentField,
        setCurrentField,
        blogMode,
        setBlogMode,
        snippetID: params.snippetID ?? null,
    }

    return <EditorContext.Provider value={contextObject}>
        {props.children}
    </EditorContext.Provider>
}