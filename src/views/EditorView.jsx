import Editor from "../components/Editor/Editor";
import EditorContextWrapper from "../contexts/EditorContext";

export default function EditorView() {
    return <EditorContextWrapper>
        <Editor></Editor>
    </EditorContextWrapper>
}