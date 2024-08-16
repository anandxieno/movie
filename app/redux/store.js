const { configureStore } = require("@reduxjs/toolkit");
import usersReducers from './slice'

export const store =configureStore({
    reducer:{
        usersData:usersReducers,
    }
})