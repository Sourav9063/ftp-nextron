import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function About() {
  return (
    <>
      <Head></Head>
      <main>
        <h1>About</h1>
        <p>
          <Link href="mailto:sourav.ahmed5654@gmail.com">Send email</Link>
        </p>
        <Link
          onClick={(e) => {
                      e.preventDefault();
                      
                  window.open("https://sourav9063.github.io/my_portfolio/","_blank","fullscreen=true, width=1600, height=900");
          }}
          href="https://sourav9063.github.io/my_portfolio/"
          target="_blank"
        >
          Portfolio
        </Link>
      </main>
    </>
  );
}
