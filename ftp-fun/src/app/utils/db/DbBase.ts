export class DbBase {
  constructor() {
    if (this.constructor === DbBase) {
      throw new Error("Abstract classes cannot be instantiated.");
    }
  }

  async query<TResult, TParams = any>(
    query: string,
    params?: TParams,
  ): Promise<TResult[]> {
    throw new Error("Method not implemented.");
  }
}
