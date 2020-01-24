import { MySqlSvc } from './MySqlSvc';
import { expect } from 'chai';
import 'mocha';

describe('MySqlSvc', () => {
  const mysqlSvc = MySqlSvc.getInstance();
  it('mysqlSvc should be initialised', () => {
    const exists: boolean = mysqlSvc ? true : false;
    expect(exists).to.eq(true);
  });
//  mysqlSvc.execute('SELECT * from vw_game_moves');

});
