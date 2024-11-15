import { Provider } from "mobx-react";
import counterStore from "./stores/counter";
import "./app.scss";

const store = {
  counterStore,
};

export default function App({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
