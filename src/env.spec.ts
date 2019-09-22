import dotenv from 'dotenv';
import { expect } from 'chai';
import fs from 'fs';
import 'mocha';

dotenv.config();

describe('dotenv', () => {

  it('an environment file should exist', () => {
    const path = './.env';
    let exists = false;
    if (fs.existsSync(path)) {
        exists = true;
    }
    expect(exists).to.equal(true);
  });
  it('NEO4J_USERNAME defined', () => {
      const envVar: string = process.env.NEO4J_USERNAME;
      expect(envVar).to.exist; 
  });
  it('NEO4J_PASSWORD defined', () => {
      const envVar: string = process.env.NEO4J_PASSWORD;
      expect(envVar).to.exist; 
  });
  it('NEO4J_PROTOCOL defined', () => {
      const envVar: string = process.env.NEO4J_PROTOCOL;
      expect(envVar).to.exist; 
  });
  it('NEO4J_HOST defined', () => {
      const envVar: string = process.env.NEO4J_HOST;
      expect(envVar).to.exist; 
  });
  it('NEO4J_PORT defined', () => {
      const envVar: string = process.env.NEO4J_PORT;
      expect(envVar).to.exist; 
  });
  it('SVR_PORT defined', () => {
      const envVar: string = process.env.SVR_PORT;
      expect(envVar).to.exist; 
  });
});
