import React from "react";
import Or from "../../components/Or";
import { useMainData } from "../../provider/mainDataProvider";
import Link from "next/link";
import DownloadSection from "../../components/downloadSection";
import { Router, useRouter } from "next/router";

export default function index() {
  const [mainData] = useMainData();
  const router = useRouter();
  return (
    <>
      <h2
        onClick={() => {
          router.back();
        }}
        className="back"
      >
        Back
      </h2>

      <div className="header">
        <Or>
          <h1>Download</h1>
        </Or>
      </div>
      {mainData && mainData.download ? (
        <>
          {mainData.download.app.windows &&
            mainData.download.app?.windows?.length > 0 && (
              <DownloadSection
                type="Windows"
                list={mainData.download.app.windows}
              />
            )}
          {mainData.download.app.linux &&
            mainData.download.app?.linux?.length > 0 && (
              <DownloadSection
                type="Linux"
                list={mainData.download.app.linux}
              />
            )}
          {mainData.download.app.mac &&
            mainData.download.app?.mac?.length > 0 && (
              <DownloadSection type="Mac" list={mainData.download.app.mac} />
            )}
          {mainData.download.app.android &&
            mainData.download.app?.android?.length > 0 && (
              <DownloadSection
                type="Android"
                list={mainData.download.app.android}
              />
            )}
        </>
      ) : (
        <Link
          onClick={(e) => {
            e.preventDefault();
            window.electron.openExternal(
              "https://github.com/Sourav9063/ftp-nextron/releases"
            );
          }}
          href="https://github.com/Sourav9063/ftp-nextron/releases"
          target="_blank"
        >
          <h2>Download</h2>
        </Link>
      )}
      <style jsx>{`
        h1,
        h2,
        h3 {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .header {
          margin-bottom: 3rem;
          padding-inline: 1rem;
        }
        .back {
          margin-left: 1rem;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
