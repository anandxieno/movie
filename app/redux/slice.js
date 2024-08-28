const { createSlice } = require("@reduxjs/toolkit");


const Slice = createSlice({
    name : "userapi",
    initialState : {
        users : []
    },
    reducers : {
        addUser: (state, action) => {

            const data = {
                name: action.payload
            }
            state.users.push(data);
        },
    }
});


export const {addUser} = Slice.actions;
export default Slice.reducer;