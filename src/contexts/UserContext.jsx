import api from "../helpers/api";
import React from "react";

export const UserContext = React.createContext({
    userInfo: {
        id: null,
        name: null,
        email: null,
        userName: null,
        displayName: null,
        profilePicture: null,
    },
    userInfoFetched: false,
});

export function UserContextWrapper(props) {
    const [userInfo, setUserInfo] = React.useState(null);
    const [userInfoFetched, setUserInfoFetched] = React.useState(false);

    React.useEffect(() => {
        api.getJSON("/api/auth/currentUser").then(result => {
            setUserInfo(result.data);
            setUserInfoFetched(true);
        });
    }, []);

    const contextObject = {
        userInfo,
        userInfoFetched,
    }

    return <UserContext.Provider value={contextObject}>
        {props.children}
    </UserContext.Provider>;
}
