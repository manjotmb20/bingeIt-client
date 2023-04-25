import React from "react";
import {useDispatch} from "react-redux";
//import {deleteTuit} from "./tuits-reducer";
import {deleteUserThunk} from "./services/user-thunks";
const UserItem = ({users}) => {
    const dispatch = useDispatch();
    const deleteUserHandler = (id) => {
        console.log(id);
        dispatch(deleteUserThunk(id));
    }
    const pic='../../public/images/image2.jpg'


    return (
        <>


            {users && <li key={users._id} className="list-group-item border">

            <div className="row">

                <div className="col-1 "  >
                    <i className='bi bi-person-circle fa-2x' ></i>
                </div>

                <div className="col-11">

                    <div className="ms-3 ms-lg-0 text-white ">
                        <b>{users.username}
                        </b>

                        <i className="bi bi-x-lg float-end fg-color-white"
                           onClick={() => deleteUserHandler(users._id)}> </i>
                    </div>
                    <div className="ms-3 ms-lg-0 text-white ">
                        {users.type}
                    </div>

                </div>

            </div>
        </li>}
        </>
    );
};

export default UserItem;