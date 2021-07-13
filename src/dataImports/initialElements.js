import React from "react";

export default [
  {
    id: "1",
    type: "input",
    data: {
      label: (
        <>
          Welcome to <strong>ARTICONF!</strong>
        </>
      ),
    },
    position: { x: 250, y: 0 },
  },
  {
    id: "2",
    data: {
      label: (
        <>
          <strong>Advance configuration</strong>
        </>
      ),
    },
    position: { x: 250, y: 150 },
  },
  {
    id: "3",
    data: {
      label: (
        <>
          <strong>TIC Configuration</strong>
        </>
      ),
    },
    sourcePosition: "right",
    position: { x: 100, y: 250 },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 180,
    },
  },
  // {
  //   id: "4",
  //   data: {
  //     label: (
  //       <>
  //         <strong>CONF Configuration</strong>
  //       </>
  //     ),
  //   },
  //   targetPosition: "left",
  //   position: { x: 400, y: 200 },
  //   style: {
  //     background: "#D6D5E6",
  //     color: "#333",
  //     border: "1px solid #222138",
  //     width: 180,
  //   },
  // },
  //   {
  //     id: "4",
  //     position: { x: 250, y: 200 },
  //     data: {
  //       label: "Another default node",
  //     },
  //   },
  //   {
  //     id: "5",
  //     data: {
  //       label: "Node id: 5",
  //     },
  //     position: { x: 250, y: 325 },
  //   },
  {
    id: "5",
    type: "deployNode",
    style: {
      borderRadius: 4,
      border: "1px solid #222138",
      padding: 10,
      background: "#fff",
      color: "#333",
      width: 180,
    },
    position: { x: 250, y: 350 },
  },
  {
    id: "6",
    data: {
      label: (
        <>
          <strong>Deploy TIC</strong>
        </>
      ),
    },
    sourcePosition: "right",
    position: { x: 100, y: 450 },
  },
  {
    id: "7",
    type: "deployAppNode",
    style: {
      borderRadius: 4,
      border: "1px solid #222138",
      padding: 10,
      background: "#fff",
      color: "#333",
      width: 180,
    },
    targetPosition: "left",
    position: { x: 400, y: 450 },
  },
  {
    id: "8",
    type: "output",
    data: {
      label: (
        <>
          <strong>Find and test topology</strong>
        </>
      ),
    },
    position: { x: 250, y: 550 },
  },
  {
    id: "4",
    type: "confNode",
    style: {
      borderRadius: 4,
      border: "1px solid #222138",
      padding: 10,
      background: "#D6D5E6",
      color: "#333",
      width: 180,
    },
    position: { x: 400, y: 250 },
  },
  //   {
  //     id: "7",
  //     type: "selectorNode",
  //     data: { label: "Another output node" },
  //     style: { border: "1px solid #777", padding: 10 },
  //     position: { x: 400, y: 480 },
  //   },
  // EDGE FROM HOME PAGE TO ADV. CONF.
  {
    id: "e1-2",
    source: "1",
    target: "2",
    arrowHeadType: "arrowclosed",
    type: "buttonedge",
    data: {
      content: "Navigate to Advance Configuration",
    },
  },
  // EDGE FROM ADV. CONF. TO TIC CONF.
  {
    id: "e1-3",
    source: "2",
    target: "3",
    arrowHeadType: "arrowclosed",
    type: "buttonedge",
    data: {
      content:
        "From Advance Configuration page, you need to click the segment that is stating TIC Settings. And from there take default or do your own configurations",
    },
  },
  // EDGO FROM TIC CONF. TO CONF CONF.
  {
    id: "e4-8",
    source: "3",
    target: "4",
    targetHandle: "b",
    arrowHeadType: "arrowclosed",
    type: "buttonedge",
    data: {
      content:
        "After you got your TIC settings, now you need to head to CONF Settings. Same as before, you take a default configuration or you configurate it on your own",
    },
  },
  // EDGE FROM CONF CONF. TO DEPLOY
  {
    id: "e4-5",
    source: "4",
    target: "5",
    arrowHeadType: "arrowclosed",
    type: "buttonedge",
    data: {
      content: "Now, since you setup TIC and CONF its time to deploy ARTICONF. Head to Deploy page",
    },
  },
  // EDGE FROM DEPLOY TO DEPLOY TIC
  {
    id: "e5-6",
    source: "5",
    target: "6",
    arrowHeadType: "arrowclosed",
    type: "buttonedge",
    data: {
      content: "Head to Deploy TIC and follow the instructions present there",
    },
  },
  // EDGE FROM DEPLOY TO DEPLOY APP
  {
    id: "e5-7",
    source: "6",
    target: "7",
    targetHandle: "b",
    arrowHeadType: "arrowclosed",
    type: "buttonedge",
    data: {
      content: "After you deployed TIC, now its time to deploy your application",
    },
  },
  // EDGE FROM DEPLOY APP TO TEST
  {
    id: "e6-9",
    source: "7",
    target: "8",
    arrowHeadType: "arrowclosed",
    type: "buttonedge",
    data: {
      content: "Now you have deployed everything. Next step is to test what you have deployed. Head to Find and Test Topology",
    },
  },
  // EDGE ONLY FOR APP FROM ADV. CONF TO CONF CONF.
  {
    id: "e9-2",
    source: "2",
    target: "4",
    targetHandle: "a",
    animated: true,
    arrowHeadType: "arrowclosed",
    label: "deploy only the app",
  },
  // EDGE ONLY FOR APP FROM CONF CONF. TO DEPLOY
  {
    id: "e10-3",
    source: "4",
    target: "5",
    sourceHandle: "b",
    targetHandle: "b",
    animated: true,
    arrowHeadType: "arrowclosed",
    label: "deploy only the app",
  },
  // EDGE ONLY FOR APP FROM DEPLOY TO DEPLOY APP
  {
    id: "e11-4",
    source: "5",
    target: "7",
    sourceHandle: "b",
    animated: true,
    arrowHeadType: "arrowclosed",
    label: "deploy only the app",
  },
];
