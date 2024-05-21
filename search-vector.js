// searchVectors.js
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

(async () => {
  const milvusClient = new MilvusClient({
    address: 'localhost:19530',
  });

  const useDb = await milvusClient.use({ db_name: 'my_db' });
  console.log('new Database is using', useDb);
  
  const load = await milvusClient.loadCollectionSync({ collection_name: 'sample_collection' });

  const query = await milvusClient.search({
    collection_name: 'sample_collection',
    vector: [1,2,3,4,5,6,7,8],
    filter: 'age > 0',
    output_fields: ['id', 'age'],
    limit: 5,
  });
  console.log('query result', query);
})();
