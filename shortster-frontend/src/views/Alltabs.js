import React from "react";
import CustomUrl from "./CustomUrl";
import DefaultUrl from "./DefaultUrl";
import Record from "./Record";

export default function Alltabs({ CurrentScreen }) {
  if (CurrentScreen === 0) {
    return <DefaultUrl />;
  } else if (CurrentScreen === 1) {
    return <CustomUrl />;
  } else if (CurrentScreen === 2) {
    return <Record />;
  }
}
