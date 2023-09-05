import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { HiOutlineDuplicate, HiPencil } from "react-icons/hi";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import { AiTwotoneDelete } from "react-icons/Ai";
import Modal from "../../ui/Modal";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }) {
  const { image, maxCapacity, name, regularPrice, discount, description, id } =
    cabin;

  const [showModal, setShowModal] = useState(false);

  const { isDeleting, deleteMutation } = useDeleteCabin();
  const { isCreating, mutateToAdd } = useCreateCabin();

  function handleDuplicate() {
    mutateToAdd({
      name,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }

  return (
    <>
      <TableRow>
        <Img src={image} alt={description} />

        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount ? formatCurrency(discount) : "-"}</Discount>
        <div>
          <button onClick={() => setShowModal((prev) => !prev)}>
            <HiPencil />
          </button>
          <button onClick={handleDuplicate} disabled={isCreating}>
            <HiOutlineDuplicate />
          </button>
          <button onClick={() => deleteMutation(id)} disabled={isDeleting}>
            <AiTwotoneDelete />
          </button>
        </div>
      </TableRow>
      {showModal && (
        <Modal onClose={() => setShowModal((prev) => !prev)}>
          <CreateCabinForm
            onModalClose={() => setShowModal(false)}
            cabinToEdit={cabin}
          />
        </Modal>
      )}
    </>
  );
}

export default CabinRow;
