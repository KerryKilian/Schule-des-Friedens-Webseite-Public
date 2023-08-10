import AddNews from "../src/frontend/components/AddNews";
import { useLoginContext } from "../src/frontend/LoginContext";
import React from "react";

export default function Intern() {
  const { loginInfo, setLoginInfo } = useLoginContext();
  return (
    <>
      <h2>Intern</h2>
      {loginInfo ? (
        <AddNews />
      ) : (
        <div>Du bist nicht berechtigt, auf diese Seite zuzugreifen</div>
      )}
    </>
  );
}
