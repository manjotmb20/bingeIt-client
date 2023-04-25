// import React from "react";
// export default class Register extends React.Component{
//     render(){
//         return (
//             <div>
//                 <h1 style={{"color": "white"}}>
//                     Register!
//                 </h1>
//                 <div style={{"backgroundColor": "lightyellow",
//                     "color": "black", padding: "10px"}}>
//                     Register
//                 </div>
//                 <input className={'form-control'}
//                        placeholder="username"/>
//
//                 <input className={'form-control'}
//                        placeholder="password"/>
//                 <button className={'btn btn-light btn-block'}>
//                     Register
//                 </button>
//
//
//             </div>
//         )
//     }
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {createUserThunk} from "./services/user-thunks";
import {useDispatch} from "react-redux";

const Register = () => {

    const templateUser = {
        "username": "",
        "password": "",
        "type": "USER",
        "email": "",
        "phone": "",
        "address": "",
        "age": "",
        "gender": "",
        "tagline": "",
        "profilePic": "",
        "DOB": "",
        "bio": "Bio not set",
        "favouriteGenre": "",
        "playlist": [
            {}
        ],
        "firstName": "",
        "lastName": ""

    }

    const navigate = useNavigate();
    const [username1, setUsername] = useState("");
    const [email1, setEmail] = useState("");
    const [password1, setPassword] = useState("");
    const [type1, setType] = useState("");
    const [phone1, setPhone] = useState("");
    const [address1, setAddress] = useState("");
    const [age1, setAge] = useState("");
    const [gender1, setGender] = useState("");
    const [tagline1, setTagline] = useState("");
    const [DOB1, setDOB] = useState("");
    const [bio1, setBio] = useState("");
    const [favouriteGenre1, setfavouriteGenre] = useState("");
    const [firstName1, setfirstName] = useState("");
    const [lastName1, setlastName] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser={
            ...templateUser,
            username: username1,
            email:email1,
            password:password1,
            type:type1,
            phone:phone1,
            address:address1,
            age:age1,
            gender:gender1,
            tagline:tagline1,
            DOB:DOB1,
            bio:bio1,
            favouriteGenre:favouriteGenre1,
            firstName:firstName1,
            lastName:lastName1
        }
        console.log(newUser);
        dispatch(createUserThunk(newUser));
        setUsername('');
        setEmail('');
        setPassword('');
        setType('');
        setPhone('');
        setAddress('');
        setAge('');
        setGender('');
        setTagline('');
        setDOB('');
        setBio('');
        setfavouriteGenre('');
        setfirstName('');
        setlastName('');
        navigate("/login");
    }


    return (
        <form onSubmit={handleSubmit}>
            <section className="h-100 bg-light text-white">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card card-registration my-4">
                                <div className="row g-0">


                                    <div className="col-xl-6 text-white justify-content-center" style={{ color: "white" }}>
                                        <div className="card-body p-4 text-black">
                                            <h3 className="mb-3 text-uppercase">Sign Up</h3>

                                            <div class=" form-group form-outline ">
                                                <label class="text-white">Username:</label>
                                                <input
                                                    required="yes"
                                                    type="text"
                                                    className="form-control mb-4"
                                                    placeholder="Username"
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                            </div>
                                            <div className=" form-group form-outline">
                                                <label class=" text-white">Firstname :</label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-4"
                                                    placeholder="First name"
                                                    onChange={(e) => setfirstName(e.target.value)}
                                                />
                                            </div>
                                            <div className=" form-group form-outline">
                                                <label  class=" text-white">Lastname :</label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-4"
                                                    placeholder="Last name"
                                                    onChange={(e) => setlastName(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group form-outline">
                                                <label  class=" text-white">Phone :</label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-4"
                                                    placeholder="Phone"
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group form-outline">
                                                <label  class=" text-white">Age :</label>
                                                <input
                                                    type="number"
                                                    className="form-control mb-4"
                                                    placeholder="Age"
                                                    onChange={(e) => setAge(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group form-outline">
                                                <label  class=" text-white">Gender :</label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-4"
                                                    placeholder="M/F"
                                                    onChange={(e) => setGender(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group form-outline">
                                                <label  class=" text-white">Address :</label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-4"
                                                    placeholder="Address"
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group form-outline">
                                                <label  class=" text-white">Bio :</label>
                                                <input
                                                    type="textarea"
                                                    className="form-control mb-4"
                                                    placeholder="A little about yourself"
                                                    onChange={(e) => setBio(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group form-outline">
                                                <label  class=" text-white">Tagline :</label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-4"
                                                    placeholder="A little Tagline"
                                                    onChange={(e) => setTagline(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group form-outline">
                                                <label  class=" text-white">Genre :</label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-4"
                                                    placeholder="Comedy/Drama/Mystery/Crime"
                                                    onChange={(e) => setfavouriteGenre(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group form-outline">
                                                <label  class=" text-white">DOB  :</label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-4"
                                                    placeholder="mm/dd/yyyy"
                                                    onChange={(e) => setDOB(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-group form-outline">
                                                <label  class=" text-white">Email address:</label>
                                                <input
                                                    required="yes"
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="example@domain.com"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-group d-md-flex justify-content-start align-items-center mb-2 mt-2 py-2">
                                                <label className="mb-0 me-4 text-white">Type: </label>
                                                <div className="form-check form-check-inline mb-0 me-4">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="role"
                                                        id="user"
                                                        value="user"
                                                        checked={type1 === "user"}
                                                        onChange={(e) => setType(e.target.value)}
                                                    />
                                                    <label class="form-check-label" for="user">
                                                        user
                                                    </label>
                                                </div>

                                                <div className="form-check form-check-inline mb-0 me-4">
                                                    <input
                                                        required
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="role"
                                                        id="admin"
                                                        value="admin"
                                                        checked={type1 === "admin"}
                                                        onChange={(e) => setType(e.target.value)}
                                                    />
                                                    <label class="form-check-label" for="admin">
                                                        Admin
                                                    </label>
                                                </div>

                                                <div className="form-check form-check-inline mb-0">
                                                    <input
                                                        class="form-check-input"
                                                        type="radio"
                                                        name="role"
                                                        id="provider"
                                                        value="provider"
                                                        checked={type1 === "provider"}
                                                        onChange={(e) => setType(e.target.value)}
                                                    />
                                                    <label class="form-check-label" for="provider">
                                                        Provider
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="form-group form-outline">
                                                <label  class=" text-white">Password:</label>
                                                <input
                                                    type="password"
                                                    className="form-control mb-4"
                                                    required="yes"
                                                    placeholder="*****************"
                                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>



                                            <div className="form-group d-flex justify-content-end pt-3">
                                                <div className="d-grid">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-info btn-md ms-2 bg-color-red fg-color-red"
                                                        style={{background: "red"}}
                                                    >
                                                        Register
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                {" "}
                                                <p class="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                                                    Already have an account?{" "}
                                                    <Link to="/login" style={{ color: "#393f81" }}>
                                                        Login here
                                                    </Link>
                                                </p>{" "}
                                            </div>



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    );
};
export default Register;