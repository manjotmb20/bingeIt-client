import React from "react";
import {useDispatch} from "react-redux";
//import {deleteTuit} from "./tuits-reducer";
import {deleteUserThunk} from "./services/user-thunks";
import {json} from "react-router-dom";
const printer = ({user}) => {
    const keys = Object.keys(user);
    console.log(keys);


    return (
        <>
            <p style={{ color: "white" }}>
                hi

            </p>


        </>
    );
};

export default printer;