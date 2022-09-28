import Editor from "../components/Editor/Editor";
import EditorContextWrapper from "../contexts/EditorContext";
import {UserContext} from "../contexts/UserContext";
import React from "react";

export default function EditorView() {
    const {userInfoFetched, userInfo} = React.useContext(UserContext);

    if (!userInfo && userInfoFetched) {
        location.replace("/api/auth/google");
    }

    return <EditorContextWrapper>
        <Editor></Editor>
    </EditorContextWrapper>
}