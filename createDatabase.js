import { MilvusClient } from '@zilliz/milvus2-sdk-node';

(async () => {
  const milvusClient = new MilvusClient({
    address: 'localhost:19530',
  });
  console.log("Connection status: " + milvusClient.connectStatus)

  const createDb = await milvusClient.createDatabase({ db_name: 'my_db' });
  console.log('Database is created', createDb);

  const listDatabases = await milvusClient.listDatabases();
  console.log('list databases', listDatabases);
})();