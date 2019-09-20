import neo4j from 'neo4j-driver';
import {CypherSvc} from './CypherSvc';
import dotenv from 'dotenv';



export class Neo4jSvc {
    session: neo4j.Session;
    constructor() {
        dotenv.config();

        const driver: neo4j.Driver = neo4j.driver(process.env.NEO4J_PROTOCOL + '://' + process.env.NEO4J_HOST);
        this.session = driver.session();
    }
}
