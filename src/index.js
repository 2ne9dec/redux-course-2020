import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { rootReducer } from "./redux/rootReducer";
import {
  asyncIncrement,
  changeTheme,
  increment,
  decrement,
} from "./redux/actions";
import "./styles.css";

const counter = document.querySelector("#counter");
const buttons = document.querySelectorAll("button");

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.id) {
      case "add":
        store.dispatch(increment());
        break;
      case "sub":
        store.dispatch(decrement());
        break;
      case "async":
        store.dispatch(asyncIncrement());
        break;
      case "theme":
        const newTheme = document.body.classList.contains("light")
          ? "dark"
          : "light";
        store.dispatch(changeTheme(newTheme));
        break;
    }
  });
});

store.subscribe(() => {
  const state = store.getState();
  counter.textContent = state.counter;
  document.body.className = state.theme.value;

  [add, sub, theme, async].forEach((btn) => {
    btn.disabled = state.theme.disabled;
  });
});

// Так как такого action нет, то вернется state неизмененный
store.dispatch({ type: "INIT_APPLICATION" });
