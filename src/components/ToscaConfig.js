import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import firebase from "firebase/app";
import axiosBase from "../axios/axios-base";
import YAML from "js-yaml";
// import JSONPretty from 'react-json-prettify'
// import CustomTheme from 'react-json-prettify/dist/themes/arduinoLight'
// import FileUpload from "./FileUpload";
import {
  Button,
  Form,
  Input,
  Label,
  Grid,
  Segment,
  Message,
  Icon,
  Loader,
  Dimmer,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import Dummy from "./DummyApi";

export default function ToscaConfig() {
  const { uploadToscaButton, userUID } = useContext(Context);
  const [toscaLoaded, setToscaLoaded] = useState(null);
  const [defaultMsg, setDefaultMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [vmProperties, setVmProperties] = useState({
    disk_size: "40000 MB",
    mem_size: "4000 MB",
    num_cores: 2,
    os_distro: "Ubuntu",
    os_version: "18.04",
    user_name: "vm_user",
  });
  const vmName =
    toscaLoaded &&
    `compute_${toscaLoaded.topology_template.node_templates.topology.requirements.length}`;
  const history = useHistory();
  useEffect(() => {
    setIsLoading(true);
    // axiosBase('https://raw.githubusercontent.com/qcdis-sdia/sdia-tosca/master/examples/TIC_planed_with_bank.yaml')
    axiosBase
      .get(`user_profile/${userUID}/tosca_config.json`)
      .then((r) => {
        if (r.data) {
          setToscaLoaded({
            ...r.data,
            topology_template: {
              ...r.data.topology_template,
              node_templates: {
                ...r.data.topology_template.node_templates,
                tic: {
                  ...r.data.topology_template.node_templates.tic,
                  interfaces: {
                    ...r.data.topology_template.node_templates.tic.interfaces,
                    TIC: {
                      ...r.data.topology_template.node_templates.tic.interfaces
                        .TIC,
                      deploy_bank_app: {
                        ...r.data.topology_template.node_templates.tic
                          .interfaces.TIC.deploy_bank_app,
                        inputs: {
                          ...r.data.topology_template.node_templates.tic
                            .interfaces.TIC.deploy_bank_app.inputs,
                          extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                        },
                      },
                      deploy_ca: {
                        ...r.data.topology_template.node_templates.tic
                          .interfaces.TIC.deploy_ca,
                        inputs: {
                          ...r.data.topology_template.node_templates.tic
                            .interfaces.TIC.deploy_ca.inputs,
                          extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                        },
                      },
                      deploy_cli: {
                        ...r.data.topology_template.node_templates.tic
                          .interfaces.TIC.deploy_cli,
                        inputs: {
                          ...r.data.topology_template.node_templates.tic
                            .interfaces.TIC.deploy_cli.inputs,
                          extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                        },
                      },
                      deploy_hlf_explorer: {
                        ...r.data.topology_template.node_templates.tic
                          .interfaces.TIC.deploy_hlf_explorer,
                        inputs: {
                          ...r.data.topology_template.node_templates.tic
                            .interfaces.TIC.deploy_hlf_explorer.inputs,
                          extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                        },
                      },
                      deploy_orderer: {
                        ...r.data.topology_template.node_templates.tic
                          .interfaces.TIC.deploy_orderer,
                        inputs: {
                          ...r.data.topology_template.node_templates.tic
                            .interfaces.TIC.deploy_orderer.inputs,
                          extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                        },
                      },
                      deploy_peers: {
                        ...r.data.topology_template.node_templates.tic
                          .interfaces.TIC.deploy_peers,
                        inputs: {
                          ...r.data.topology_template.node_templates.tic
                            .interfaces.TIC.deploy_peers.inputs,
                          extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                        },
                      },
                      deploy_portainer: {
                        ...r.data.topology_template.node_templates.tic
                          .interfaces.TIC.deploy_portainer,
                        inputs: {
                          ...r.data.topology_template.node_templates.tic
                            .interfaces.TIC.deploy_portainer.inputs,
                          extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                        },
                      },
                      deploy_swarm_visualizer: {
                        ...r.data.topology_template.node_templates.tic
                          .interfaces.TIC.deploy_swarm_visualizer,
                        inputs: {
                          ...r.data.topology_template.node_templates.tic
                            .interfaces.TIC.deploy_swarm_visualizer.inputs,
                          extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                        },
                      },
                      initialize_hosts: {
                        ...r.data.topology_template.node_templates.tic
                          .interfaces.TIC.initialize_hosts,
                        inputs: {
                          ...r.data.topology_template.node_templates.tic
                            .interfaces.TIC.initialize_hosts.inputs,
                          extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                        },
                      },
                      mount_fs: {
                        ...r.data.topology_template.node_templates.tic
                          .interfaces.TIC.mount_fs,
                        inputs: {
                          ...r.data.topology_template.node_templates.tic
                            .interfaces.TIC.mount_fs.inputs,
                          extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                        },
                      },
                      purge_swarm: {
                        ...r.data.topology_template.node_templates.tic
                          .interfaces.TIC.purge_swarm,
                        inputs: {
                          ...r.data.topology_template.node_templates.tic
                            .interfaces.TIC.purge_swarm.inputs,
                          extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                        },
                      },
                      prepare_docker_images: {
                        ...r.data.topology_template.node_templates.tic
                          .interfaces.TIC.prepare_docker_images,
                        inputs: {
                          ...r.data.topology_template.node_templates.tic
                            .interfaces.TIC.prepare_docker_images.inputs,
                          extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                        },
                      },
                      spawn_swarm: {
                        ...r.data.topology_template.node_templates.tic
                          .interfaces.TIC.spawn_swarm,
                        inputs: {
                          ...r.data.topology_template.node_templates.tic
                            .interfaces.TIC.spawn_swarm.inputs,
                          extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                        },
                      },
                    },
                  },
                },
              },
            },
          });
        }
        if (!r.data) {
          axiosBase
            .get(
              "https://raw.githubusercontent.com/qcdis-sdia/sdia-tosca/master/examples/TIC_planed_with_bank.yaml"
            )
            .then((r) => {
              let data = YAML.load(r.data);
              setToscaLoaded({
                ...data,
                topology_template: {
                  ...data.topology_template,
                  node_templates: {
                    ...data.topology_template.node_templates,
                    tic: {
                      ...data.topology_template.node_templates.tic,
                      interfaces: {
                        ...data.topology_template.node_templates.tic.interfaces,
                        TIC: {
                          ...data.topology_template.node_templates.tic
                            .interfaces.TIC,
                          deploy_bank_app: {
                            ...data.topology_template.node_templates.tic
                              .interfaces.TIC.deploy_bank_app,
                            inputs: {
                              ...data.topology_template.node_templates.tic
                                .interfaces.TIC.deploy_bank_app.inputs,
                              extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                            },
                          },
                          deploy_ca: {
                            ...data.topology_template.node_templates.tic
                              .interfaces.TIC.deploy_ca,
                            inputs: {
                              ...data.topology_template.node_templates.tic
                                .interfaces.TIC.deploy_ca.inputs,
                              extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                            },
                          },
                          deploy_cli: {
                            ...data.topology_template.node_templates.tic
                              .interfaces.TIC.deploy_cli,
                            inputs: {
                              ...data.topology_template.node_templates.tic
                                .interfaces.TIC.deploy_cli.inputs,
                              extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                            },
                          },
                          deploy_hlf_explorer: {
                            ...data.topology_template.node_templates.tic
                              .interfaces.TIC.deploy_hlf_explorer,
                            inputs: {
                              ...data.topology_template.node_templates.tic
                                .interfaces.TIC.deploy_hlf_explorer.inputs,
                              extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                            },
                          },
                          deploy_orderer: {
                            ...data.topology_template.node_templates.tic
                              .interfaces.TIC.deploy_orderer,
                            inputs: {
                              ...data.topology_template.node_templates.tic
                                .interfaces.TIC.deploy_orderer.inputs,
                              extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                            },
                          },
                          deploy_peers: {
                            ...data.topology_template.node_templates.tic
                              .interfaces.TIC.deploy_peers,
                            inputs: {
                              ...data.topology_template.node_templates.tic
                                .interfaces.TIC.deploy_peers.inputs,
                              extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                            },
                          },
                          deploy_portainer: {
                            ...data.topology_template.node_templates.tic
                              .interfaces.TIC.deploy_portainer,
                            inputs: {
                              ...data.topology_template.node_templates.tic
                                .interfaces.TIC.deploy_portainer.inputs,
                              extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                            },
                          },
                          deploy_swarm_visualizer: {
                            ...data.topology_template.node_templates.tic
                              .interfaces.TIC.deploy_swarm_visualizer,
                            inputs: {
                              ...data.topology_template.node_templates.tic
                                .interfaces.TIC.deploy_swarm_visualizer.inputs,
                              extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                            },
                          },
                          initialize_hosts: {
                            ...data.topology_template.node_templates.tic
                              .interfaces.TIC.initialize_hosts,
                            inputs: {
                              ...data.topology_template.node_templates.tic
                                .interfaces.TIC.initialize_hosts.inputs,
                              extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                            },
                          },
                          mount_fs: {
                            ...data.topology_template.node_templates.tic
                              .interfaces.TIC.mount_fs,
                            inputs: {
                              ...data.topology_template.node_templates.tic
                                .interfaces.TIC.mount_fs.inputs,
                              extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                            },
                          },
                          purge_swarm: {
                            ...data.topology_template.node_templates.tic
                              .interfaces.TIC.purge_swarm,
                            inputs: {
                              ...data.topology_template.node_templates.tic
                                .interfaces.TIC.purge_swarm.inputs,
                              extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                            },
                          },
                          prepare_docker_images: {
                            ...data.topology_template.node_templates.tic
                              .interfaces.TIC.prepare_docker_images,
                            inputs: {
                              ...data.topology_template.node_templates.tic
                                .interfaces.TIC.prepare_docker_images.inputs,
                              extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                            },
                          },
                          spawn_swarm: {
                            ...data.topology_template.node_templates.tic
                              .interfaces.TIC.spawn_swarm,
                            inputs: {
                              ...data.topology_template.node_templates.tic
                                .interfaces.TIC.spawn_swarm.inputs,
                              extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              });
              setDefaultMsg(
                "Haven't found TOSCA configuration, so we set a default one for you."
              );
            })
            .catch((e) => console.log(e));
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, [userUID]);
  async function updateToscaToDB() {
    //================================= OLD TESTING STUFF ==================================================
    // let aFileParts = ['<a id="a"><b id="b">hey!</b></a>']; // an array consisting of a single DOMString
    // let oMyBlob = new Blob([toscaLoaded], {type : 'text/yaml'}); // the blob
    // var formData = new FormData(); // Currently empty
    // formData.append('Tosca', oMyBlob, 'tosca.yaml')
    // formData.getAll('Tosca')
    //=======================================================================================================
    //================ axios post form-data example ========================================================
    // var bodyFormData = new FormData();
    // bodyFormData.append('tosca', toscaLoaded);
    // axiosBase({
    //     method: "post",
    //     url: "axios_posttest.json",
    //     data: bodyFormData,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   })
    //     .then(function (response) {
    //       //handle success
    //       console.log(response);
    //     })
    //     .catch(function (response) {
    //       //handle error
    //       console.log(response);
    //     });
    //=======================================================================================================
    setIsLoading(true);
    await firebase
      .database()
      .ref("/user_profile/" + userUID)
      .update({
        tosca_config: toscaLoaded,
      });
    uploadToscaButton(YAML.dump(toscaLoaded));
    setIsLoading(false);
  }
  function addVm() {
    // let vmName = `compute_${toscaLoaded.topology_template.node_templates.topology.requirements.length}`;
    toscaLoaded.topology_template.node_templates.topology.requirements.push({
      vm: {
        capability: "tosca.capabilities.QC.VM",
        node: vmName,
        relationship: "tosca.relationships.DependsOn",
      },
    });
    if (toscaLoaded.topology_template.node_templates !== vmName)
      setToscaLoaded({
        ...toscaLoaded,
        topology_template: {
          ...toscaLoaded.topology_template,
          node_templates: {
            ...toscaLoaded.topology_template.node_templates,
            [vmName]: {
              properties: {
                disk_size: vmProperties.disk_size,
                mem_size: vmProperties.mem_size,
                num_cores: vmProperties.num_cores,
                os_distro: vmProperties.os_distro,
                os_version: vmProperties.os_version,
                user_name: vmProperties.user_name,
              },
              interfaces: {
                Standard: {
                  create: "dumy.yaml",
                },
              },
              type: "tosca.nodes.QC.VM.Compute",
            },
          },
        },
      });
    const formData = new FormData();
    formData.append(`${userUID}`, JSON.stringify(toscaLoaded));
    // console.log(formData.get(`${userUID}`))
  }
  function removeVm() {
    // let vmName = `compute_${toscaLoaded.topology_template.node_templates.topology.requirements.length}`
    // delete toscaLoaded.topology_template.node_templates[vmName]
    // toscaLoaded.topology_template.node_templates.topology.requirements.pop()
    // console.log("This should delete a vm", toscaLoaded)
    // console.log("This should delete a vm", toscaLoaded.topology_template.node_templates.topology.requirements)
    const updatedArr =
      toscaLoaded.topology_template.node_templates.topology.requirements;
    if (updatedArr.length > 1) {
      updatedArr.pop();
      delete toscaLoaded.topology_template.node_templates[
        `compute_${updatedArr.length}`
      ];
    } else alert("There must be one virtual machine in the tosca");
    setToscaLoaded({
      ...toscaLoaded,
      topology_template: {
        ...toscaLoaded.topology_template,
        node_templates: {
          ...toscaLoaded.topology_template.node_templates,
          topology: {
            ...toscaLoaded.topology_template.node_templates.topology,
            requirements: updatedArr,
          },
        },
      },
    });

    // console.log(toscaLoaded.topology_template.node_templates)
    // console.log(updatedArr)
  }
  // toscaLoaded && console.log("TOSCA", toscaLoaded)

  async function restoreDefaultsToDB() {
    setIsLoading(true);
    await axiosBase
      .get(
        "https://raw.githubusercontent.com/qcdis-sdia/sdia-tosca/master/examples/TIC_planed_with_bank.yaml"
      )
      .then((r) => {
        let data = YAML.load(r.data);
        setToscaLoaded({
          ...data,
          topology_template: {
            ...data.topology_template,
            node_templates: {
              ...data.topology_template.node_templates,
              tic: {
                ...data.topology_template.node_templates.tic,
                interfaces: {
                  ...data.topology_template.node_templates.tic.interfaces,
                  TIC: {
                    ...data.topology_template.node_templates.tic.interfaces.TIC,
                    deploy_bank_app: {
                      ...data.topology_template.node_templates.tic.interfaces
                        .TIC.deploy_bank_app,
                      inputs: {
                        ...data.topology_template.node_templates.tic.interfaces
                          .TIC.deploy_bank_app.inputs,
                        extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                      },
                    },
                    deploy_ca: {
                      ...data.topology_template.node_templates.tic.interfaces
                        .TIC.deploy_ca,
                      inputs: {
                        ...data.topology_template.node_templates.tic.interfaces
                          .TIC.deploy_ca.inputs,
                        extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                      },
                    },
                    deploy_cli: {
                      ...data.topology_template.node_templates.tic.interfaces
                        .TIC.deploy_cli,
                      inputs: {
                        ...data.topology_template.node_templates.tic.interfaces
                          .TIC.deploy_cli.inputs,
                        extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                      },
                    },
                    deploy_hlf_explorer: {
                      ...data.topology_template.node_templates.tic.interfaces
                        .TIC.deploy_hlf_explorer,
                      inputs: {
                        ...data.topology_template.node_templates.tic.interfaces
                          .TIC.deploy_hlf_explorer.inputs,
                        extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                      },
                    },
                    deploy_orderer: {
                      ...data.topology_template.node_templates.tic.interfaces
                        .TIC.deploy_orderer,
                      inputs: {
                        ...data.topology_template.node_templates.tic.interfaces
                          .TIC.deploy_orderer.inputs,
                        extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                      },
                    },
                    deploy_peers: {
                      ...data.topology_template.node_templates.tic.interfaces
                        .TIC.deploy_peers,
                      inputs: {
                        ...data.topology_template.node_templates.tic.interfaces
                          .TIC.deploy_peers.inputs,
                        extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                      },
                    },
                    deploy_portainer: {
                      ...data.topology_template.node_templates.tic.interfaces
                        .TIC.deploy_portainer,
                      inputs: {
                        ...data.topology_template.node_templates.tic.interfaces
                          .TIC.deploy_portainer.inputs,
                        extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                      },
                    },
                    deploy_swarm_visualizer: {
                      ...data.topology_template.node_templates.tic.interfaces
                        .TIC.deploy_swarm_visualizer,
                      inputs: {
                        ...data.topology_template.node_templates.tic.interfaces
                          .TIC.deploy_swarm_visualizer.inputs,
                        extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                      },
                    },
                    initialize_hosts: {
                      ...data.topology_template.node_templates.tic.interfaces
                        .TIC.initialize_hosts,
                      inputs: {
                        ...data.topology_template.node_templates.tic.interfaces
                          .TIC.initialize_hosts.inputs,
                        extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                      },
                    },
                    mount_fs: {
                      ...data.topology_template.node_templates.tic.interfaces
                        .TIC.mount_fs,
                      inputs: {
                        ...data.topology_template.node_templates.tic.interfaces
                          .TIC.mount_fs.inputs,
                        extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                      },
                    },
                    purge_swarm: {
                      ...data.topology_template.node_templates.tic.interfaces
                        .TIC.purge_swarm,
                      inputs: {
                        ...data.topology_template.node_templates.tic.interfaces
                          .TIC.purge_swarm.inputs,
                        extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                      },
                    },
                    prepare_docker_images: {
                      ...data.topology_template.node_templates.tic.interfaces
                        .TIC.prepare_docker_images,
                      inputs: {
                        ...data.topology_template.node_templates.tic.interfaces
                          .TIC.prepare_docker_images.inputs,
                        extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                      },
                    },
                    spawn_swarm: {
                      ...data.topology_template.node_templates.tic.interfaces
                        .TIC.spawn_swarm,
                      inputs: {
                        ...data.topology_template.node_templates.tic.interfaces
                          .TIC.spawn_swarm.inputs,
                        extra_variables: `https://articonf2.firebaseio.com/user_profile/${userUID}/user_config.json`,
                      },
                    },
                  },
                },
              },
            },
          },
        });
        firebase
          .database()
          .ref("/user_profile/" + userUID)
          .update({
            tosca_config: toscaLoaded,
          });
      })
      .catch((e) => console.log(e));
    setIsLoading(false);
    console.log("Restored default TOSCA configuration");
  }
  return (
    <div className="theBody">
      <h1>Co-located and Orchestrated Network Fabric (CONF) Configuration</h1>
      {/* <FileUpload />
      <Divider horizontal>Or</Divider> */}
      {defaultMsg && (
        <h3>
          <Message warning attached="bottom">
            <Icon name="warning" />
            {defaultMsg}
            <br />
            <Button
              onClick={() => {
                updateToscaToDB();
                setDefaultMsg("");
              }}
            >
              Keep it as your configuration
            </Button>
            <Button
              onClick={() => {
                setToscaLoaded(null);
                setDefaultMsg("");
                history.goBack();
              }}
            >
              Discard default configuration
            </Button>
          </Message>
        </h3>
      )}
      {/* <span>{isLoading && <h4>Loading... <Loader type="ThreeDots" color="#08335e" height={50} width={50}/></h4>}</span> */}
      {!defaultMsg && toscaLoaded !== null && (
        <div>
          <Form onSubmit={addVm}>
            <Segment style={{ margin: "1.2em" }}>
              <Label color="black" ribbon>
                Virtual machine properties
              </Label>
              <br />
              <br />
              <Form.Field>
                <Input
                  label="Username"
                  placeholder={vmProperties.user_name}
                  onChange={(e) =>
                    setVmProperties({
                      ...vmProperties,
                      user_name: e.target.value,
                    })
                  }
                />
              </Form.Field>
              <Form.Group inline>
                <Input
                  label="Disck size"
                  placeholder={vmProperties.disk_size}
                  onChange={(e) =>
                    setVmProperties({
                      ...vmProperties,
                      disk_size: e.target.value,
                    })
                  }
                />
                <Input
                  label="Memory size"
                  placeholder={vmProperties.mem_size}
                  onChange={(e) =>
                    setVmProperties({
                      ...vmProperties,
                      mem_size: e.target.value,
                    })
                  }
                />
                <Input
                  label="Number of cores"
                  type="number"
                  placeholder={vmProperties.num_cores}
                  onChange={(e) =>
                    setVmProperties({
                      ...vmProperties,
                      num_cores: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group inline>
                <Grid columns={2}>
                  <Grid.Column width={5}>
                    <Label size="large">Operating system</Label>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <select
                      id="os_distro"
                      onChange={(e) =>
                        setVmProperties({
                          ...vmProperties,
                          os_distro: e.target.value,
                        })
                      }
                    >
                      <option value="Ubuntu">Ubuntu</option>
                    </select>
                  </Grid.Column>
                </Grid>
                <Grid columns={2}>
                  <Grid.Column width={5}>
                    <Label size="large">Operating system version</Label>
                  </Grid.Column>
                  <Grid.Column width={7}>
                    <select
                      id="os_version"
                      onChange={(e) =>
                        setVmProperties({
                          ...vmProperties,
                          os_version: e.target.value,
                        })
                      }
                    >
                      <option value="18.04">18.04</option>
                    </select>
                  </Grid.Column>
                </Grid>
              </Form.Group>
              <Button type="submit">Add virtual machine</Button>
            </Segment>
          </Form>
          <Button floated="right" type="submit" onClick={restoreDefaultsToDB}>
            Restore default
          </Button>
          <Button floated="right" onClick={removeVm}>
            Remove last virtual machine
          </Button>
          <Button onClick={updateToscaToDB} style={{ marginBottom: "0.4em" }}>
            Save Changes
          </Button>
          <Dummy
            modalBtnName="Show TOSCA"
            headerInfo="Your TOSCA topology template"
            data={toscaLoaded}
          />
          {isLoading && (
            <Dimmer active>
              <Loader size="massive">Loading</Loader>
            </Dimmer>
          )}
          {/* <JSONPretty theme={CustomTheme} json={toscaLoaded} /> */}
        </div>
      )}
    </div>
  );
}
