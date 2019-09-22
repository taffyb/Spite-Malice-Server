import Neo4j from 'neo4j-driver';
import { Neo4jSvc } from './Neo4jSvc';
import { expect } from 'chai';
import 'mocha';

describe('Neo4jSvc 1', () => {
  const neo4jSvc = Neo4jSvc.getInstance();
  it('should be initialised', () => {
    expect(neo4jSvc).to.exist;
  });
  it('Connect to Neo4j and return test message', async ()=>{
     const results = await neo4jSvc.executeCypher("MATCH (t:Test) RETURN t.message as message",{});
     console.log(`${JSON.stringify(results)}`);
     expect(results[0].message).to.equal("Hello World");
  });
  
});