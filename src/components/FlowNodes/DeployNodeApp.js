import React, { memo } from "react";

import { Handle } from "react-flow-renderer";

export default memo(() => {
  return (
    <>
      <Handle type="target" position="top" id="a" style={{ background: "#555" }} />
      <Handle type="target" position="left" id="b" style={{ background: "#555" }} />
      <div style={{ textAlign: "center", fontSize: "12px" }}>
        <strong>Deploy Application</strong>
      </div>
      <Handle type="source" position="bottom" id="a" style={{ top: "auto", background: "#555" }} />
    </>
  );
});
