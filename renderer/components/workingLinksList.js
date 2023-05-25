import React, { useContext, useEffect, useState } from "react";
import { MainDataContext } from "../provider/mainDataProvider";
import LinkItem from "./linkItem";
import AwesomeButton from "./awesomeButton";

export default function WorkingLinksList() {
  const [mainData, setMainData] = useContext(MainDataContext);
  const [working, setWorking] = useState([]);
  const [notSure, setNotSure] = useState([]);
  useEffect(() => {
    const handleCheckData = (event, message) => {
      if (message.message == "Working") {
        setWorking((state) => {
          return [...state, message];
        });
      }
      if (message.message == "Not Sure") {
        setNotSure((state) => {
          return [...state, message];
        });
      }
    };
    window.electron.checkLinks.on(handleCheckData);

    return () => {
      window.electron.checkLinks.off(handleCheckData);
    };
  }, []);

  return (
    <>
      <header>
        <h1>Working Links</h1>
      </header>
      {/* <button
          onClick={() => {
            setWorking([]);
            setNotSure([]);
            window.electron.checkLinks.send({
              links: mainData.media,
              type: "through",
            });
          }}
        >
          Check
        </button> */}
      <div className="list">
        <AwesomeButton
          text={"Refresh"}
          onClick={() => {
            setWorking([]);
            setNotSure([]);
            window.electron.checkLinks.send({
              links: mainData.media,
              type: "fast",
            });
          }}
        ></AwesomeButton>
        {/* <button
            onClick={() => {
              setWorking([]);
              setNotSure([]);
              window.electron.checkLinks.send({
                links: mainData.media,
                type: "fast",
              });
            }}
          >
            Check
          </button> */}
        {working.length > 0 && (
          <div className="h2">
            <h2>Working</h2>
            <p>({working.length})</p>
          </div>
        )}
        {working &&
          working.map((link, index) => (
            <LinkItem
              type={link.message}
              media={link.link}
              key={index + "working"}
            />
          ))}
        {notSure.length > 0 && (
          <div className="h2">
            <h2>{"Not Sure "}</h2>
            <p> ({notSure.length})</p>
          </div>
        )}
        {notSure &&
          notSure.map((link, index) => (
            <LinkItem
              type={link.message}
              media={link.link}
              key={index + "notSure"}
            />
          ))}
      </div>

      <style jsx>{`
        section {
          min-height: 100vh;
          display: grid;
          place-content: center;
          height: fit-content;
          border-left: 1px solid var(--border-color);
          padding: 0.5rem;
          width: 100%;
          transition: width 0.3s ease;
        }
        .h2 {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .h2 > h2 {
          padding-right: 0.5rem;
        }
      `}</style>
    </>
  );
}
