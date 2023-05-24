import React from "react";
import "../styles/global.css";
import MainDataProvider from "../provider/mainDataProvider";

export default function App({ Component, pageProps }) {
  return (
    <MainDataProvider>
      <Component {...pageProps} />
    </MainDataProvider>
  );
}
