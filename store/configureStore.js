import { createWrapper } from "next-redux-wrapper";
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import reducer from "../reducers";

const configureStore = (initialState, options) => {
  const logger = createLogger();
  const enhancer = compose(composeWithDevTools(applyMiddleware(logger)));
  const store = createStore(reducer, initialState, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
