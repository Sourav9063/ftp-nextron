import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function AboutDynamic() {
  const router = useRouter();
  useEffect(() => {
    return () => {};
  }, []);

  return <div>{router.query.id}</div>;
}
