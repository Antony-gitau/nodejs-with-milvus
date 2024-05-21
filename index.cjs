// Import the MilvusClient from the Milvus Node.js SDK
const { MilvusClient } = require('@zilliz/milvus2-sdk-node');

async function main() {
    try {
        // Connect to the Milvus server
        const client = new MilvusClient('localhost:19530');
        console.log('Connected to Milvus server.');

        // Check Milvus server status
        const health = await client.checkHealth();
        console.log('Milvus health status:', health);

        // Create a collection with the specified schema
        const collectionName = 'example_collection';
        await client.createCollection({
            collection_name: collectionName,
            fields: [
                { name: 'vector_field', type: 'VECTOR_FLOAT', params: { dim: 128 } },
                { name: 'id', type: 'INT64' },
            ],
        });
        console.log(`Collection '${collectionName}' created.`);

        // Insert data into the collection
        const insertResponse = await client.insert({
            collection_name: collectionName,
            fields_data: [
                { vector_field: [...Array(128).keys()], id: 1 },
            ],
        });
        console.log('Data inserted:', insertResponse);

        // Flush the data to make sure it's available for querying
        await client.flush({ collection_names: [collectionName] });
        console.log('Data flushed to collection.');

        // Perform a similarity search
        const searchResponse = await client.search({
            collection_name: collectionName,
            vectors: [[...Array(128).keys()]],
            top_k: 5,
            params: { metric_type: 'L2' },
        });
        console.log('Search results:', searchResponse);

        // Close the connection
        await client.close();
        console.log('Connection closed.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Execute the main function
main().catch(error => {
    console.error('Unexpected error:', error);
});
