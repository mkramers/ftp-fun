import { DbBase } from "./DbBase";
import { openSqlLiteDb } from "@/app/utils/db/openSqlLiteDb";

let db: DbBase | undefined = undefined;

export async function getDb() {
  if (!db) {
    db = await openSqlLiteDb("./db/db.sqlite3");
  }
  return db;
}
