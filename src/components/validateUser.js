import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./navbar";

const ValidateUser = (props) => {

    const history = useHistory();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkLoggedInUser = async () => {
        let loginData = localStorage.getItem('loginStatus');
        if(loginData && JSON.parse(loginData)) {
            let { signedIn } = JSON.parse(loginData); 
            if(signedIn) {
                setLoggedIn(true);
                setIsLoading(false);
            } else {
                history.push('/');
            }
        } else {
            history.push('/');
        }
    };

    useEffect(() => {
        checkLoggedInUser();
    }, []);

    return (
        <>
            {isLoading || !isLoggedIn ?
                null:
                <>
                    <Navbar />
                    {props.children}
                </>
            }   
        </>
    );
};

export default ValidateUser;
