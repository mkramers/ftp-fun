import { Database } from "@/app/utils/db/openSqlLitDb";
import { DbBase } from "@/app/utils/db/Db";

class SqlLite extends DbBase {
  private db: Database;

  constructor(db: Database) {
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
