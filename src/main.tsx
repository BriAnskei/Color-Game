import "bootstrap/dist/css/bootstrap.min.css";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import StoreContextProvider from "./context/StoreContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StoreContextProvider>
    <App />
  </StoreContextProvider>
);
