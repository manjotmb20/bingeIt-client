import {createAsyncThunk}
    from "@reduxjs/toolkit"
import * as service
    from "./user-service"

export const findUsersThunk = createAsyncThunk(
    'users/findUsers', async () =>
        await service.findAllUsers()
)

// export const findUsersThunk = () => async (dispatch) => {
//     try {
//         const response = await service.findAllUsers();
//         // const data = await response.json();
//         dispatch(findUsers(data));
//     } catch (error) {
//         console.error(error);
//     }
// };

// export const findUsersThunk = () => async (dispatch) => {
//     try {
//         const users = await service.findAllUsers();
//         dispatch({
//             type: "FIND_USERS",
//             payload: users
//
//         });
//         console.log(users);
//
//     } catch (error) {
//         console.error(error);
//     }
// };




export const findUserByIdThunk = createAsyncThunk(
    'users/findUser', async (uid) =>
        await service.findUserById(uid)
)
export const loginUserThunk = createAsyncThunk(
    'users/loginUser',
    async ({username, password}) => {
        return await service.login({username, password})
    })

export const createUserThunk = createAsyncThunk(
    'users/createUser',
    async (user) => {
        return await service.createUser(user)
    })







export const deleteUserThunk = createAsyncThunk(
    'users/deleteUser',
    async (_id) => {
        await service.deleteUser(_id)
        console.log("thunk after calling delete")
        return _id
    })


export const updateUserThunk = createAsyncThunk(
    'users/updateUser',
    async (user) => {
        return await service.updateUser(user)
    }
)
