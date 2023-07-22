import { createContext, PropsWithChildren, useState } from "react";
import { Connection } from "@/app/types/Connection";

type ConnectionContext = {
  connections: Connection[];
  setConnections: (connections: Connection[]) => void;
};

const Context = createContext<ConnectionContext | undefined>({
  get connections(): never {
    throw new Error("No connection context provider");
  },
  get setConnections(): never {
    throw new Error("No connection context provider");
  },
});

export function ConnectionContextProvider({ children }: PropsWithChildren<{}>) {
  const [connections, setConnections] = useState<Connection[]>([]);
  return (
    <Context.Provider value={{ connections, setConnections }}>
      {children}
    </Context.Provider>
  );
}
