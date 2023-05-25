import React from "react";

export default function Or({
  text = "Or",
  height = "fit-content",
  padding = "Opx",
  children,
}) {
  return (
    <div className="or">
      <div></div>
      {children ? children : <p>{text}</p>}
      <div></div>

      <style jsx>{`
        .or {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          justify-content: center;
          align-items: center;
          height: ${height};
          padding: ${padding};
        }
        .or > div {
          background-color: var(--border-color-2);
          height: 1px;
          width: 100%;
        }
        .or > p {
          font-size: 1rem;
          margin-inline: 0.5rem;
        }
      `}</style>
    </div>
  );
}
