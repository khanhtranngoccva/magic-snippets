import api from "../helpers/api";
import React from "react";

export const UserContext = React.createContext({
    userInfo: undefined,
});

export function UserContextWrapper(props) {
    const [userInfo, setUserInfo] = React.useState(null);

    React.useEffect(() => {
        api.getJSON("/api/auth/currentUser").then(result => {
            setUserInfo(result.data);
        });
    }, []);

    const contextObject = {
        userInfo,
    }

    return <UserContext.Provider value={contextObject}>
        {props.children}
    </UserContext.Provider>;
}
