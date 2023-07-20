import { open } from "sqlite";
import sqlite3 from "sqlite3";
import * as fs from "fs";
import { DbBase } from "@/app/utils/db/DbBase";
import { SqlLiteDb } from "@/app/utils/db/SqlLiteDb";

export async function openSqlLiteDb(filepath: string): Promise<DbBase> {
  if (!fs.existsSync(filepath)) {
    throw new Error(`Db does not exist at ${filepath}`);
  }

  console.log(`Opening database from ${filepath}...`);

  const sqliteDb = await open({
    filename: filepath,
    driver: sqlite3.Database,
  });

  return new SqlLiteDb(sqliteDb);
}
