import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    booksData: [],
    catogaryName: [],
    autherName: [],
}

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setBookData: (state, action) => {
            state.booksData = action.payload;
        },
        setCatogaryFilterName: (state, action) => {
            state.catogaryName = action.payload
        },
        setAutherFilterName: (state, action) => {
            state.autherName = action.payload
        }
    }
})
export const { setBookData, setCatogaryFilterName, setAutherFilterName } = bookSlice.actions;
export default bookSlice.reducer;
