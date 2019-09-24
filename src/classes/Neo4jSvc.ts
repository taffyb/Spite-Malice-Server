import Neo4j from 'neo4j-driver';
import {CypherSvc} from './CypherSvc';
import dotenv from 'dotenv';

export class Neo4jSvc {

    constructor() {
        dotenv.config();
        this.connection = process.env.NEO4J_PROTOCOL + '://' + process.env.NEO4J_HOST + ':' + process.env.NEO4J_PORT;

        console.log( `connection:${ this.connection }` );

        this.auth = Neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD);
        this.driver = Neo4j.driver(this.connection, this.auth);
        this.session = this.driver.session();

        console.log( `Neo4jSvc initialised` );
    }
    private static neo4jSvc: Neo4jSvc;
    private session: Neo4j.Session;
    private lastSession: number =  Date.now();
    private RESET_INTERVAL = 1 * 60 * 1000; // 1 minute
    private driver: Neo4j.Driver;
    private connection: string;
    private auth: any;

    static getInstance(): Neo4jSvc {
        if (!this.neo4jSvc) {
            this.neo4jSvc = new Neo4jSvc();
        }
        return this.neo4jSvc;
    }

    private static cleanRecord( record: Neo4j.Record): any {
        const cleanResult: any = {};

        record.keys.forEach((key: string) => {
            if (record.get(key).properties) {
                cleanResult[key] = Neo4jSvc.clean(record.get(key).properties);
            } else {
                cleanResult[key] = Neo4jSvc.clean(record.get(key));
            }
        });
        return cleanResult;
    }

    private static clean( obj: any): any {
        let rtn: any;
        if (Array.isArray(obj)) {
            rtn = [];
            obj.forEach((o) => {
               rtn.push( Neo4jSvc.clean(o));
            });
        } else {
            if (obj.properties) {
                rtn = {};
                for (const p in obj.properties) {
                    if (Neo4jSvc.isObject(obj.properties[p])) {
                        if (Neo4jSvc.isNeo4jNumber(obj.properties[p])) {
                            rtn[p] = Neo4j.integer.toNumber(obj.properties[p]);
                        } else {
                            rtn[p] = obj.properties[p];
                        }
                    } else {
                        rtn[p] = obj.properties[p];
                    }
                }
            } else {
                if (Neo4jSvc.isNeo4jNumber(obj)) {
                    rtn = Neo4j.integer.toNumber(obj);
                } else {
                    rtn = obj;
                }
            }
        }
        return rtn;
    }

    static isObject(obj: any): boolean {
        return obj === Object(obj);
    }

    static isArray(obj: any): boolean {
        return Array.isArray(obj);
    }

   static isNeo4jNumber(obj: any): boolean {
        return obj.hasOwnProperty('low') && obj.hasOwnProperty('high');
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

    executeCypher(query: string, params: any, debug: boolean= false): Promise<any> {
        const me = this;
        const results = new Promise((resolve, reject) => {
            const session = this.getNewSession();
            const myParams: any = params || {};
            let cypher;
            if (query.endsWith('.cyp')) {
                cypher = CypherSvc.readCypherFromFile(query);
            } else {
                cypher = query;
            }
            if (debug) {
                console.log(`***executeCypher***\nQueryName: ${query.endsWith('.cyp') ? query : ''}\nCypher:\n${cypher}\nParams:\n${JSON.stringify(myParams)}`);
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
                      resolve([Neo4jSvc.cleanRecord(result.records[0])]);
                   } else {
                      result.records.forEach((record: Neo4j.Record) => {
                          cleanResults.push(Neo4jSvc.cleanRecord(record));
                      });
                      resolve(cleanResults);
                    }
                  }
            })
            .catch(function (error: Neo4j.Neo4jError) {
                session.close();
                console.log(`executeCypher ERROR: ${error.code}\n${error.message}`);
                reject(error);
            });
        });
        return results;
    }
}
