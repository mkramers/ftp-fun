"use client";

import { Button } from "@/app/components/Button/Button";
import React, { useState } from "react";
import Modal from "@/app/components/Modal/Modal";
import { CreateConnection } from "@/app/components/CreateConnection/CreateConnection";

export default function Home() {
  const [createIsDialogOpen, setCreateIsDialogOpen] = useState(false);

  const handleCreateConnectionClicked = () => {
    setCreateIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setCreateIsDialogOpen(false);
  };

  return (
    <>
      <Modal
        title={"Create Connection"}
        isOpen={createIsDialogOpen}
        setIsOpen={setCreateIsDialogOpen}
      >
        <CreateConnection onSubmitted={handleCloseDialog} />
      </Modal>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <p>Hello.</p>
          <div className="mt-4">
            <Button onClick={handleCreateConnectionClicked}>
              Create Connection
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
