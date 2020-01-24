import mysql from 'mysql';
import dotenv from 'dotenv';

export class MySqlSvc {

    private static mysqlSvc: MySqlSvc;
    conn: mysql.Connection;

    constructor() {
        dotenv.config();
        const host = process.env.MYSQL_HOST;
        const user = process.env.MYSQL_USERNAME;
        const pwd = process.env.MYSQL_PASSWORD;
        console.log(`MYSQL connection: ${user}@${host}`);
        this.conn = mysql.createConnection({
            host: host,
            user: user,
            password: pwd
          });
        this.conn.connect(function(err) {
            if (err) { throw err; }
            console.log('Connected!');
          });
    }

    static getInstance(): MySqlSvc {
        if (!this.mysqlSvc) {
            this.mysqlSvc = new MySqlSvc();
        }
        return this.mysqlSvc;
    }

    executeSql<T>(sql: string, args: any[]= []): Promise<T[]> {
        const _sql = mysql.format(sql, args);
        console.log(`SQL: ${sql}`);
        return new Promise<T[]>((resolve, reject) => {
            this.conn.query(_sql, function (err, result) {
                if (err) { reject( err); }
                const results: T[] = [];
//                console.log(`result: ${JSON.stringify(result)}`);
                result.forEach((row: T) => {
                    results.push(row);
                });
                resolve(results);
              });
        });
    }
    executeStoredProc<T>(proc: string, args: any[]= []): Promise<T> {
        const sql = mysql.format(`CALL mydb.sp_${proc}`, args);
        console.log(`SQL: ${sql}`);
        return new Promise<T>((resolve, reject) => {
            this.conn.query(sql, function (err, result) {
                if (err) { reject( err); }
                let results: T;
                console.log(`result: ${JSON.stringify(result)}`);
                results = result[0][0];
                resolve(results);
              });
        });
    }
    executeStoredProcArr<T>(proc: string, args: any[]= []): Promise<T[]> {
        const sql = mysql.format(`CALL mydb.sp_${proc}`, args);
        console.log(`SQL: ${sql}`);
        return new Promise<T[]>((resolve, reject) => {
            this.conn.query(sql, function (err, result) {
                if (err) { reject( err); }
                const results: T[] = [];
              console.log(`result: ${JSON.stringify(result)}`);
              result[0].forEach((row: T) => {
                  results.push(row);
              });
              resolve(results);
            });
        });
    }
}
