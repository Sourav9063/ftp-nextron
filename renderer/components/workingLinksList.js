import React, { useContext, useEffect, useState } from "react";
import { MainDataContext } from "../provider/mainDataProvider";
import LinkItem from "./linkItem";
import AwesomeButton from "./awesomeButton";
import Or from "./Or";
import { incrementListState } from "../helper/func";

export default function WorkingLinksList() {
  const [mainData, setMainData] = useContext(MainDataContext);
  const [what, setWhat] = useState("");
  const [working, setWorking] = useState([]);
  const [notSure, setNotSure] = useState([]);
  const [notSureShowCount, setNotSureShowCount] = useState(10);
  const [workingShowCount, setWorkingShowCount] = useState(100);
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
        <Or>
          <h1>Working Links</h1>
        </Or>
      </header>

      {/* <button
        onClick={() => {
          console.log("init length");
          console.log(mainData.media.length);
          console.log(mainData.live.length);
          console.log("init length");

          mainData.mediaCol.forEach((element) => {
            if (
              !mainData.media.includes(element)
              // &&
              // !mainData.live.includes(element)
            ) {
              mainData.media.push(element);
            }
            console.log(mainData.media.length);
          });
          mainData.liveTvCol.forEach((element) => {
            if (!mainData.live.includes(element)) {
              mainData.live.push(element);
            }
            console.log(mainData.live.length);
          });

          window.electron.saveData.send(mainData);
        }}
      >
        PushCols
      </button>
      <button
        onClick={() => {
          mainData.mediaCol = [];
          mainData.liveTvCol = [];
        }}
      >
        ClearCols
      </button>
      <button
        onClick={() => {
          console.log(mainData.globalMedia.length);
          mainData.globalMedia = mainData.globalMedia.filter((item, index) => {
            return mainData.globalMedia.indexOf(item) === index;
          });
          // mainData.live = mainData.live.filter((item, index) => {
          //   return mainData.live.indexOf(item) === index;
          // });
          console.log(mainData.globalMedia.length);
          console.log(mainData.live.length);
        }}
      >
        DltDup
      </button>
      <button
        onClick={() => {
          window.electron.saveData.send(mainData);
        }}
      >
        SaveToTmp_0
      </button> */}

      <div className="list">
        {what && (
          <div className="fvrtTitle">
            <Or>
              <h3>{what}</h3>
            </Or>
          </div>
        )}
        <AwesomeButton
          text={"Check LiveTV"}
          onClick={() => {
            setWhat("Checking LiveTV");
            setWorking([]);
            setNotSure([]);
            window.electron.checkLinks.send({
              links: mainData.live,
              type: "fast",
            });
          }}
        ></AwesomeButton>
        <div className="media">
          <AwesomeButton
            style={{ marginRight: "0rem" }}
            color="#072ac8"
            text={"Check Media"}
            onClick={() => {
              setWhat("Checking Media");
              setWorking([]);
              setNotSure([]);
              window.electron.checkLinks.send({
                links: mainData.media,
                type: "fast",
              });
            }}
          ></AwesomeButton>
          <AwesomeButton
            text={"Check Global Media"}
            onClick={() => {
              setWhat("Checking Global Media");
              setWorking([]);
              setNotSure([]);
              window.electron.checkLinks.send({
                links: mainData.globalMedia,
                type: "fast",
              });
            }}
          ></AwesomeButton>
        </div>
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
          working
            .slice(0, workingShowCount)
            .map((link, index) => (
              <LinkItem
                type={link.message}
                media={link.link}
                key={index + "working"}
              />
            ))}
        {working?.length > 0 && workingShowCount < working?.length && (
          <div
            className="showAll"
            onClick={() => {
              incrementListState({
                maxLength: working.length,
                setListState: setWorkingShowCount,
              });
            }}
          >
            <Or>
              <p>{"Show More"}</p>
            </Or>
          </div>
        )}
        {notSure.length > 0 && (
          <div className="h2 not-working">
            <h2>{"Not Sure "}</h2>
            <p> ({notSure.length})</p>
          </div>
        )}
        {notSure &&
          notSure
            .slice(0, notSureShowCount)
            .map((link, index) => (
              <LinkItem
                type={link.message}
                media={link.link}
                key={index + "notSure"}
              />
            ))}
        {notSure?.length > 0 && notSureShowCount < notSure?.length && (
          <div
            className="showAll"
            onClick={() => {
              incrementListState({
                maxLength: notSure.length,
                setListState: setNotSureShowCount,
              });
            }}
          >
            <Or>
              <p>{"Show More"}</p>
            </Or>
          </div>
        )}
      </div>

      <style jsx>{`
        .showAll {
          cursor: pointer;
          margin-inline: 1rem;
          margin-block: 1rem;
          padding-block: 0.5rem;
          transition: all 0.4s ease;
        }
        .showAll:hover {
          color: var(--hover-bg-color);
          margin-inline: 0px;
        }
        section {
          min-height: 100vh;
          display: grid;
          place-content: center;
          height: fit-content;
          border-left: 1px solid var(--border-color);
          padding: 0.5rem;
          width: 100%;
        }
        .media {
          display: flex;
          justify-content: stretch;
          align-items: center;
        }
        .h2 {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .h2 > h2 {
          padding-right: 0.5rem;
        }
        .not-working {
          margin-top: 1rem;
        }
        .fvrtTitle {
          margin-inline: 1rem;
          margin-bottom: 1rem;
          padding-block: 0.5rem;
          transition: all 0.4s ease;
        }
      `}</style>
    </>
  );
}
