// import React from 'react';
// import ReactDOM from "react-dom/client";
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById("root"));
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
import { StrictMode } from "react";
import React from 'react'
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);