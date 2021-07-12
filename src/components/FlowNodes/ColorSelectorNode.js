import React, { memo } from "react";

import { Handle } from "react-flow-renderer";

export default memo(() => {
  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <div>
        Custom Color Picker Node: <strong></strong>
      </div>
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: 10, background: "#555" }}
      />
      <Handle
        type="source"
        position="right"
        id="b"
        style={{ bottom: 5, top: "auto", background: "#555" }}
      />
      <Handle
        type="source"
        position="bottom"
        id="c"
        style={{ left: 40, top: "auto", background: "#555" }}
      />
      <Handle
        type="source"
        position="bottom"
        id="d"
        style={{ left: 90, top: "auto", background: "#555" }}
      />
      <Handle
        type="source"
        position="bottom"
        id="e"
        style={{ left: 140, top: "auto", background: "#555" }}
      />
    </>
  );
});
