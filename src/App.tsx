import React from "react";
import { Hellow } from "./lib";
import Test from "./lib/Test";

type Props = {};

export const App = (props: Props) => {
  return (
    <>
      <div>App</div>
      <Test/>
      <img src="./assets/logo512.png" width="100px" height="100px"/>
      <Hellow />
    </>
  );
};
