import { applyMiddleware, createStore } from "redux";
import allReducers from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const middleware = [thunk];
const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(...middleware)),
);
// store.getState();
export default store; 
