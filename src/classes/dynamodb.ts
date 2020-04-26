import * as uuid from 'uuid';

import { DynamoDB, DynamoDBClient, DynamoDBConfiguration, PutItemInput } from '@aws-sdk/client-dynamodb-v2-node';

const config: DynamoDBConfiguration = {endpoint: 'http://localhost:8000'};
const dynamoDb = new DynamoDB(config);

// const params = {
//    TableName : 'profile',
//    KeySchema: [
//        { AttributeName: 'playerUuid', KeyType: 'HASH'},  // Partition key
//    ],
//    AttributeDefinitions: [
//        { AttributeName: 'playerUuid', AttributeType: 'S' }
//    ],
//    ProvisionedThroughput: {
//        ReadCapacityUnits: 1,
//        WriteCapacityUnits: 1
//    }
// };
//
//// dynamoDb.deleteTable(params, function(err: any, data: any) {
////    if (err) {
////        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
////    } else {
////        console.log('Delete table. Table description JSON:', JSON.stringify(data, null, 2));
////    }
//// });
// dynamoDb.createTable(params, function(err: any, data: any) {
//    if (err) {
//        console.error('Unable to . Error JSON:', JSON.stringify(err, null, 2));
//    } else {
//        console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
//    }
// });

// const item = {
//        TableName: 'profile',
//        Item: {
//         'playerUuid': {
//           S: 'DEFAULT'
//          },
//          'profile': {S:
//              `{animation:{ animateYN: true, animate: { recycleYN: false, recycle: 1, dealerYN: false, dealer: 1, playerYN: true, player: .2, opponentYN: true, opponent: .2 } }, showStatistics:true }`}
//            }
//       };
//
// dynamoDb.putItem(item, function(err: any, data: any) {
//    if (err) {
//        console.error('Unable to put Item . Error JSON:', JSON.stringify(err, null, 2));
//    } else {
//        console.log('Put Item . Item description JSON:', JSON.stringify(data, null, 2));
//    }
// });

const params = {
        Key: { /* required */
          playerUuid: { /* required */
            S: 'DEFAULT'
          }},
        TableName: 'profile', /* required */
        AttributesToGet: [
          'profile',
          /* more items */
        ],
        ConsistentRead: true
      };
dynamoDb.getItem(params, function(err: any, data: any) {
if (err) {
  console.error('Unable to get Item . Error JSON:', JSON.stringify(err, null, 2));
} else {
  console.log('Get Item . Item description JSON:', JSON.stringify(data, null, 2));
}
});
