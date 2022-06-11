import { render } from "preact";
import { App } from "./app";
import "./index.css";

const app = document.getElementById("app");
app && render(<App />, app);
