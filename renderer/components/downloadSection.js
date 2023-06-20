import Link from "next/link";
import React, { useState } from "react";
import Or from "./Or";
export default function DownloadSection({ type, list }) {
  return (
    <section>
      <div className="header">
        <Or>
          <h1>{type}</h1>
        </Or>
      </div>
      <div className="wrapper">
        {list.map((link, index) => {
          return (
            <>
              <div className="links-wrapper">
                <Link href={link} key={link}>
                  <div className="links">{`${index + 1}. ${link
                    .split("/")
                    .slice(-1)}`}</div>
                </Link>
                <Copy link={link} />
              </div>
            </>
          );
        })}
      </div>
      <style jsx>{`
        .header {
          padding: 1rem;
          margin-bottom: 3rem;
          border: 1px solid var(--border-color);
        }
        .wrapper {
          width: fit-content;
          margin: auto;
        }
        .links-wrapper {
          margin-block: 3rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .links {
          margin-right: 1rem;
          transition: all 0.4s ease;
        }
        .copy {
          transition: all 0.4s ease;
          cursor: pointer;
          border: 1px solid var(--border-color);
          padding: 0.5rem;
          padding-inline: 1rem;
          border-radius: 4px;
        }
        .copy:hover,
        .links:hover {
          color: var(--hover-bg-color);
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
}

function Copy({ link }) {
  const [copy, setCopy] = useState("Copy");

  return (
    <>
      <div
        className="copy"
        onClick={() => {
          navigator.clipboard.writeText(link);
          setCopy("Copied");
          setTimeout(() => {
            setCopy("Copy");
          }, 5000);
        }}
        onMouseLeave={() => {
          setCopy("Copy");
        }}
      >
        {copy}
      </div>
      <style jsx>{`
        .copy {
          box-sizing: content-box;
          transition: all 0.4s ease;
          cursor: pointer;
          border: 1px solid var(--border-color);
          padding: 0.3rem;
          padding-inline: 1rem;
          border-radius: 6px;
        }
        .copy:hover,
        .links:hover {
          color: var(--hover-bg-color);
          text-decoration: underline;
          font-weight: 700;
          border: 1px solid var(--hover-bg-color);
        }
      `}</style>
    </>
  );
}
