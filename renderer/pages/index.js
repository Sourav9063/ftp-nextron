import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import useOnlineStatus from "../Hooks/useOnlineStatus";
import Offline from "../components/offline";
import { MainDataContext } from "../provider/mainDataProvider";
import LinkItem from "../components/linkItem";
import WorkingLinksList from "../components/workingLinksList";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Home = () => {
  const [parent] = useAutoAnimate();

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
      console.log(message);
      setNotes(message?.data?.notes);
    };
    const handleLinkPath = (event, message) => {
      console.log(message);
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
                <h1>All Media Links</h1>
              </header>
              {mainData &&
                mainData.media?.map((media, index) => (
                  <LinkItem key={index + "All Links"} media={media}></LinkItem>
                ))}
            </section>
            <WorkingLinksList></WorkingLinksList>
            <section>
              <header>
                <h1>Favourite</h1>
              </header>
              {mainData?.mediaFvrt != undefined &&
              mainData.mediaFvrt?.length > 0 ? (
                <div ref={parent}>
                  {mainData &&
                    mainData.mediaFvrt?.map((media, index) => (
                      <LinkItem
                        key={index + "All Links"}
                        media={media}
                      ></LinkItem>
                    ))}
                </div>
              ) : (
                <div>No Favourite</div>
              )}
            </section>
          </main>
        </>
      )}

      <style jsx>{`
        main {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          height: 100vh;
        }
        main > * {
          border-left: 1px solid var(--border-color);
          padding: 0.5rem;
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
