import { createContext, useContext, useEffect, useState } from "react";

import React from "react";

export const MainDataContext = createContext(null);

export default function MainDataProvider({ children }) {
  const likedPosts = [];
  const [mainData, setMainData] = useState();

  useEffect(() => {
    window.electron.loadData.send();
    const handleLoadData = (event, message) => {
      // console.log(message);
      setMainData(message.data);
    };
    window.electron.loadData.on(handleLoadData);
    return () => {
      window.electron.loadData.off(handleLoadData);
    };
  }, []);

  return (
    <MainDataContext.Provider value={[mainData, setMainData]}>
      {children}
    </MainDataContext.Provider>
  );
}

export const useMainData= () =>useContext(MainDataContext);