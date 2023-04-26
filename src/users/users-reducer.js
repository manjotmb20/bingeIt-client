import {createSlice} from "@reduxjs/toolkit";

import {
    createUserThunk,
    deleteUserThunk,
    findUsersThunk,
    findUserByIdThunk,
    updateUserThunk, loginUserThunk
} from "./services/user-thunks";

var templateUser = {
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
const initialState = {
    id:"",
    username:"",
    password:"",
    currentUser:templateUser,
    loggedIn:"false",
    users: [],
    loading: false
}






const usersSlice = createSlice({name: 'users',
    initialState: initialState,
    reducers:{
        setLoggedInUser(state, action) {
            state = { ...state, loggedIn: "true",
                currentUser: action.payload,
                id:action.payload._id,
                username: action.payload.username
            };
            console.log("INSIDE USER REDUCER ====> ", state.user)
            return state;
        },
        logout(state) {
            state = { loggedIn: "false", currentUser: templateUser,
                id:"",
                username:"",
                password:"",
                users: [],
                loading: false
            };
            console.log("State: ", state);
        }
    },
    extraReducers: {

        [findUsersThunk.pending]: (state) => {
            state.loading = true
            console.log("pending")
            state.users = []
        },
        [findUsersThunk.fulfilled]: (state, {payload}) => {
            state.loading = false
            console.log("success")
            state.users = payload
            console.log(state.users)
        },
        [findUsersThunk.rejected]: (state) => {
            state.loading = false
            console.log("rejected")
            state.users = []
        },
        [findUserByIdThunk.pending]: (state) => {
            state.loading = true
            state.currentUser = templateUser
        },
        [findUserByIdThunk.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.currentUser = payload
        },
        [findUserByIdThunk.rejected]: (state) => {
            state.loading = false
            state.currentUser=templateUser
        },
        [loginUserThunk.pending]: (state) => {
            state.loading = true
            state.currentUser = templateUser
            state.username=""
            state.id=""
            state.password=""
            state.loggedIn="false"
            console.log("pending")
            state.users= []
        },
        [loginUserThunk.fulfilled]: (state, {payload}) => {
            state.loading = false
            if(payload){
                state.currentUser = payload
                console.log("fulfilled")
                console.log(payload)
                state._id=payload._id
                state.username=payload.username
                state.password=payload.password
                state.loggedIn= "true"
                console.log("satisified");
                //console.log(state._id+"satisified"+state.username);
                alert("Logged In "+state.username)
            }
            else{
                console.log("no user like that")
            }

        },
        [loginUserThunk.rejected]: (state) => {
            state.loading = false
            state.id=""
            state.currentUser= templateUser
            state.username=""
            state.password=""
            console.log("rejected")
            state.users= []
        },



        [deleteUserThunk.fulfilled]:
            (state, {payload}) => {
                state.loading = false
                state.users = state.users
                    .filter(t => t._id !== payload)
                console.log("Delete fulfilled")
            },
        [deleteUserThunk.rejected]:
            (state, {payload}) => {
                state.loading = false
                // state.users = state.users
                //     .filter(t => t._id !== payload)
                console.log("Delete failed")
            },
        [deleteUserThunk.pending]:
            (state, {payload}) => {
                state.loading = true
               console.log("Delete pending")
            },
        [createUserThunk.pending]:
            (state, {payload}) => {
            state.loading=true
                console.log("pending")
            },
        [createUserThunk.rejected]:
            (state, {payload}) => {
                state.loading=false
                console.log("rejected")
            },
        [createUserThunk.fulfilled]:
            (state, {payload}) => {
                state.loading = false
                state.users.push(
                    payload
                )
                console.log("create fulfilled")
                alert("New user registered!")
            },
        [updateUserThunk.fulfilled]:
            (state, {payload}) => {
                state.loading = false
                const tuitNdx = state.users
                    .findIndex((t) => t._id === payload._id)
                state.users[tuitNdx] = {
                    ...state.tuits[tuitNdx],
                    ...payload
                }
            }
    }
});

//export const {createTuit, deleteTuit} = tuitsSlice.actions;
export const {setLoggedInUser, logout}=usersSlice.actions;
export default usersSlice.reducer;