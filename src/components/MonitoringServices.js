import React, { useContext, useEffect } from 'react'
import useToggler from '../hooks/useToggler'
import { Header, Icon, Button, Popup, Message, Dimmer, Loader } from 'semantic-ui-react'
import { Context } from '../Context'

import CopyToClipboard from './CopyToClipboard'

export default function MonitoringServices() {
    const {
        findDeployed,
        deployment,
        isLoading
    } = useContext(Context)
    const [showInfo, toggleInfo] = useToggler()
    const content = showInfo ? 'less' : 'more'
    
    const ip_addr = deployment && JSON.stringify(deployment.topology_template.node_templates.compute.attributes.public_ip)
    const kubeDashboard = deployment && "https://" + ip_addr.substring(1, ip_addr.length-1) + ":30384"
    const grafana = deployment && "http://" + ip_addr.substring(1, ip_addr.length-1) + ":31925"
    const prometheusGUI = deployment && "http://" + ip_addr.substring(1, ip_addr.length-1) + ":30090"
    // const prometheusMetricEP = deployment && "https://" + ip_addr.substring(1, ip_addr.length-1) + ":30443"

    // console.log(deployment)

    useEffect(findDeployed, [])
    return (
        <div>
            {isLoading && <Dimmer active>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>}
            {!isLoading && (deployment ?
            <div>
                <Popup content={'Click here to show ' + content + ' detailed information about the services'} trigger={
                    <Button  onClick={toggleInfo} icon>
                        <Icon name="question circle outline" />
                    </Button>
                    } />
                <div style={{textAlign: "center"}}>
                    <Header as="a" href={kubeDashboard} target="_blank" style={{margin: "1.2em"}} icon>
                        <Icon>
                        <img src={process.env.PUBLIC_URL + "/images/kube.png"} alt="Kubernetes Dashboard" height="100" width="100"/>
                        </Icon>
                        Kubernetes Dashboard
                        <Header.Subheader style={{textAlign: "left"}}>
                            Click this icon to open the kubernetes dashboard
                        </Header.Subheader>
                    </Header>
                    {/* <i className="ri-arrow-right-circle-fill ri-fw ri-3x"></i> */}
                    <Header as="a" href={prometheusGUI} target="_blank" style={{margin: "1.2em"}} icon>
                        <Icon>
                        <img src={process.env.PUBLIC_URL + "/images/prometheus.png"} alt="Prometheus" height="100" width="100"/>
                        </Icon>
                        Prometheus
                        <Header.Subheader>
                            Click this icon to open the Prometheus web GUI
                        </Header.Subheader>
                    </Header>
                    {/* <i className="ri-arrow-right-circle-fill ri-fw ri-3x"></i> */}
                    <Header as="a" href={grafana} target="_blank" style={{margin: "1.2em"}} icon>
                        <Icon>
                            <img src={process.env.PUBLIC_URL + "/images/grafana.png"} alt="Grafana" height="100" width="100"/>
                        </Icon>
                        Grafana
                        <Header.Subheader>
                            Click this icon to open Grafana
                        </Header.Subheader>
                    </Header>
                    {/* <i className="ri-arrow-right-circle-fill ri-fw ri-3x"></i> */}
                    <Header as="a" href="http://15.237.93.29:8081/" target="_blank" style={{margin: "1.2em"}} icon>
                        <Icon>
                            <img src={process.env.PUBLIC_URL + "/images/kibana.png"} alt="Kibana" height="100" width="100"/>
                        </Icon>
                        Kibana
                        <Header.Subheader>
                            Click this icon to open Kibana
                        </Header.Subheader>
                    </Header>
                </div>
                <div>
                    {
                        showInfo &&
                        <div>
                            <h3>Kubernetes Dashboard token:</h3>
                            <CopyToClipboard name="Smart token" inputValue={deployment.topology_template.node_templates.kubernetes.attributes.tokens[0].token} />
                            <Message
                                icon="info"
                                header="Grafana username: admin"
                                content="Grafana password: prom-operator"
                            />
                            <Header as='h2'>
                                <img src={process.env.PUBLIC_URL + "/images/kube.png"} alt="Kubernetes Dashboard" height="100" width="100"/>
                                <Header.Content>
                                Kubernetes Dashboard
                                <Header.Subheader>
                                You can use Dashboard to deploy containerized applications to a Kubernetes cluster, troubleshoot your containerized application, and manage the cluster resources. You can use Dashboard to get an overview of applications <br />
                                running on your cluster, as well as for creating or modifying individual Kubernetes resources (such as Deployments, Jobs, DaemonSets, etc). For example, you can scale a Deployment, initiate a rolling update, restart a pod <br />
                                or deploy new applications using a deploy wizard.
                                </Header.Subheader>
                                </Header.Content>
                            </Header>
                            <Header as='h2'>
                                <img src={process.env.PUBLIC_URL + "/images/prometheus.png"} alt="Kubernetes Dashboard" height="100" width="100"/>
                                <Header.Content>
                                Prometheus
                                <Header.Subheader>
                                The Prometheus web UI enables you to view simple graphs, Prometheus configuration and rules, and the state of the monitoring endpoints.
                                </Header.Subheader>
                                </Header.Content>
                            </Header>
                            <Header as='h2'>
                                <img src={process.env.PUBLIC_URL + "/images/grafana.png"} alt="Kubernetes Dashboard" height="100" width="100"/>
                                <Header.Content>
                                Grafana
                                <Header.Subheader>
                                Grafana is a multi-platform open source analytics and interactive visualization web application. It provides charts, graphs, 
                                and alerts for the web when connected to supported data sources.
                                </Header.Subheader>
                                </Header.Content>
                            </Header>
                            <Header as='h2'>
                                <img src={process.env.PUBLIC_URL + "/images/kibana.png"} alt="Kubernetes Dashboard" height="100" width="100"/>
                                <Header.Content>
                                Kibana
                                <Header.Subheader>
                                Kibana is an free and open frontend application that sits on top of the Elastic Stack, providing search and data visualization 
                                capabilities for data indexed in Elasticsearch.
                                </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </div>
                    }
                </div>
            </div>
            :
            <Message
                error
                icon="info"
                header='It seems that you are missing a deployment'
                list={[
                'You can get a deployment at Deployment tab in the header menu.',
                'Enter it manually in the Find deployment tab in the menu header.',
                ]}
            />
            )}
        </div>
    )
}