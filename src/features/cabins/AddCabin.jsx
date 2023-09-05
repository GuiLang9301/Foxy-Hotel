import { useState } from "react";
import Button from "../../ui/Button";

import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
function AddCabin() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal((show) => !show)}>
        Add new cabin
      </Button>
      {showModal && (
        <Modal onClose={() => setShowModal((prev) => !prev)}>
          <CreateCabinForm onModalClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
