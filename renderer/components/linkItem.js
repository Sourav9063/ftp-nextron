import React, { useContext, useEffect, useState } from "react";

import LikeButton from "./likeButton";

export default function LinkItem({
  type,
  media,
  bgColor = "var(--primary-color)",
}) {
  // const [isAlreadyFvrt, setIsAlreadyFvrt] = useState(
  //   mainData.mediaFvrt?.includes(media)
  // );

  return (
    <>
      <div
        href={media}
        onClick={(e) => {
          e.preventDefault();
          window.open(media, "_blank", " width=1600, height=900");
        }}
        target="_blank"
        className="cta"
      >
        <span className="span">{media}</span>
        <span className="second">
          <svg
            width="50px"
            height="20px"
            viewBox="0 0 66 43"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              id="arrow"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <path
                className="one"
                d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                fill="#FFFFFF"
              ></path>
              <path
                className="two"
                d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                fill="#FFFFFF"
              ></path>
              <path
                className="three"
                d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                fill="#FFFFFF"
              ></path>
            </g>
          </svg>
        </span>
        <div className="third">
          <LikeButton media={media}></LikeButton>
        </div>
        <div
          title="Open in Browser"
          className={`third openExternal`}
          onClick={(e) => {
            e.stopPropagation();
            window.electron.openExternal(media);
            // setIsAlreadyFvrt(!isAlreadyFvrt);
          }}
        >
          <svg
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g
                id="🔍-Product-Icons"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="ic_fluent_open_in_browser_24_regular"
                  fill="#ffffff"
                  fill-rule="nonzero"
                >
                  <path
                    d="M17.5,12 C20.5375661,12 23,14.4624339 23,17.5 C23,20.5375661 20.5375661,23 17.5,23 C14.4624339,23 12,20.5375661 12,17.5 C12,14.4624339 14.4624339,12 17.5,12 Z M17.5112209,14.0001234 L17.427,14.005 L17.3718609,14.0166108 L17.3718609,14.0166108 L17.2886043,14.0467435 L17.2886043,14.0467435 L17.2153398,14.0888427 L17.2153398,14.0888427 L17.1588667,14.1344405 L14.6464466,16.6464466 L14.5885912,16.7156945 C14.4704696,16.8862041 14.4704696,17.1137959 14.5885912,17.2843055 L14.6464466,17.3535534 L14.7156945,17.4114088 C14.8862041,17.5295304 15.1137959,17.5295304 15.2843055,17.4114088 L15.3535534,17.3535534 L16.999,15.708 L17,21 L17.0080557,21.0898756 C17.0450996,21.2939687 17.2060313,21.4549004 17.4101244,21.4919443 L17.5,21.5 L17.5898756,21.4919443 C17.7939687,21.4549004 17.9549004,21.2939687 17.9919443,21.0898756 L18,21 L17.999,15.706 L19.6464466,17.3535534 L19.7156945,17.4114088 C19.9105626,17.5464049 20.179987,17.5271197 20.3535534,17.3535534 C20.5271197,17.179987 20.5464049,16.9105626 20.4114088,16.7156945 L20.3535534,16.6464466 L17.806,14.104 L17.7584513,14.0718913 L17.6910366,14.0377922 L17.6281458,14.0166083 L17.5739178,14.0054619 C17.5529058,14.0023382 17.531733,14.0005544 17.5112209,14.0001234 Z M6.25,3 L17.75,3 C19.4830315,3 20.8992459,4.35645477 20.9948552,6.06557609 L21,6.25 L21.0012092,12.0225923 C20.5377831,11.7257502 20.0341997,11.4861106 19.5004209,11.3136354 L19.5,8 L4.5,8 L4.5,17.75 C4.5,18.6681734 5.20711027,19.4211923 6.10647279,19.4941988 L6.25,19.5 L11.3136354,19.5004209 C11.4861106,20.0341997 11.7257502,20.5377831 12.0225923,21.0012092 L6.25,21 C4.51696854,21 3.10075407,19.6435452 3.00514479,17.9344239 L3,17.75 L3,6.25 C3,4.51696854 4.35645477,3.10075407 6.06557609,3.00514479 L6.25,3 Z"
                    id="🎨-Color"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <style jsx>{`
        .fav {
          color: rgb(255, 255, 255);
          fill: rgb(255, 255, 255);
        }

        .cta {
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          text-decoration: none;
          font-size: 1rem;
          background: ${type != null
            ? type == "Working"
              ? "#006b4b"
              : "#ff7b00"
            : bgColor};
          transition: 1s;
          border: none;
          margin: 1rem;
          padding-block: 0.8rem;
          padding-inline: 0.5rem;
          animation: reveal 0.2s ease-in-out;
        }

        .cta:focus {
          outline: none;
        }

        .cta:hover {
          transition: 0.5s;
          box-shadow: 5px 5px 0 #fbc638;

          transform: skewX(-15deg);
           {
            /* font-size: 1.2rem; */
          }
        }
        .span {
          width: 50%;
          min-width: 16vw;
          overflow-x: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .cta .second {
          transition: 0.5s;
          margin-right: 0px;
        }

        .cta:hover .second {
          transition: 0.3s;
           {
            /* margin-right: 45px; */
          }
        }

        .second {
          margin-left: 1rem;
          position: relative;
          top: 12%;
        }

        .one {
          transition: 0.4s;
          transform: translateX(-60%);
        }

        .two {
          transition: 0.5s;
          transform: translateX(-30%);
        }

        .cta:hover .three {
          animation: color_anim 1s infinite 0.2s;
        }

        .cta:hover .one {
          transform: translateX(0%);
          animation: color_anim 1s infinite 0.6s;
        }

        .cta:hover .two {
          transform: translateX(0%);
          animation: color_anim 1s infinite 0.4s;
        }
        .third {
          margin-left: auto;
          margin-right: 0.5rem;
          width: 1.8rem;
          transform: skew(0);
          box-sizing: border-box;
          transition: all 0.3s ease-in-out;
        }
        .cta:hover .third {
          transform: skew(15deg);
        }
        .third > svg {
          box-sizing: content-box;
          width: 1.5rem;
          padding: 0.5rem;
          margin-right: 0.3rem;
          transition: all 0.3s ease-in-out;

          border-radius: 1000000px;
        }

         {
          /* .third:hover {
          transform: skewX(15deg);
        } */
        }

        .third:hover > svg {
          background-color: rgba(220, 20, 60, 0.253);
          fill: crimson;

          padding: 0.5rem;
        }
        .openExternal {
          margin-right: 0.5rem;
          margin-left: 0.5rem;
          background-color: transparent;
        }
        .openExternal > svg {
          color: white;
          stroke: white;
          fill: white;
          background-color: transparent;
        }
        .openExternal:hover > svg {
          background-color: rgba(0, 0, 255, 0.3);
          fill: blue;
        }
        @keyframes color_anim {
          0% {
            fill: white;
          }

          50% {
            fill: #fbc638;
          }

          100% {
            fill: white;
          }
        }
        @keyframes reveal {
          0% {
            transform: translateY(-50%);
            opacity: 0;
          }
          100% {
            transform: translateY(0%);
            opacity: 1;
          }
        }
        @media only screen and (max-width: 800px) {
          .cta {
            flex-direction: column;
          }
          .span {
            width: 100%;
            margin-bottom: 1rem;
          }
          .third {
            margin: auto;
          }
        }
      `}</style>
    </>
  );
}

// .span {
// }
// .span:hover {
//   transform: skewX(15deg);
// }
