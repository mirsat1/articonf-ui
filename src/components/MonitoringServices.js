import React from 'react'
import useToggler from '../hooks/useToggler'
import { Header, Icon, Button, Popup } from 'semantic-ui-react'

export default function MonitoringServices() {
    const [showInfo, toggleInfo] = useToggler()
    const content = showInfo ? 'less' : 'more'
    return (
        <div>
            <Popup content={'Click here to show ' + content + ' detailed information about the services'} trigger={
                <Button  onClick={toggleInfo} icon>
                    <Icon name="question circle outline" />
                </Button>
                } />
            <div style={{textAlign: "center"}}>
                <Header style={{margin: "1.2em"}} icon>
                    <Icon>
                    <img src={process.env.PUBLIC_URL + "/images/kube.png"} alt="Kubernetes Dashboard" height="100" width="100"/>
                    </Icon>
                    Kubernetes Dashboard
                    <Header.Subheader style={{textAlign: "left"}}>
                    {/* Dashboard is a web-based Kubernetes user interface. You can use Dashboard to deploy containerized applications 
                    to a Kubernetes cluster, troubleshoot your containerized application, and manage the cluster resources. You 
                    can use Dashboard to get an overview of applications running on your cluster, as well as for creating or modifying 
                    individual Kubernetes resources (such as Deployments, Jobs, DaemonSets, etc). For example, you can scale a 
                    Deployment, initiate a rolling update, restart a pod or deploy new applications using a deploy wizard. */}
                    </Header.Subheader>
                </Header>
                {/* <i className="ri-arrow-right-circle-fill ri-fw ri-3x"></i> */}
                <Header style={{margin: "1.2em"}} icon>
                    <Icon>
                    <img src={process.env.PUBLIC_URL + "/images/prometheus.png"} alt="Prometheus" height="100" width="100"/>
                    </Icon>
                    Prometheus
                </Header>
                {/* <i className="ri-arrow-right-circle-fill ri-fw ri-3x"></i> */}
                <Header style={{margin: "1.2em"}} icon>
                    <Icon>
                        <img src={process.env.PUBLIC_URL + "/images/grafana.png"} alt="Grafana" height="100" width="100"/>
                    </Icon>
                    Grafana
                </Header>
                {/* <i className="ri-arrow-right-circle-fill ri-fw ri-3x"></i> */}
                <Header style={{margin: "1.2em"}} icon>
                    <Icon>
                        <img src={process.env.PUBLIC_URL + "/images/kibana.png"} alt="Kibana" height="100" width="100"/>
                    </Icon>
                    Kibana
                </Header>
            </div>
            <div>
                {
                    showInfo &&
                    <div>
                        <Header as='h2'>
                            <img src={process.env.PUBLIC_URL + "/images/kube.png"} alt="Kubernetes Dashboard" height="100" width="100"/>
                            <Header.Content>
                            Kubernetes Dashboard
                            <Header.Subheader>
                            You can use Dashboard to deploy containerized applications to a Kubernetes cluster, troubleshoot your containerized application, and manage the cluster resources. <br />
                            You can use Dashboard to get an overview of applications running on your cluster, as well as for creating or modifying individual Kubernetes resources (such as <br />
                            Deployments, Jobs, DaemonSets, etc). For example, you can scale a Deployment, initiate a rolling update, restart a pod or deploy new applications using a deploy wizard.
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
    )
}