import React, { useContext } from "react";
import { Context } from "../Context";
import NotProvider from "../components/NotProvider";

export default function DeployApp() {
  const { role } = useContext(Context);
  const UCProvider = RegExp("UCprovider").test(role);
  return !UCProvider ? (
    <NotProvider />
  ) : (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img
        src={process.env.PUBLIC_URL + "/images/underConstruction.png"}
        alt="Under Construction"
      />
    </div>
  );
}
