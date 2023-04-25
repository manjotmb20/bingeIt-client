import React, { useState } from "react";
import { login } from "./services/user-service";
import {useNavigate, Link, Route} from "react-router-dom";
import { Navigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Form from "react-bootstrap/Form";
import {setLoggedInUser} from "./users-reducer";
import {deleteUserThunk, findUserByIdThunk, loginUserThunk} from "./services/user-thunks";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //const {_id,idSetter }= useSelector(state => state.usersMain.initialState)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();
        //login(username, password)
        dispatch(loginUserThunk({username, password}))
        .then((res) => {
            if (!res.payload ) {
                console.log(username);
                console.log(password);
                alert("Invalid credentials! Please enter valid credentials!");
            }
            else{
                console.log("Logged in successfully!!!")
                //console.log(_id)
                console.log(res)
                                    // dispatch(setLoggedInUser());
                //return <Navigate replace to="/" />
                localStorage.setItem("user", JSON.stringify(res.payload));
                //navigate("/");
                navigate("/");
            }
        });
    };

    return (
        <section className="bg-light">
            <div className="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: "1rem" }}>
                            <div class="row g-0">


                                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div class="card-body p-4 p-lg-5 text-white">
                                        <Form onSubmit={handleSubmit}>
                                            <h3 className="mb-3 text-uppercase">Sign In</h3>

                                            <div className="form-outline mb-4">
                                                <label className="form-label text-white">Username:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter username"
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label text-white">Password:</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Enter password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <button
                                                    className="btn btn-info btn-block "
                                                    style={{background: "red"}}
                                                    type="submit"
                                                >
                                                    Sign In
                                                </button>
                                            </div>
                                            <p class="mb-5 text-white" style={{ color: "#393f81" }}>
                                                New to bingit?
                                                <Link class = "text-white " to="/register"> Sign Up</Link>
                                            </p>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Login;