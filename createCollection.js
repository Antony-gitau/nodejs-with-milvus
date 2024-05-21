import { MilvusClient, DataType } from '@zilliz/milvus2-sdk-node';

(async () => {
  const milvusClient = new MilvusClient({
    address: 'localhost:19530',
  });
  console.log('Connection status: ' + milvusClient.connectStatus);

  await milvusClient.use({ db_name: 'my_db' });

  const create = await milvusClient.createCollection({
    collection_name: 'sample_collection',
    fields: [
      {
        name: 'age',
        description: 'ID field',
        data_type: DataType.Int64,
        is_primary_key: true,
        autoID: true,
      },
      {
        name: 'vector',
        description: 'Vector field',
        data_type: DataType.FloatVector,
        dim: 8,
      },
      { name: 'height', description: 'int64 field', data_type: DataType.Int64 },
      {
        name: 'name',
        description: 'VarChar field',
        data_type: DataType.VarChar,
        max_length: 128,
      },
    ],
  });
  console.log('Create collection is finished.', create);

  await milvusClient.describeCollection({ collection_name: 'sample_collection'});

  console.log('describe collection', describeCollection);
 })();