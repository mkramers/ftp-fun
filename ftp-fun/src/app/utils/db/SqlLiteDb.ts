import { DbBase } from "@/app/utils/db/Db";
import { Database as SqliteDatabase } from "sqlite/build/Database";
import sqlite3 from "sqlite3";

export class SqlLiteDb extends DbBase {
  private db: SqliteDatabase<sqlite3.Database, sqlite3.Statement>;

  constructor(db: SqliteDatabase<sqlite3.Database, sqlite3.Statement>) {
    super();
    this.db = db;
  }

  async query<TResult, TParams>(
    query: string,
    params?: TParams,
  ): Promise<TResult[]> {
    const sql = await this.db.prepare(query);
    return await sql.all<TResult[]>();
  }
}
