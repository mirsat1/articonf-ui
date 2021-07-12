import React, { memo } from "react";

import { Handle } from "react-flow-renderer";

export default memo(() => {
  return (
    <>
      <Handle type="target" position="top" id="a" style={{ left: 50, background: "#555" }} />
      <Handle type="target" position="top" id="b" style={{ left: 130, background: "#555" }} />
      <div style={{ textAlign: "center", fontSize: "12px" }}>
        <strong>Deploy</strong>
      </div>
      <Handle type="source" position="bottom" id="a" style={{ left: 50, top: "auto", background: "#555" }} />
      <Handle type="source" position="bottom" id="b" style={{ left: 130, top: "auto", background: "#555" }} />
    </>
  );
});
