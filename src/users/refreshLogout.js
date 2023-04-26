import React, { useState } from "react";
import { login } from "./services/user-service";
import {useNavigate, Link, Route} from "react-router-dom";
import { Navigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Form from "react-bootstrap/Form";
import {setLoggedInUser} from "./users-reducer";
import {deleteUserThunk, findUserByIdThunk, loginUserThunk} from "./services/user-thunks";

const RefreshLogout = () => {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    //const {_id,idSetter }= useSelector(state => state.usersMain.initialState)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const un="";
    const ps="";


        //login(username, password)
        dispatch(loginUserThunk({un, ps}))
            .then((res) => {
                if (!res.payload ) {
                    console.log("logged out");
                }
                else{
                    console.log("Logged out successfully!!!")
                    //console.log(_id)
                    console.log(res)
                    // dispatch(setLoggedInUser());
                    //return <Navigate replace to="/" />
                    localStorage.setItem("user", JSON.stringify(res.payload));
                    //navigate("/");
                    navigate("/");
                }
            });

    return (
        <>
            Logged out.
        </>

    );


};
export default RefreshLogout;