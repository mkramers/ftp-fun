import { CreateConnection } from "@/components/CreateConnection/CreateConnection";
import Modal from "@/components/Modal/Modal";

export default function Create() {
  return (
    <Modal title={"Create Connection"}>
      <CreateConnection />
    </Modal>
  );
}
