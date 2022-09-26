import api from "../helpers/api";
import React from "react";

export const UserContext = React.createContext({
    userInfo: undefined,
});

export function UserContextWrapper(props) {
    const [userInfo, setUserInfo] = React.useState(null);

    React.useEffect(() => {
        api.getJSON("/api/auth/currentUser").then(result => {
            console.log(result);
            setUserInfo(result.data);
        });
    }, []);

    const contextObject = {
        userInfo,
    }

    console.log(contextObject);
    return <UserContext.Provider value={contextObject}>
        {props.children}
    </UserContext.Provider>;
}
