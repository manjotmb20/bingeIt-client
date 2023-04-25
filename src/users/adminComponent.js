import React, {useEffect} from "react";
//import tuits from "./tuits.json"
import {useDispatch,useSelector} from "react-redux";
import UserItem from "./user-item.js";
import {findUsersThunk}
    from "./services/user-thunks";
const UsersList = () => {
    const {users, loading} = useSelector(state => state.user)
    const dispatch = useDispatch();
    useEffect(() => {
        //console.log("admincomponent.js")

        if (!users?.length)
        dispatch(findUsersThunk())
        // console.log("after dispatch")
        // console.log(users);
    }, [])
    console.log("Users:", users);

    return (
        <>
            <h4 class="text-bg-light p-3" style={{ color: "white" }}>
                List of users
            </h4>

        <div className="list-group">
            {
                loading &&
                <li className="list-group-item text-white" style={{ color: "white" }}>
                    Loading...
                </li>
            }
            {

                users.map(user1 =>
                    <UserItem key= {user1._id} users={user1}/>
                   // <printer key= {user1._id} users={user1}/>
                )
            }
        </div>
        </>

    );
};

export default UsersList;