import React from "react";
import {useParams} from "react-router-dom";
import api from "../helpers/api";
import {useNavigate} from "react-router-dom";

export const EditorContext = React.createContext({
    snippetData: {
        _contents: {
            name: null,
            HTMLSnippet: null,
            CSSSnippet: null,
            JSSnippet: null,
            blogContent: null,
        },
        contents: {},
    },
    snippetLastSave: {
        creator: null,
        _contents: {
            name: null,
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
    createSnippet: null,
    updateSnippet: null,
    remixSnippet: null,
    blogMode: false,
    setBlogMode: null,
});

export default function EditorContextWrapper(props) {
    const navigate = useNavigate();
    const params = useParams();

    const [blogMode, setBlogMode] = React.useState(false);
    const [snippetLastSave, setSnippetLastSave] = React.useState({
        creator: null,
        _contents: {},
    });
    const [snippetData, setSnippetData] = React.useState({
        _contents: {},
    });
    const [currentField, setCurrentField] = React.useState("HTMLSnippet");

    React.useEffect(() => {
        if (params.snippetID) {
            api.getJSON(`/api/snippets/view/${params.snippetID}`).then(result => {
                setSnippetLastSave({
                    creator: result.data.creator,
                    _contents: {
                        name: result.data.name,
                        HTMLSnippet: result.data.HTMLSnippet,
                        CSSSnippet: result.data.CSSSnippet,
                        JSSnippet: result.data.JSSnippet,
                        blogContent: result.data.blogContent,
                    }
                })
            })
        }
    }, [params.snippetID]);
    React.useEffect(() => {
        const result = JSON.parse(JSON.stringify(snippetLastSave));
        setSnippetData(result);
    }, [snippetLastSave]);

    async function deleteSnippet() {

    }
    async function createSnippet() {
        try {
            let result = await api.sendJSON("/api/snippets/create", snippetData.contents);
            if (result.success) {
                navigate(`/edit/${result.data._id}`);
            }
            return result.success;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
    async function remixSnippet() {
        try {
            let result = await api.sendJSON(`/api/snippets/remix/${params.snippetID}`, {});
            if (result.success) {
                navigate(`/edit/${result.data._id}`);
            }
            return result.success;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
    async function editSnippet() {
        try {
            const result = await api.sendJSON(`/api/snippets/edit/${params.snippetID}`, snippetData.contents, {
                method: "PUT",
            });
            console.log(result);
            return result.success;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
    async function saveSnippet() {
        if (!params.snippetID) {
            return await createSnippet();
        } else {
            return await editSnippet();
        }
    }

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
        createSnippet,
        editSnippet,
        remixSnippet,
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