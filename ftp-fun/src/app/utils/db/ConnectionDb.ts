import { Connection } from "@/app/types/Connection";
import { DbBase } from "@/app/utils/db/Db";

export class ConnectionDb {
  private db: DbBase;

  constructor(db: DbBase) {
    this.db = db;
    ``;
  }

  async getAll() {
    const query = `SELECT * FROM connection;`;
    return await this.db.query<Required<Connection>>(query);
  }

  async insert(connection: Connection) {
    const query = `INSERT INTO connection (host, username, password) VALUES ($host, $username, $password) RETURNING *;`;

    const result = await this.db.query<Required<Connection>[], Connection>(
      query,
      connection,
    );

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

  async update(connection: Required<Connection>) {
    const query = `
UPDATE connection
SET connection = $connection,
    hostname = $hostname,
    username = $username,
    password = $password,
    verified = $verified
WHERE id = $id
RETURNING *;`;
    const result = await this.db.query<Required<Connection>[], Connection>(
      query,
      connection,
    );

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