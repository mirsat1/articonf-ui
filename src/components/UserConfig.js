import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import YAML from 'js-yaml'
import firebase from "firebase/app";
import {
  Grid,
  Label,
  Segment,
  Input,
  Button,
  Form,
  Message,
  Icon,
} from "semantic-ui-react";
import Loader from "react-loader-spinner";

export default function UserConfig() {
  const { userUID, defaultTicConfig } = useContext(Context);
  const [ticConfig, setTicConfig] = useState(defaultTicConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [defaultMsg, setDefaultMsg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [peerName, setPeerName] = useState("");
  const history = useHistory();

  console.log("TIC CONF: ", ticConfig);

  useEffect(() => {
    // axios.get("https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/bityoga/fabric_as_code/master/group_vars/all.yml")
    axios
      .get(
        `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`
      )
      .then((res) => {
        if (res.data) {
          setIsLoading(false);
          setTicConfig(res.data);
        }
        if (!res.data) {
          // axios.get("https://raw.githubusercontent.com/bityoga/fabric_as_code/master/group_vars/all.yml")
          //     .then(r => {
          //         setTicConfig(YAML.load(r.data))
          //         setDefaultMsg("Haven't found TIC configuration, so we set a default one for you.")
          //     })
          setTicConfig(defaultTicConfig);
          setDefaultMsg(
            "Haven't found TIC configuration, so we set a default one for you."
          );
        }
      })
      .catch((e) => {
        setIsLoading(false);
        setHasError(true);
        setErrorMessage(
          "We were not able to fetch your TIC configuration, so we are assigned you with the default TIC configuration"
        );
        setTicConfig(defaultTicConfig);
        console.log(e);
      });
    return function cleanup() {
      setTicConfig(undefined);
    };
  }, [userUID, defaultTicConfig]);

  async function updateToDB() {
    setIsLoading(true);
    await firebase
      .database()
      .ref("user_profile/" + userUID)
      .update({
        user_config: ticConfig,
      });
    setIsLoading(false);
  }

  async function restoreDefaultsToDB() {
    setIsLoading(true);
    setTicConfig(defaultTicConfig);
    await firebase
      .database()
      .ref("user_profile/" + userUID)
      .update({
        user_config: ticConfig,
      });
    setIsLoading(false);
  }
  // console.log("TIC Config: ", ticConfig)
  function addPeer() {
    let peer = `peer${ticConfig.peerservices.length + 1}`;
    let peerName = `peer${ticConfig.peerservices.length + 1}_user`;
    let peerPassword = `peer${ticConfig.peerservices.length + 1}_password`;
    setTicConfig({
      ...ticConfig,
      [peer]: {
        bootstrap: `{{peer${ticConfig.peerservices.length}.name}}:${
          7051 + (ticConfig.peerservices.length - 1)
        }`,
        caname: "{{orgca.name}}",
        dbtype: "CouchDB",
        image: "hyperledger/fabric-peer",
        leader: "{{peer1_user}}",
        name: `{{${peer}_user}}`,
        password: `{{${peer}_password}}`,
        path: `/root/{{${peer}_user}}`,
        port: 8054 + ticConfig.peerservices.length,
        replicas: -1,
        switch: "on",
        tag: "2.2",
        type: "peer",
      },
      [peerPassword]: `${peer}pw`,
      [peerName]: `${peer}`,
    });
    ticConfig.peerservices.push(`{{${peer}}}`);
    console.log(ticConfig);
  }

  function setUpPeers() {
    let content = [];
    for (var i = 0; i < ticConfig.peerservices.length; i++) {
      let currentPeer = `peer${i + 1}`;
      let peer_user = `peer${i + 1}_user`;
      let peer_password = `peer${i + 1}_password`;
      content.push(
        <Segment raised>
          <Label
            attached="top"
            style={{
              backgroundColor: "rgb(25, 114, 245)",
              color: "white",
            }}
          >
            Peers
          </Label>
          <br />
          <br />
          <Label color="red">Peer{i + 1}</Label>
          <br />
          <br />
          <Form.Field>
            {ticConfig && (
              <Input
                label="User Name"
                placeholder={ticConfig[`peer${i + 1}_user`]}
                onChange={(e) =>
                  setTicConfig({
                    ...ticConfig,
                    [peer_user]: e.target.value,
                  })
                }
              />
            )}
          </Form.Field>
          <Form.Field>
            {ticConfig && (
              <Input
                label="Password"
                placeholder={defaultTicConfig[`peer${i + 1}_password`]}
                onChange={(e) =>
                  setTicConfig({
                    ...ticConfig,
                    [peer_password]: e.target.value,
                  })
                }
              />
            )}
          </Form.Field>
          <Form.Field>
            {ticConfig && (
              <Input
                label="Port"
                type="number"
                placeholder={ticConfig[`peer${i + 1}`][`port`]}
                onChange={(e) =>
                  setTicConfig({
                    ...ticConfig,
                    [currentPeer]: {
                      ...ticConfig[currentPeer],
                      port: e.target.value,
                    },
                  })
                }
              />
            )}
          </Form.Field>
          <Form.Field>
            {ticConfig && (
              <Input
                label="Leader"
                placeholder={defaultTicConfig[peer_user]}
                onChange={(e) =>
                  setTicConfig({
                    ...ticConfig,
                    [currentPeer]: {
                      ...ticConfig[currentPeer],
                      leader: e.target.value,
                    },
                  })
                }
              />
            )}
          </Form.Field>
          <Form.Field>
            {ticConfig && (
              <Grid columns={2}>
                <Grid.Column width={3}>
                  <Label size="large">Database Type</Label>
                </Grid.Column>
                <Grid.Column width={13}>
                  <select
                    id="lang"
                    onChange={(e) =>
                      setTicConfig({
                        ...ticConfig,
                        [currentPeer]: {
                          ...ticConfig[currentPeer],
                          dbtype: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="goleveldb">goleveldb</option>
                    <option value="mongoDB">mongoDB</option>
                    <option value="SQLite">SQLite</option>
                  </select>
                </Grid.Column>
              </Grid>
            )}
          </Form.Field>
          <Form.Field>
            {ticConfig && (
              <Input
                label="CA Name"
                placeholder={defaultTicConfig.orgca_user}
                onChange={(e) =>
                  setTicConfig({
                    ...ticConfig,
                    [currentPeer]: {
                      ...ticConfig[currentPeer],
                      leader: e.target.value,
                    },
                  })
                }
              />
            )}
          </Form.Field>
          {ticConfig && (
            <Form.Group inline>
              <Label size="large">Peer type</Label>
              <label>
                Anchor
                <input
                  type="radio"
                  name={`${currentPeer}type`}
                  value="anchor"
                  checked={ticConfig[currentPeer]["type"] === "anchor"}
                  onChange={(e) =>
                    setTicConfig({
                      ...ticConfig,
                      [currentPeer]: {
                        ...ticConfig[currentPeer],
                        type: e.target.value,
                      },
                    })
                  }
                />
              </label>
              <label>
                Endorser
                <input
                  type="radio"
                  name={`${currentPeer}type`}
                  value="endorser"
                  checked={ticConfig[currentPeer]["type"] === "endorser"}
                  onChange={(e) =>
                    setTicConfig({
                      ...ticConfig,
                      [currentPeer]: {
                        ...ticConfig[currentPeer],
                        type: e.target.value,
                      },
                    })
                  }
                />
              </label>
              <label>
                Committer
                <input
                  type="radio"
                  name={`${currentPeer}type`}
                  value="committer"
                  checked={ticConfig[currentPeer]["type"] === "committer"}
                  onChange={(e) =>
                    setTicConfig({
                      ...ticConfig,
                      [currentPeer]: {
                        ...ticConfig[currentPeer],
                        type: e.target.value,
                      },
                    })
                  }
                />
              </label>
            </Form.Group>
          )}
          <br />
        </Segment>
      );
    }
    console.log("Content: ", content);
    return content;
  }

  return (
    <div className="theBody">
      <h1>TIC Configuration</h1>

      {defaultMsg && (
        <h3>
          <Message warning attached="bottom">
            <Icon name="warning" />
            {defaultMsg}
            <br />
            <Button
              onClick={() => {
                updateToDB();
                setDefaultMsg("");
              }}
            >
              Keep it as your configuration
            </Button>
            <Button
              onClick={() => {
                setTicConfig(null);
                setDefaultMsg("");
                history.goBack();
              }}
            >
              Discard default configuration
            </Button>
          </Message>
        </h3>
      )}
      <h2>{hasError && errorMessage}</h2>
      {!defaultMsg && ticConfig && (
        <div>
          <Button onClick={addPeer}>Add peer</Button>
          <Form onSubmit={updateToDB}>
            <Grid columns={2}>
              <Grid.Column>
                <Segment raised>
                  <Label
                    attached="top"
                    style={{
                      backgroundColor: "rgb(25, 114, 245)",
                      color: "white",
                    }}
                  >
                    HyperLedger Explorer
                  </Label>
                  <br />
                  <br />
                  <Label color="red">HyperLedger Explorer Details</Label>
                  <br />
                  <br />
                  <Form.Field>
                    {ticConfig && (
                      <Input
                        label="Name"
                        placeholder={defaultTicConfig.hlf_explorer.name}
                        onChange={(e) =>
                          setTicConfig({
                            ...ticConfig,
                            hlf_explorer: {
                              ...ticConfig.hlf_explorer,
                              name: e.target.value,
                            },
                          })
                        }
                      />
                    )}
                  </Form.Field>
                  <Form.Field>
                    {ticConfig && (
                      <Input
                        label="Port"
                        type="number"
                        placeholder={defaultTicConfig.hlf_explorer.port}
                        onChange={(e) =>
                          setTicConfig({
                            ...ticConfig,
                            hlf_explorer: {
                              ...ticConfig.hlf_explorer,
                              port: e.target.value,
                            },
                          })
                        }
                      />
                    )}
                  </Form.Field>
                  <Form.Field>
                    {ticConfig && (
                      <Input
                        label="Admin username"
                        placeholder={defaultTicConfig.hlf_explorer_admin_user}
                        onChange={(e) =>
                          setTicConfig({
                            ...ticConfig,
                            hlf_explorer_admin_user: e.target.value,
                          })
                        }
                      />
                    )}
                  </Form.Field>
                  <Form.Field>
                    {ticConfig && (
                      <Input
                        label="Admin password"
                        placeholder={
                          defaultTicConfig.hlf_explorer_admin_password
                        }
                        onChange={(e) =>
                          setTicConfig({
                            ...ticConfig,
                            hlf_explorer_admin_password: e.target.value,
                          })
                        }
                      />
                    )}
                  </Form.Field>
                  <br />
                  <br />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment raised>
                  <Label
                    attached="top"
                    style={{
                      backgroundColor: "rgb(25, 114, 245)",
                      color: "white",
                    }}
                  >
                    Organization
                  </Label>
                  <br />
                  <br />
                  <Label color="red">Organization Details</Label>
                  <br />
                  <br />
                  <Form.Field>
                    {ticConfig && (
                      <Input
                        label="Name"
                        placeholder={defaultTicConfig.org.name}
                        onChange={(e) =>
                          setTicConfig({
                            ...ticConfig,
                            org: { ...ticConfig.org, name: e.target.value },
                          })
                        }
                      />
                    )}
                  </Form.Field>
                  <Form.Field>
                    {ticConfig && (
                      <Input
                        label="Unit"
                        placeholder={defaultTicConfig.org.unit}
                        onChange={(e) =>
                          setTicConfig({
                            ...ticConfig,
                            org: { ...ticConfig.org, unit: e.target.value },
                          })
                        }
                      />
                    )}
                  </Form.Field>
                  <Form.Field>
                    {ticConfig && (
                      <Input
                        label="Admin username"
                        placeholder={defaultTicConfig.admin_user}
                        onChange={(e) =>
                          setTicConfig({
                            ...ticConfig,
                            admin_user: e.target.value,
                          })
                        }
                      />
                    )}
                  </Form.Field>
                  <Form.Field>
                    {ticConfig && (
                      <Input
                        label="Admin password"
                        placeholder={defaultTicConfig.admin_password}
                        onChange={(e) =>
                          setTicConfig({
                            ...ticConfig,
                            admin_password: e.target.value,
                          })
                        }
                      />
                    )}
                  </Form.Field>
                  <br />
                  <br />
                </Segment>
              </Grid.Column>
            </Grid>
            <Grid columns={2}>
              <Grid.Column>
                <Segment raised>
                  <Label
                    attached="top"
                    style={{
                      backgroundColor: "rgb(25, 114, 245)",
                      color: "white",
                    }}
                  >
                    Certificate Authorities
                  </Label>
                  <br />
                  <br />
                  <Label color="red">ORGCA</Label>
                  <br />
                  <br />
                  <Form.Field>
                    {ticConfig && (
                      <Input
                        label="User Name"
                        placeholder={defaultTicConfig.orgca_user}
                        onChange={(e) =>
                          setTicConfig({
                            ...ticConfig,
                            orgca_user: e.target.value,
                          })
                        }
                      />
                    )}
                  </Form.Field>
                  <Form.Field>
                    {ticConfig && (
                      <Input
                        label="Password"
                        placeholder={defaultTicConfig.orgca_password}
                        onChange={(e) =>
                          setTicConfig({
                            ...ticConfig,
                            orgca_password: e.target.value,
                          })
                        }
                      />
                    )}
                  </Form.Field>
                  <Form.Field>
                    {ticConfig && (
                      <Input
                        label="Port"
                        type="number"
                        placeholder={defaultTicConfig.orgca.port}
                        onChange={(e) =>
                          setTicConfig({
                            ...ticConfig,
                            orgca: { ...ticConfig.orgca, port: e.target.value },
                          })
                        }
                      />
                    )}
                  </Form.Field>
                  <br />
                  <br />
                </Segment>
              </Grid.Column>

              <Grid.Column>
                <Segment raised>
                  <Label
                    attached="top"
                    style={{
                      backgroundColor: "rgb(25, 114, 245)",
                      color: "white",
                    }}
                  >
                    Certificate Authorities
                  </Label>
                  <br />
                  <br />
                  <Label color="red">TLSCA</Label>
                  <br />
                  <br />
                  <Form.Field>
                    {ticConfig && (
                      <Input
                        label="User Name"
                        placeholder={defaultTicConfig.tlsca_user}
                        onChange={(e) =>
                          setTicConfig({
                            ...ticConfig,
                            tlsca_user: e.target.value,
                          })
                        }
                      />
                    )}
                  </Form.Field>
                  <Form.Field>
                    {ticConfig && (
                      <Input
                        label="Password"
                        placeholder={defaultTicConfig.tlsca_password}
                        onChange={(e) =>
                          setTicConfig({
                            ...ticConfig,
                            tlsca_password: e.target.value,
                          })
                        }
                      />
                    )}
                  </Form.Field>
                  <Form.Field>
                    {ticConfig && (
                      <Input
                        label="Port"
                        type="number"
                        placeholder={defaultTicConfig.tlsca.port}
                        onChange={(e) =>
                          setTicConfig({
                            ...ticConfig,
                            tlsca: { ...ticConfig.tlsca, port: e.target.value },
                          })
                        }
                      />
                    )}
                  </Form.Field>
                  <br />
                  <br />
                </Segment>
              </Grid.Column>
            </Grid>
            {setUpPeers()}

            <div style={{ paddingTop: "1.3em", paddingBottom: "1.3em" }}>
              <Button type="submit" onClick={updateToDB}>
                Save changes
              </Button>{" "}
              <Button
                floated="right"
                type="submit"
                onClick={restoreDefaultsToDB}
              >
                Restore default
              </Button>
            </div>
            {isLoading && (
              <h4>
                Updating...{" "}
                <Loader
                  type="ThreeDots"
                  color="#08335e"
                  height={50}
                  width={50}
                />
              </h4>
            )}
          </Form>
        </div>
      )}
      {/* <button onClick={updateToDB}>Update to DB</button>
            <button onClick={setTicConfig({tlsca_password: "newPWD"})}>Change PW</button> */}
    </div>
  );
}
