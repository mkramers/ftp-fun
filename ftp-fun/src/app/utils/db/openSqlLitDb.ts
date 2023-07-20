import { Database as SqliteDatabase, open } from "sqlite";
import sqlite3 from "sqlite3";
import * as fs from "fs";

export type Database = SqliteDatabase<sqlite3.Database, sqlite3.Statement>;

export async function openSqlLitDb(filepath: string): Promise<Database> {
  if (!fs.existsSync(filepath)) {
    throw new Error(`Db does not exist at ${filepath}`);
  }

  console.log(`Opening database from ${filepath}...`);

  return await open({
    filename: filepath,
    driver: sqlite3.Database,
  });
}
