import Viewer from "../components/Viewer/Viewer.jsx";
import EditorContextWrapper from "../contexts/EditorContext";

export default function ViewerView() {
    return <EditorContextWrapper>
        <Viewer></Viewer>
    </EditorContextWrapper>
}