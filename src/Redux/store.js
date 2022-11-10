import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./bookSlice";

export default configureStore({
    reducer: {
        book: counterReducer,
    },
});
