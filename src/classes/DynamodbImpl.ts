import * as uuid from 'uuid';

import { DynamoDB, DynamoDBClient, DynamoDBConfiguration } from '@aws-sdk/client-dynamodb-v2-node';

const config: DynamoDBConfiguration = {endpoint: 'http://localhost:8000'};
const dynamoDb = new DynamoDB(config);

