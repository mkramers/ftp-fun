import { useListConnectionDirectory } from "@/app/hooks/useListConnectionDirectory";
import { ConnectionWithId } from "@/app/types/Connection";

interface Props {
  connection: ConnectionWithId;
  directory: string;
}

export function DirectoryList({ connection, directory }: Props) {
  const { data } = useListConnectionDirectory(connection, directory);
  return <p>{JSON.stringify(data, null, 2)}</p>;
}
