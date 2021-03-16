﻿const tosca = {"tosca_definitions_version": "tosca_simple_yaml_1_0",
  "imports": [
    {
      "nodes": "https://raw.githubusercontent.com/QCDIS/sdia-tosca/master/types/nodes.yaml"
    },
    {
      "data": "https://raw.githubusercontent.com/QCDIS/sdia-tosca/master/types/data.yml"
    },
    {
      "capabilities": "https://raw.githubusercontent.com/QCDIS/sdia-tosca/master/types/capabilities.yaml"
    },
    {
      "policies": "https://raw.githubusercontent.com/QCDIS/sdia-tosca/master/types/policies.yaml"
    },
    {
      "interfaces": "https://raw.githubusercontent.com/QCDIS/sdia-tosca/master/types/interfaces.yml"
    }
  ],
  "repositories": {
    "docker_hub": "https://hub.docker.com/"
  },
  "description": "TOSCA example\n",
  "topology_template": {
    "node_templates": {
      "mongo": {
        "type": "tosca.nodes.QC.Container.Application.Docker",
        "properties": {
          "environment": {
            "MONGO_INITDB_ROOT_USERNAME": "root",
            "MONGO_INITDB_ROOT_PASSWORD": "example"
          },
          "ports": [
            "27017:27017"
          ]
        },
        "artifacts": {
          "image": {
            "type": "tosca.artifacts.Deployment.Image.Container.Docker",
            "file": "mongo",
            "repository": "docker_hub"
          }
        },
        "interfaces": {
          "Kubernetes": {
            "delete": {
              "inputs": {
                "repository": "https://github.com/QCAPI-DRIP/playbooks.git",
                "resources": [
                  "k8s/delete_service.yml"
                ]
              }
            },
            "create": {
              "inputs": {
                "repository": "https://github.com/QCAPI-DRIP/playbooks.git",
                "resources": [
                  "k8s/create_service.yml"
                ]
              }
            },
            "scale": {
              "inputs": {
                "repository": "https://github.com/QCAPI-DRIP/playbooks.git",
                "resources": [
                  "k8s/scale_service.yml"
                ],
                "replicas": 1
              }
            },
            "autoscale": {
              "inputs": {
                "repository": "https://github.com/QCAPI-DRIP/playbooks.git",
                "resources": [
                  "k8s/autoscale_service.yml"
                ],
                "horizontal_pod_autoscaler": "horizontal_pod_autoscaler.yml"
              }
            },
            "info": {
              "inputs": {
                "repository": "https://github.com/QCAPI-DRIP/playbooks.git",
                "resources": [
                  "k8s/get_info_service.yml"
                ]
              }
            }
          }
        }
      }
    }
  }
}

export default tosca