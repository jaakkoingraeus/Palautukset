import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import blogReducer from "../reducers/blogReducer";
import notificationReducer from "../reducers/notificationReducer";

const reducer = combineReducers({
    blogs: blogReducer,
    notifications: notificationReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store