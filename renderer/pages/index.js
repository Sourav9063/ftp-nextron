import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import useOnlineStatus from "../Hooks/useOnlineStatus";
import Offline from "../components/offline";
import { MainDataContext } from "../provider/mainDataProvider";
import LinkItem from "../components/linkItem";
import WorkingLinksList from "../components/workingLinksList";

import Or from "../components/Or";

const Home = () => {
  const [liveShowCount, setLiveShowCount] = useState(5);
  const [mediaShowCount, setMediaShowCount] = useState(5);

  const [input, setInput] = useState("");
  const [message, setMessage] = useState(null);
  const [notes, setNotes] = useState(null);
  const [linkPath, setLinkPath] = useState(null);
  const [mainData, setMainData] = useContext(MainDataContext);
  useEffect(() => {
    const handleMessage = (event, message) => setMessage(message);

    const handleLoadData = (event, message) => {
      console.log(message);
      setNotes(message?.data?.notes);
    };
    const handleSaveData = (event, message) => {
      // console.log(message);
      setNotes(message?.data?.notes);
    };
    const handleLinkPath = (event, message) => {
      // console.log(message);
      setLinkPath(message);
    };

    window.electron.message.on(handleMessage);
    window.electron.loadData.on(handleLoadData);
    window.electron.saveData.on(handleSaveData);
    window.electron.linkPath.on(handleLinkPath);
    window.electron.loadData.send();
    window.electron.linkPath.send("about");

    return () => {
      window.electron.message.off(handleMessage);
      window.electron.loadData.off(handleLoadData);
      window.electron.saveData.off(handleSaveData);
      window.electron.linkPath.off(handleLinkPath);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    window.electron.message.send({
      input: input,
      link: "https://sites.google.com/view/bdixftpserverlist/media-ftp-servers",
    });
    setMessage(null);
  };
  const online = useOnlineStatus();

  return (
    <>
      {!online ? (
        <Offline />
      ) : (
        <>
          <header>
            <h1>FTP SEARCHER</h1>
          </header>
          <main>
            <section>
              <header>
                <Or>
                  <h1>All LiveTV Links</h1>
                </Or>
              </header>
              <div className="list">
                {mainData &&
                  mainData.live
                    ?.slice(0, liveShowCount)
                    .map((live, index) => (
                      <LinkItem
                        key={index + "All Links"}
                        media={live}
                      ></LinkItem>
                    ))}
              </div>

              <div
                className="showAll"
                onClick={() => {
                  setLiveShowCount((state) => {
                    return state == 5 ? mainData.live?.length : 5;
                  });
                }}
              >
                <Or>
                  <p>
                    {liveShowCount == 5 ? "Show All LiveTV" : "Hide All LiveTV"}
                  </p>
                </Or>
              </div>

              <header>
                <Or>
                  <h1>All Media Links</h1>
                </Or>
              </header>
              <div className="list">
                {mainData &&
                  mainData.media
                    ?.slice(0, mediaShowCount)
                    .map((media, index) => (
                      <LinkItem
                        bgColor="#072ac8"
                        key={index + "All Links"}
                        media={media}
                      ></LinkItem>
                    ))}
              </div>
              <div
                className="showAll"
                onClick={() => {
                  setMediaShowCount((state) => {
                    return state == 5 ? mainData.media?.length : 5;
                  });
                }}
              >
                <Or>
                  <p>
                    {mediaShowCount == 5 ? "Show All Media" : "Hide All Media"}
                  </p>
                </Or>
              </div>
            </section>
            <section>
              <WorkingLinksList></WorkingLinksList>
            </section>
            <section>
              <header>
                <Or>
                  <h1>Favorites</h1>
                </Or>
              </header>
              {(mainData?.mediaFvrt != undefined &&
                mainData.mediaFvrt?.length > 0) ||
              (mainData?.liveFvrt != undefined &&
                mainData.liveFvrt?.length > 0) ? (
                <div className="list">
                  {mainData.liveFvrt?.length > 0 && (
                    <>
                      <div className="showAll fvrtTitle">
                        <Or>
                          <h3>LiveTV Favorites</h3>
                        </Or>
                      </div>

                      {mainData &&
                        mainData.liveFvrt?.map((media, index) => (
                          <LinkItem
                            key={index + "All Links"}
                            media={media}
                          ></LinkItem>
                        ))}
                    </>
                  )}
                  {mainData.mediaFvrt?.length > 0 && (
                    <>
                      <div className="showAll fvrtTitle">
                        <Or>
                          <h3>Media Favorites</h3>
                        </Or>
                      </div>

                      {mainData &&
                        mainData.mediaFvrt?.map((media, index) => (
                          <LinkItem
                            bgColor="#fb8b24"
                            key={index + "All Links"}
                            media={media}
                          ></LinkItem>
                        ))}
                    </>
                  )}
                </div>
              ) : (
                <div style={{ paddingInline: "1rem", marginTop: "1rem" }}>
                  <Or>
                    <div>No Favorites</div>
                  </Or>
                </div>
              )}
            </section>
          </main>
          <Link
            onClick={(e) => {
              e.preventDefault();
              // window.open(
              //   "https://sourav9063.github.io/my_portfolio/",
              //   "_blank",
              //   "width=1600, height=900"
              // );
              window.electron.openExternal(
                "https://sourav9063.github.io/my_portfolio/"
              );
            }}
            href="https://sourav9063.github.io/my_portfolio/"
            target="_blank"
          >
            <div className="showAll">
              <Or>Developed by Sourav Ahmed</Or>
            </div>
          </Link>
        </>
      )}

      <style jsx>{`
        .showAll {
          cursor: pointer;
          margin-inline: 1rem;
          margin-bottom: 1rem;
          padding-block: 0.5rem;
          transition: all 0.4s ease;
        }
        .showAll:hover {
          color: var(--hover-bg-color);
          margin-inline: 0px;
        }
        .fvrtTitle {
          margin-bottom: 0px;
          margin-top: 1rem;
        }
        main {
          display: flex;
          justify-content: space-evenly;
          height: fit-content;
          min-height: 100vh;
          max-width: 100vw;
        }
        main > * {
          max-width: 32vw;
          min-width: 20vw;
          padding: 0.5rem;
        }
        section:nth-child(2) {
          border-inline: 1px solid var(--border-color);
        }
      `}</style>
    </>
  );
};

export default Home;

{
  /* <h1>Hello Electron!</h1>
{message && <p>{message}</p>}

<h1>{online ? "Online" : "Offline"}</h1>
{notes && notes.map((note, index) => <h2 key={index}>{note}</h2>)}
<form onSubmit={handleSubmit}>
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
  />
</form>
<button
  onClick={(e) => {
    const pre = notes ? notes : [];
    if (input) {
      window.electron.saveData.send({
        notes: [input, ...pre],
      });
      setInput("");
    }
  }}
>
  Save
</button>
<br />
{linkPath && (
  <Link href={linkPath} target="_blank">
    About
  </Link>
)}
<Link href={"/about"}>About</Link>
<Link href={"/about/sourav"}>About</Link> */
}
