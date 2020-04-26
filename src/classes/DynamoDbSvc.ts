import { DynamoDB, DynamoDBClient, DynamoDBConfiguration} from '@aws-sdk/client-dynamodb-v2-node';
import dotenv from 'dotenv';

export class DynamoDbSvc {

    private static dynamoDbSvc: DynamoDbSvc;
    dynamodb: DynamoDB;

    constructor() {
        dotenv.config();
        const endpoint = process.env.DYNAMODB_ENDPOINT;
        const config: DynamoDBConfiguration = {endpoint: endpoint};
        this.dynamodb=new DynamoDB(config);
    }

    static getInstance(): DynamoDbSvc {
        if (!this.dynamoDbSvc) {
            this.dynamoDbSvc = new DynamoDbSvc();
        }
        return this.dynamoDbSvc;
    }

    createTable(tableName: string, keySchema:any,attributeDefinitions:any,provisionedThroughput:any){
      const params = {
          TableName : tableName,
          KeySchema: keySchema,
          AttributeDefinitions: attributeDefinitions,
          ProvisionedThroughput: provisionedThroughput
       };
       this.dynamodb.createTable(params, function(err: any, data: any) {
            if (err) {
                console.error('Unable to . Error JSON:', JSON.stringify(err, null, 2));
            } else {
                console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
            }
        });
        
    }
    dropTable(tableName: string): boolean {
        return null;
    }
    putItem(){}
//    getItem<T>():<T>{
//        return null;
//    }
//    getItems<T>():<T[]>
//        {return null;
//    }
    
}
