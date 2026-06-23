import { K8sCoreV1Api } from "./config.js";

export const createService = async(sandboxId) => {
    const serviceManifest = {
        metadata: {
            name: `sandbox-service-${sandboxId}`,
            labels: {
                sandboxId: sandboxId
            }
        },
        spec: {
            selector: {
                sandboxId: sandboxId
            },
            ports: [
                {
                    name: 'http',
                    protocol: 'TCP',
                    port: 80,
                    targetPort: 5173
                },
                {
                    name: 'agent-http',
                    protocol: 'TCP',
                    port: 3000,
                    targetPort: 3000
                }
            ],
            type: 'ClusterIP'
        }
    }

    const response = await K8sCoreV1Api.createNamespacedService({
        namespace: 'default',
        body: serviceManifest
    })
    return response
}

export async function deleteService(sandboxId){
    const response = await K8sCoreV1Api.deleteNamespacedService({
        name: `sandbox-service-${sandboxId}`,
        namespace: 'default'
    })
    return response
}