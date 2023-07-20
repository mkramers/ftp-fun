import { Connection } from "@/app/types/Connection";
import { Database } from "@/app/utils/db/getDb";

export class ConnectionDb {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async getConnections(db: Database) {
    const query = `SELECT * FROM connection;`;
    const sql = await this.db.prepare(query);

    return await sql.all<Required<Connection>[]>();
  }

  async insertConnection(connection: Connection, db: Database) {
    const query = `INSERT INTO connection (host, username, password) VALUES ($host, $username, $password) RETURNING *;`;
    const sql = await this.db.prepare(query);

    const result = await sql.all<Required<Connection>[]>(connection);

    if (result.length === 0) {
      throw new Error(`Failed to insert connection ${connection.host}`);
    }
    if (result.length > 1) {
      throw new Error(
        `Expected to insert 1 connection, but inserted ${result.length}`,
      );
    }
    return result[0];
  }

  async updateConnection(connection: Required<Connection>, db: Database) {
    const query = `
UPDATE connection
SET connection = $connection,
    hostname = $hostname,
    username = $username,
    password = $password,
    verified = $verified
WHERE id = $id
RETURNING *;`;
    const sql = await this.db.prepare(query);

    const result = await sql.all<Required<Connection>[]>(connection);

    if (result.length === 0) {
      throw new Error(`Failed to update connection ${connection.host}`);
    }
    if (result.length > 1) {
      throw new Error(
        `Expected to update 1 connection, but updated ${result.length}`,
      );
    }
    return result[0];
  }
}
