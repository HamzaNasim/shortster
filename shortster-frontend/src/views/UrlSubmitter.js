import React from "react";
import Alltabs from "./Alltabs";
import Tabs from "./Tabs";

function UrlSubmitter() {
  const ScreenConfig = React.useState(0);
  return (
    <div>
      <Tabs ScreenConfig={ScreenConfig} />
      <Alltabs CurrentScreen={ScreenConfig[0]} />
    </div>
  );
}

export default UrlSubmitter;
