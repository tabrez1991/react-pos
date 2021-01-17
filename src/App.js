import React from "react";
import "./style.css"

// compponents
import Main from "./container/Main";

//Redux
import { Provider } from "react-redux";
import store from "./store";

const App = () => {

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
