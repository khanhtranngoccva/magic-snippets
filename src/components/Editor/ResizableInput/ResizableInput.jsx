import classes from "./ResizableInput.module.css";
import React from "react";

export default function ResizableInput(props) {
    const [spanState, setSpanState] = React.useState(null);

    const inputRef = React.useRef(null);

    function update(...args) {
        setSpanState(inputRef.current.value || inputRef.current.placeholder);
        if (props.onInput) {
            props.onInput(inputRef.current.value);
        }
    }

    React.useEffect(() => {
        setSpanState(inputRef.current.value || inputRef.current.placeholder);
    }, [props.defaultValue]);

    return <div className={`${classes.inputContainer}`}>
        {/*<span className={`${classes.reusableInputSpan} ${props.className || ""}`}>assssssssssa</span>*/}
        <pre className={`${classes.reusableInputSpan} ${props.className || ""}`}>{`${spanState}`}</pre>
        <input {...props} onInput={update} ref={inputRef} className={`${classes.reusableInput} ${props.className || ""}`}></input>
    </div>
}