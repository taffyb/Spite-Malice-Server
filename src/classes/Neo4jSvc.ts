import Neo4j from 'neo4j-driver';
import {CypherSvc} from './CypherSvc';
import dotenv from 'dotenv';

export class Neo4jSvc {
    private static neo4jSvc: Neo4jSvc;
    private session: Neo4j.Session;
    private lastSession: number =  Date.now();
    private RESET_INTERVAL = 1 * 60 * 1000; // 1 minute
    private driver: Neo4j.Driver;
    private connection: string;
    private auth: any;

    constructor() {
        dotenv.config();
        this.connection = process.env.NEO4J_PROTOCOL + '://' + process.env.NEO4J_HOST + ':' + process.env.NEO4J_PORT;

        // tslint:disable-next-line:no-console
        console.log( `connection:${ this.connection }` );

        this.auth = Neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD);
        this.driver = Neo4j.driver(this.connection, this.auth);
        this.session = this.driver.session();

        // tslint:disable-next-line:no-console
        console.log( `Neo4jSvc initialised` );
    }

    static getInstance(): Neo4jSvc {
        if (!this.neo4jSvc) {
            this.neo4jSvc = new Neo4jSvc();
        }
        return this.neo4jSvc;
    }

    private getNewSession() {
        const now = Date.now();
        if (!this.lastSession || (now - this.lastSession) > this.RESET_INTERVAL ) {
            if (this.lastSession) { // there is an existing driver connection so close it.
                this.driver.close();
            }
            this.driver = Neo4j.driver(this.connection, this.auth);
    /*
            driver.onCompleted = function () {
                console.log("Sucessful connection "+connection);
            };
            driver.onError = function (error) {
                console.log('Driver instantiation failed', error);
            };
    */
            this.lastSession = now;
        }
        const session = this.driver.session();
        return session;
    }

    executeCypher(query: string, params: any, debug: boolean= false) :Promise<any>{
        const me = this;
        const results = new Promise((resolve,reject)=>{
            const session = this.getNewSession();
            const myParams: any = params || {};
            let cypher;
            if (query.endsWith('.cyp')) {
                cypher = CypherSvc.readCypherFromFile(query);
            } else {
                cypher = query;
            }
            if (debug) {
                console.log(`***executeCypher***\nQueryName: (${query.endsWith('.cyp') ? query : ''}\nCypher:\n${cypher}\nParams:\n${JSON.stringify(myParams)}`);
            }
            session
            .run(cypher, myParams)
            .then(function (result: {records: Array<Neo4j.Record>, summary: Neo4j.ResultSummary}) {
                session.close();
                const cleanResults: Neo4j.Record[] = [];
                if (debug) {
                    console.log(`executeCypher RESULT:\n${JSON.stringify(result)}`);
                }
                if (result.records) {
                   if (result.records.length === 1) {
                      resolve([me.cleanRecord(result.records[0])]);
                   } else {
                      result.records.forEach((record: Neo4j.Record) => {
                          cleanResults.push(me.cleanRecord(record));
                      });
                      resolve(cleanResults);
                    }
                  }
            })
            .catch(function (error: Neo4j.Neo4jError) {
                session.close();
                console.log(`executeCypher ERROR: ${error}`);
                console.log(`executeCypher ERROR ON: ${error.message}`);
                reject(error);
            });
        });
        return results;
    }

    private cleanRecord(record: Neo4j.Record): any {
        const cleanResult: any = {};
        record.keys.forEach(function(key: string) {
            if (record.get(key).properties) {
                cleanResult[key] = {};
                const props = record.get(key).properties;
                for (const p in props) {
                    if (this.isObject(props[p])) {
                        if (this.isNeo4jNumber(props[p])) {
                            cleanResult[key][p] = Neo4j.integer.toNumber(props[p]);
                        } else {
                            cleanResult[key][p] = props[p];
                        }
                    } else {
                        cleanResult[key][p] = props[p];
                    }
                }
            } else {
                cleanResult[key] = record.get(key);
            }
        });
        return cleanResult;
    }


    isObject(obj: any): boolean {
        return obj === Object(obj);
    }

    isArray(obj: any): boolean {
        return Array.isArray(obj);
    }

    isNeo4jNumber(obj: any): boolean {
        return obj.low && obj.high;
    }
}
