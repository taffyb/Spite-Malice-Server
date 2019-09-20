import neo4j from 'neo4j-driver';
const driver: neo4j.Driver = neo4j.driver('bolt://localhost');
const session: neo4j.Session = driver.session();

