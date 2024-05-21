import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
});

(async () => {
    try {
        await milvusClient.connect();
        console.log("Connection status: " + milvusClient.connectStatus);
    } catch (error) {
        console.error('Failed to connect to Milvus server:', error);
    }
})();
